import { useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import config from '../../config.js'
import Character from '../Character.jsx'
import Dog from '../Dog.jsx'

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', null, '0', 'del']

export default function LockScreen({ onUnlock }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const shake = useAnimationControls()
  const len = config.secretCode.length

  const press = async (key) => {
    if (key === 'del') {
      setPin((p) => p.slice(0, -1))
      return
    }
    if (pin.length >= len) return

    const nextPin = pin + key
    setPin(nextPin)
    setError(false)

    if (nextPin.length === len) {
      if (nextPin === config.secretCode) {
        setTimeout(onUnlock, 350)
      } else {
        setError(true)
        await shake.start({
          x: [0, -10, 10, -8, 8, -4, 4, 0],
          transition: { duration: 0.5 },
        })
        setPin('')
      }
    }
  }

  return (
    <div className="flex w-full flex-col items-center text-center">
      <div className="mb-1 flex items-end justify-center gap-1">
        <Character variant="flowers" className="h-40 w-40 animate-floaty drop-shadow" />
        <motion.div
          initial={{ y: 8, rotate: -4 }}
          animate={{ rotate: [-4, 4, -4], y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Dog className="h-32 w-32 drop-shadow" />
        </motion.div>
      </div>

      <h1 className="font-hand text-2xl text-softred">A surprise awaits…</h1>
      <p className="mb-6 mt-1 font-body text-sm text-softred/70">
        Enter our little secret 💗
      </p>

      {/* PIN boxes */}
      <motion.div animate={shake} className="mb-8 flex gap-3">
        {Array.from({ length: len }).map((_, i) => {
          const filled = i < pin.length
          return (
            <div
              key={i}
              className={`flex h-14 w-12 items-center justify-center rounded-2xl border-2 bg-white/70 text-2xl font-bold transition-colors ${
                error
                  ? 'border-softred'
                  : filled
                    ? 'border-hotpink'
                    : 'border-blush'
              }`}
            >
              <motion.span
                key={filled ? 'dot' : 'empty'}
                initial={{ scale: 0 }}
                animate={{ scale: filled ? 1 : 0 }}
                className="text-hotpink"
              >
                ♥
              </motion.span>
            </div>
          )
        })}
      </motion.div>

      {/* Heart number pad */}
      <div className="grid grid-cols-3 gap-3">
        {KEYS.map((key, i) => {
          if (key === null) return <div key={i} />
          const isDel = key === 'del'
          return (
            <motion.button
              key={i}
              type="button"
              whileTap={{ scale: 0.85 }}
              whileHover={{ scale: 1.06 }}
              onClick={() => press(key)}
              className="relative flex h-16 w-16 items-center justify-center"
              aria-label={isDel ? 'Delete' : `Number ${key}`}
            >
              <HeartKey />
              <span className="relative z-10 font-body text-xl font-bold text-white drop-shadow">
                {isDel ? '⌫' : key}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

function HeartKey() {
  return (
    <svg viewBox="0 0 24 24" className="absolute inset-0 h-full w-full" fill="#FF6FA5">
      <path d="M12 21s-7.5-4.7-10-9.3C.3 8.5 2 5 5.3 5c2 0 3.4 1.2 4.7 2.8C11.3 6.2 12.7 5 14.7 5 18 5 19.7 8.5 18 11.7 15.5 16.3 12 21 12 21z" />
    </svg>
  )
}
