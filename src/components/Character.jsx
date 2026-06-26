// A generic, hand-drawn-style cute character (no branded mascots).
// `variant` swaps the little prop it's holding / standing next to.
// Swap this whole component for your own art, or drop SVGs into
// /public/illustrations and reference them with <img> instead.

export default function Character({ variant = 'flowers', className = '' }) {
  return (
    <svg
      viewBox="0 0 200 230"
      className={className}
      role="img"
      aria-label="A cute character"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* shadow */}
      <ellipse cx="100" cy="214" rx="46" ry="9" fill="#E14B6A" opacity="0.12" />

      {/* body / dress */}
      <path
        d="M70 120 C70 100 130 100 130 120 L142 196 C142 208 58 208 58 196 Z"
        fill="#FF6FA5"
      />
      <path
        d="M70 120 C70 100 130 100 130 120 L135 150 C112 158 88 158 65 150 Z"
        fill="#FF89B7"
      />

      {/* arms */}
      <path d="M72 128 C56 138 50 158 56 176" stroke="#FFD9B0" strokeWidth="11" fill="none" strokeLinecap="round" />
      <path d="M128 128 C146 136 152 154 150 172" stroke="#FFD9B0" strokeWidth="11" fill="none" strokeLinecap="round" />

      {/* head */}
      <circle cx="100" cy="86" r="40" fill="#FFE3C7" />
      {/* hair */}
      <path
        d="M60 84 C58 52 90 38 100 38 C112 38 142 52 140 86 C140 70 124 62 100 62 C78 62 60 70 60 84 Z"
        fill="#7B4B33"
      />
      <path d="M60 84 C58 100 60 116 66 126 C58 110 60 96 60 84 Z" fill="#7B4B33" />
      <path d="M140 84 C142 100 140 116 134 126 C142 110 140 96 140 84 Z" fill="#7B4B33" />

      {/* cheeks */}
      <circle cx="78" cy="96" r="8" fill="#FF9EC0" opacity="0.7" />
      <circle cx="122" cy="96" r="8" fill="#FF9EC0" opacity="0.7" />

      {/* eyes */}
      <circle cx="85" cy="84" r="5" fill="#3A2A22" />
      <circle cx="115" cy="84" r="5" fill="#3A2A22" />
      <circle cx="86.5" cy="82.5" r="1.6" fill="#fff" />
      <circle cx="116.5" cy="82.5" r="1.6" fill="#fff" />

      {/* smile */}
      <path d="M90 102 Q100 112 110 102" stroke="#3A2A22" strokeWidth="3" fill="none" strokeLinecap="round" />

      {variant === 'flowers' && (
        <g>
          {/* bouquet held in the arm */}
          <path d="M150 172 L138 138" stroke="#5FA85F" strokeWidth="4" strokeLinecap="round" />
          <path d="M150 172 L150 134" stroke="#5FA85F" strokeWidth="4" strokeLinecap="round" />
          <path d="M150 172 L162 140" stroke="#5FA85F" strokeWidth="4" strokeLinecap="round" />
          <Flower cx={138} cy={132} color="#FF6FA5" />
          <Flower cx={150} cy={126} color="#FFC4DD" />
          <Flower cx={163} cy={132} color="#FFE066" />
        </g>
      )}
    </svg>
  )
}

function Flower({ cx, cy, color }) {
  const petals = [0, 72, 144, 216, 288]
  return (
    <g>
      {petals.map((a) => {
        const r = (a * Math.PI) / 180
        return (
          <circle
            key={a}
            cx={cx + Math.cos(r) * 7}
            cy={cy + Math.sin(r) * 7}
            r="5.5"
            fill={color}
          />
        )
      })}
      <circle cx={cx} cy={cy} r="4.5" fill="#FFF3B0" />
    </g>
  )
}
