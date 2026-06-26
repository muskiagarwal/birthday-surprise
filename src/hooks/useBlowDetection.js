import { useCallback, useEffect, useRef, useState } from 'react'

// Microphone blow detection that fires on EACH discrete blow.
//
// - onBlow(level) is called once per blow. After a blow fires, the detector
//   disarms until it hears a short quiet gap, so one continuous breath counts
//   as a single blow and the next breath counts separately.
// - Gracefully no-ops if the mic is blocked/unsupported; the UI keeps a
//   tap-to-blow fallback so the recipient is never stuck.
export default function useBlowDetection(onBlow) {
  const [listening, setListening] = useState(false)
  const [level, setLevel] = useState(0) // 0..1, for a live "blow meter"
  const [error, setError] = useState(null)
  const cleanupRef = useRef(null)
  const onBlowRef = useRef(onBlow)
  onBlowRef.current = onBlow

  const supported =
    typeof navigator !== 'undefined' &&
    !!navigator.mediaDevices?.getUserMedia &&
    typeof window !== 'undefined' &&
    !!(window.AudioContext || window.webkitAudioContext)

  const stop = useCallback(() => {
    cleanupRef.current?.()
    cleanupRef.current = null
    setListening(false)
    setLevel(0)
  }, [])

  const requestMic = useCallback(async () => {
    if (!supported) {
      setError('unsupported')
      return false
    }
    try {
      // Disable processing that would suppress the "wind" of a blow.
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      })
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      const ctx = new AudioCtx()
      if (ctx.state === 'suspended') await ctx.resume()

      const source = ctx.createMediaStreamSource(stream)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 1024
      source.connect(analyser)

      const data = new Uint8Array(analyser.frequencyBinCount)
      let raf = 0
      let loudFrames = 0
      let quietFrames = 0
      let armed = true

      const LOUD = 52 // 0..255 average low-band energy that counts as "loud"
      const SUSTAIN = 3 // frames a blow must hold to fire (rejects taps/clicks)
      const REARM_QUIET = 8 // quiet frames needed before the next blow can fire

      const tick = () => {
        analyser.getByteFrequencyData(data)
        // A blow is broadband but strongest in the low band — weight the lows.
        let sum = 0
        const bins = Math.floor(data.length * 0.4)
        for (let i = 0; i < bins; i++) sum += data[i]
        const lvl = sum / bins
        setLevel(Math.min(1, lvl / 110))

        if (lvl > LOUD) {
          loudFrames += 1
          quietFrames = 0
        } else {
          quietFrames += 1
          if (loudFrames > 0) loudFrames -= 1
        }

        if (armed && loudFrames >= SUSTAIN) {
          armed = false
          loudFrames = 0
          onBlowRef.current?.(lvl)
        }
        if (!armed && quietFrames >= REARM_QUIET) armed = true

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
      setError(e?.name === 'NotAllowedError' ? 'denied' : 'error')
      setListening(false)
      return false
    }
  }, [supported])

  // Always release the mic when the screen unmounts.
  const stopRef = useRef(stop)
  stopRef.current = stop
  useEffect(() => () => stopRef.current?.(), [])

  return { supported, listening, level, error, requestMic, stop }
}
