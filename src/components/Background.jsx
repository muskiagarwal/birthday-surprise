import { useMemo } from 'react'
import { motion } from 'framer-motion'

// Gentle floating hearts + twinkling sparkles behind every screen.
// Purely decorative and non-interactive (pointer-events disabled).

function seededRandom(seed) {
  // deterministic so layout doesn't reshuffle on every render
  let x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export default function Background() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: seededRandom(i + 1) * 100,
        size: 14 + seededRandom(i + 7) * 26,
        delay: seededRandom(i + 3) * 8,
        duration: 9 + seededRandom(i + 5) * 8,
        opacity: 0.25 + seededRandom(i + 11) * 0.4,
      })),
    [],
  )

  const sparkles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: seededRandom(i + 21) * 100,
        top: seededRandom(i + 31) * 100,
        size: 6 + seededRandom(i + 41) * 10,
        delay: seededRandom(i + 51) * 4,
        duration: 2 + seededRandom(i + 61) * 3,
      })),
    [],
  )

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {/* soft radial wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 0%, #FFE7F0 0%, #FFF7F2 55%, #FDEFF5 100%)',
        }}
      />

      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute bottom-[-40px]"
          style={{ left: `${h.left}%`, opacity: h.opacity }}
          initial={{ y: 0 }}
          animate={{ y: '-115vh', rotate: [0, 12, -8, 0] }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Heart size={h.size} />
        </motion.div>
      ))}

      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{ left: `${s.left}%`, top: `${s.top}%` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Sparkle size={s.size} />
        </motion.div>
      ))}
    </div>
  )
}

function Heart({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF9EC0">
      <path d="M12 21s-7.5-4.7-10-9.3C.3 8.5 2 5 5.3 5c2 0 3.4 1.2 4.7 2.8C11.3 6.2 12.7 5 14.7 5 18 5 19.7 8.5 18 11.7 15.5 16.3 12 21 12 21z" />
    </svg>
  )
}

function Sparkle({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#FFD86B">
      <path d="M12 0c.6 5.6 5.8 10.8 11.4 11.4C17.8 12 12.6 17.2 12 22.8 11.4 17.2 6.2 12 0.6 11.4 6.2 10.8 11.4 5.6 12 0z" />
    </svg>
  )
}
