import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import config from '../../config.js'
import Cake from '../Cake.jsx'
import Button from '../ui/Button.jsx'
import useBlowDetection from '../../hooks/useBlowDetection.js'
import { celebrate } from '../../confetti.js'

export default function MakeAWish({ onNext }) {
  const [candles, setCandles] = useState(() =>
    Array.from({ length: config.candleCount }, () => true),
  )
  const [smoke, setSmoke] = useState([]) // ids currently puffing
  const [blowing, setBlowing] = useState(false)
  const [done, setDone] = useState(false)
  const timers = useRef([])

  const litCount = candles.filter(Boolean).length

  const blowOut = () => {
    if (blowing || done) return
    setBlowing(true)
    blow.stop?.()

    // extinguish one by one with a little puff of smoke
    candles.forEach((_, i) => {
      const t = setTimeout(() => {
        setCandles((prev) => {
          const copy = [...prev]
          copy[i] = false
          return copy
        })
        setSmoke((s) => [...s, i])
        setTimeout(() => setSmoke((s) => s.filter((x) => x !== i)), 1200)

        if (i === candles.length - 1) {
          setTimeout(() => {
            celebrate()
            setDone(true)
          }, 300)
        }
      }, 130 * i)
      timers.current.push(t)
    })
  }

  // mic blow detection (optional, button is the fallback)
  const blow = useBlowDetection(blowOut)

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  return (
    <div className="flex w-full flex-col items-center text-center">
      <h1 className="font-script text-5xl text-hotpink">Make a wish…</h1>
      <p className="mt-1 font-body text-sm text-softred/70">
        {done
          ? 'Did you make a good one? 💭'
          : `${litCount} candle${litCount === 1 ? '' : 's'} still glowing`}
      </p>

      <div className="relative my-3 h-56 w-56">
        <Cake candles={candles} className="h-full w-full" />
        {/* smoke wisps */}
        <AnimatePresence>
          {smoke.map((i) => {
            const count = config.candleCount
            const x = count === 1 ? 50 : 28 + (i * 44) / (count - 1)
            return (
              <motion.div
                key={`smoke-${i}`}
                className="pointer-events-none absolute text-lg"
                style={{ left: `${x}%`, top: '24%' }}
                initial={{ opacity: 0.7, y: 0, scale: 0.6 }}
                animate={{ opacity: 0, y: -34, scale: 1.3 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              >
                💨
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {!done ? (
        <div className="flex flex-col items-center gap-3">
          <Button onClick={blowOut}>🌬️ BLOW</Button>

          {blow.supported && !blow.listening && (
            <button
              type="button"
              onClick={blow.requestMic}
              className="font-body text-xs font-semibold text-softred/60 underline underline-offset-2"
            >
              …or blow for real — tap to use your mic
            </button>
          )}
          {blow.listening && (
            <span className="font-body text-xs font-semibold text-hotpink">
              🎤 Listening… blow at your screen!
            </span>
          )}
          {blow.error === 'denied' && (
            <span className="font-body text-xs text-softred/50">
              Mic blocked — just tap BLOW 💕
            </span>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Button onClick={onNext}>NEXT →</Button>
        </motion.div>
      )}
    </div>
  )
}
