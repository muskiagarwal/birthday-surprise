import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import config from '../../config.js'
import Cake from '../Cake.jsx'
import Button from '../ui/Button.jsx'
import useBlowDetection from '../../hooks/useBlowDetection.js'
import { celebrate } from '../../confetti.js'

const N = config.candleCount
// position helper that matches Cake's candle layout (viewBox 52..148 of 200)
const candleXPercent = (i) => (N === 1 ? 50 : (52 + (i * 96) / (N - 1)) / 2)

// stage machine: intro → blow1 (waiting first blow) → blow2 (waiting second) → done
export default function MakeAWish({ onNext }) {
  const [candles, setCandles] = useState(() => Array.from({ length: N }, () => true))
  const [smoke, setSmoke] = useState([])
  const [stage, setStage] = useState('intro')
  const [done, setDone] = useState(false)
  const candlesRef = useRef(candles)
  const lastBlow = useRef(0)
  const timers = useRef([])

  candlesRef.current = candles
  const lit = candles.filter(Boolean).length

  const track = (t) => {
    timers.current.push(t)
    return t
  }

  // Extinguish the next `k` lit candles one-by-one with smoke puffs.
  const blowOutCandles = (k, onComplete) => {
    const cur = candlesRef.current
    const litIdx = cur.map((v, i) => (v ? i : -1)).filter((i) => i >= 0)
    const toBlow = litIdx.slice(0, k)
    if (toBlow.length === 0) {
      onComplete?.()
      return
    }
    toBlow.forEach((idx, order) => {
      track(
        setTimeout(() => {
          setCandles((c) => {
            const n = [...c]
            n[idx] = false
            return n
          })
          setSmoke((s) => [...s, idx])
          track(setTimeout(() => setSmoke((s) => s.filter((x) => x !== idx)), 1200))
          if (order === toBlow.length - 1) track(setTimeout(() => onComplete?.(), 260))
        }, 120 * order),
      )
    })
  }

  // The single funnel both the mic and the tap-fallback call.
  const registerBlow = () => {
    const now = Date.now()
    if (now - lastBlow.current < 900) return // debounce a single long breath
    if (stage === 'blow1') {
      lastBlow.current = now
      const few = Math.max(2, Math.round(N * 0.3))
      blowOutCandles(few)
      setStage('blow2')
    } else if (stage === 'blow2') {
      lastBlow.current = now
      blowOutCandles(N, () => {
        celebrate()
        setDone(true)
        blow.stop()
      })
      setStage('done')
    }
  }

  const blow = useBlowDetection(registerBlow)

  const startMic = () => {
    setStage('blow1') // advance immediately so we never get stuck on a slow prompt
    blow.requestMic()
  }

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const micLive = blow.listening
  const subtitle = done
    ? 'You did it! Did you make a wish? 💭'
    : stage === 'intro'
      ? 'Turn on your mic and blow out your candles — for real 🎂'
      : stage === 'blow1'
        ? micLive
          ? 'Take a deep breath… and blow at your screen! 🌬️'
          : `${lit} candles still glowing — give them a blow`
        : micLive
          ? 'Yay, a few went out! Now blow HARDER — one big breath for the rest 💨'
          : 'Blow harder! One more time for the rest to go away 💨'

  return (
    <div className="flex w-full flex-col items-center text-center">
      <h1 className="font-script text-5xl text-hotpink">Make a wish…</h1>
      <AnimatePresence mode="wait">
        <motion.p
          key={subtitle}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="mt-2 min-h-[2.5rem] max-w-xs font-body text-sm text-softred/75"
        >
          {subtitle}
        </motion.p>
      </AnimatePresence>

      <div className="relative my-3 h-56 w-56">
        <Cake candles={candles} className="h-full w-full" />
        <AnimatePresence>
          {smoke.map((i) => (
            <motion.div
              key={`smoke-${i}`}
              className="pointer-events-none absolute text-lg"
              style={{ left: `${candleXPercent(i)}%`, top: '26%' }}
              initial={{ opacity: 0.7, y: 0, scale: 0.6 }}
              animate={{ opacity: 0, y: -34, scale: 1.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              💨
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* live blow meter while the mic is on */}
      {micLive && !done && (
        <div className="mb-3 flex w-44 flex-col items-center gap-1">
          <div className="flex items-center gap-1 font-body text-xs font-semibold text-hotpink">
            <motion.span animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              🎤
            </motion.span>
            Listening… blow!
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-blush/50">
            <motion.div
              className="h-full rounded-full bg-hotpink"
              animate={{ width: `${Math.round(blow.level * 100)}%` }}
              transition={{ duration: 0.08 }}
            />
          </div>
        </div>
      )}

      {/* controls per stage */}
      {done ? (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
          <Button onClick={onNext}>NEXT →</Button>
        </motion.div>
      ) : stage === 'intro' ? (
        <div className="flex flex-col items-center gap-2">
          <Button onClick={startMic}>🎤 Turn on mic & blow</Button>
          <button
            type="button"
            onClick={() => setStage('blow1')}
            className="font-body text-xs font-semibold text-softred/50 underline underline-offset-2"
          >
            no mic? blow with a tap instead
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          {!micLive && <Button onClick={registerBlow}>🌬️ BLOW</Button>}
          {micLive && (
            <button
              type="button"
              onClick={registerBlow}
              className="font-body text-xs font-semibold text-softred/50 underline underline-offset-2"
            >
              …or tap to blow
            </button>
          )}
          {blow.error === 'denied' && (
            <span className="font-body text-xs text-softred/50">
              Mic blocked — tap BLOW to blow them out 💕
            </span>
          )}
        </div>
      )}
    </div>
  )
}
