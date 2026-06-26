import { motion } from 'framer-motion'

// A layered pink cake. `candles` is an array of booleans (true = lit).
// When `candles` is omitted it renders a simple decorative cake with no flames.
export default function Cake({ candles, className = '' }) {
  const count = candles?.length ?? 0
  // distribute candles evenly across the top tier; stagger heights so a large
  // count reads as individual candles instead of one solid bar of flame.
  const SPAN_LEFT = 52
  const SPAN_RIGHT = 148
  const candleData = Array.from({ length: count }, (_, i) => {
    const x = count === 1 ? 100 : SPAN_LEFT + (i * (SPAN_RIGHT - SPAN_LEFT)) / (count - 1)
    // alternate tall/short candles for a playful, legible row
    const top = i % 2 === 0 ? 60 : 66
    return { x, top }
  })

  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* plate */}
      <ellipse cx="100" cy="178" rx="80" ry="11" fill="#E14B6A" opacity="0.15" />
      <ellipse cx="100" cy="172" rx="74" ry="10" fill="#FFFFFF" />

      {/* bottom tier */}
      <rect x="40" y="120" width="120" height="48" rx="12" fill="#FF6FA5" />
      <rect x="40" y="120" width="120" height="14" rx="7" fill="#FFE3EE" />
      {/* drips */}
      <path d="M40 130 q10 16 20 0 q10 16 20 0 q10 16 20 0 q10 16 20 0 q10 16 20 0 q10 16 20 0 V120 H40 Z" fill="#FFE3EE" />

      {/* top tier */}
      <rect x="62" y="86" width="76" height="42" rx="10" fill="#FF89B7" />
      <rect x="62" y="86" width="76" height="12" rx="6" fill="#FFF1F6" />
      <path d="M62 95 q9 14 18 0 q9 14 18 0 q9 14 18 0 q9 14 18 0 V86 H62 Z" fill="#FFF1F6" />

      {/* sprinkles */}
      <circle cx="74" cy="146" r="2.4" fill="#FFD86B" />
      <circle cx="92" cy="152" r="2.4" fill="#FFFFFF" />
      <circle cx="110" cy="146" r="2.4" fill="#FFD86B" />
      <circle cx="128" cy="152" r="2.4" fill="#FFFFFF" />
      <circle cx="100" cy="112" r="2.2" fill="#FFD86B" />
      <circle cx="84" cy="108" r="2.2" fill="#FFFFFF" />
      <circle cx="118" cy="108" r="2.2" fill="#FFD86B" />

      {/* candles */}
      {candleData.map(({ x, top }, i) => {
        const flameTip = top - 12
        return (
          <g key={i}>
            <rect x={x - 1.3} y={top} width="2.6" height={88 - top} rx="1.3" fill="#FFFFFF" />
            <rect x={x - 1.3} y={top} width="2.6" height={88 - top} rx="1.3" fill="url(#stripe)" opacity="0.55" />
            {/* wick */}
            <rect x={x - 0.5} y={top - 3} width="1" height="3.5" fill="#5b4636" />
            {candles[i] && (
              <motion.g
                animate={{ scale: [1, 0.85, 1], y: [0, -1, 0] }}
                transition={{ duration: 0.4 + (i % 4) * 0.05, repeat: Infinity, ease: 'easeInOut' }}
                style={{ originX: '50%', originY: '100%' }}
              >
                {/* glow */}
                <circle cx={x} cy={top - 4} r="3.4" fill="#FFE08A" opacity="0.45" />
                {/* flame */}
                <path
                  d={`M${x} ${flameTip} C ${x + 2.4} ${flameTip + 4} ${x + 1.8} ${top - 0.5} ${x} ${top} C ${x - 1.8} ${top - 0.5} ${x - 2.4} ${flameTip + 4} ${x} ${flameTip} Z`}
                  fill="#FFB02E"
                />
                <path
                  d={`M${x} ${flameTip + 2.4} C ${x + 1.2} ${flameTip + 4.5} ${x + 1} ${top - 0.5} ${x} ${top - 0.5} C ${x - 1} ${top - 0.5} ${x - 1.2} ${flameTip + 4.5} ${x} ${flameTip + 2.4} Z`}
                  fill="#FFE066"
                />
              </motion.g>
            )}
          </g>
        )
      })}

      <defs>
        <linearGradient id="stripe" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FF6FA5" />
          <stop offset="0.5" stopColor="#ffffff" />
          <stop offset="1" stopColor="#FF6FA5" />
        </linearGradient>
      </defs>
    </svg>
  )
}
