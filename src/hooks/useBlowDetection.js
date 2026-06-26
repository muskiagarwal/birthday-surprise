import { useCallback, useRef, useState } from 'react'

// Optional microphone blow detection.
// Returns { supported, listening, requestMic, stop }.
// `onBlow` fires when a sustained volume spike (a real blow) is detected.
//
// Gracefully no-ops if the browser blocks the mic or the API is missing —
// the BLOW button always works as a fallback.
export default function useBlowDetection(onBlow) {
  const [listening, setListening] = useState(false)
  const [error, setError] = useState(null)
  const cleanupRef = useRef(null)
  const firedRef = useRef(false)

  const supported =
    typeof navigator !== 'undefined' &&
    !!navigator.mediaDevices?.getUserMedia &&
    (typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext))

  const stop = useCallback(() => {
    cleanupRef.current?.()
    cleanupRef.current = null
    setListening(false)
  }, [])

  const requestMic = useCallback(async () => {
    if (!supported) {
      setError('unsupported')
      return false
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      const ctx = new AudioCtx()
      const source = ctx.createMediaStreamSource(stream)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 512
      source.connect(analyser)

      const data = new Uint8Array(analyser.frequencyBinCount)
      let raf = 0
      let loudFrames = 0
      firedRef.current = false

      const tick = () => {
        analyser.getByteFrequencyData(data)
        // Average low-frequency energy — a blow is broadband but strong in lows.
        let sum = 0
        const bins = Math.floor(data.length * 0.5)
        for (let i = 0; i < bins; i++) sum += data[i]
        const level = sum / bins // 0..255

        // Require the spike to hold for a few frames to avoid taps/claps.
        if (level > 60) loudFrames += 1
        else loudFrames = Math.max(0, loudFrames - 1)

        if (loudFrames > 6 && !firedRef.current) {
          firedRef.current = true
          onBlow?.()
        }
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)

      cleanupRef.current = () => {
        cancelAnimationFrame(raf)
        stream.getTracks().forEach((t) => t.stop())
        ctx.close().catch(() => {})
      }
      setListening(true)
      setError(null)
      return true
    } catch (e) {
      setError('denied')
      setListening(false)
      return false
    }
  }, [supported, onBlow, stop])

  return { supported, listening, error, requestMic, stop }
}
