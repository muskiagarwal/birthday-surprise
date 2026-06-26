// A cute, original cartoon puppy (a little floppy-eared beagle in a party hat).
// Hand-drawn so it's IP-free — not based on any branded/trademarked character.
// Swap freely or drop your own art in /public/illustrations.

export default function Dog({ className = '' }) {
  return (
    <svg
      viewBox="0 0 200 210"
      className={className}
      role="img"
      aria-label="A cute puppy in a party hat"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* shadow */}
      <ellipse cx="100" cy="196" rx="52" ry="9" fill="#E14B6A" opacity="0.12" />

      {/* tail (wagging) */}
      <path d="M150 168 C172 162 176 140 166 132" stroke="#C98A5E" strokeWidth="12" fill="none" strokeLinecap="round" />

      {/* body — sitting */}
      <path d="M62 196 C52 150 60 126 100 126 C140 126 148 150 138 196 Z" fill="#FFFFFF" />
      <path d="M62 196 C52 150 60 126 100 126 C140 126 148 150 138 196 Z" fill="#FFF1E6" />
      {/* tan back patch */}
      <path d="M78 138 C92 124 116 126 128 144 C132 158 128 172 120 180 C112 162 92 158 80 168 C74 158 74 146 78 138 Z" fill="#C98A5E" />

      {/* front paws */}
      <ellipse cx="84" cy="192" rx="14" ry="10" fill="#FFFFFF" />
      <ellipse cx="116" cy="192" rx="14" ry="10" fill="#FFFFFF" />
      <ellipse cx="84" cy="194" rx="6" ry="4" fill="#F4D9C4" />
      <ellipse cx="116" cy="194" rx="6" ry="4" fill="#F4D9C4" />

      {/* head */}
      <circle cx="100" cy="92" r="46" fill="#FFFFFF" />

      {/* floppy ears */}
      <path d="M58 78 C40 84 38 118 52 140 C66 150 78 132 74 108 C72 94 68 82 58 78 Z" fill="#8E5A38" />
      <path d="M142 78 C160 84 162 118 148 140 C134 150 122 132 126 108 C128 94 132 82 142 78 Z" fill="#8E5A38" />

      {/* brown eye patch (one side — classic puppy cuteness) */}
      <path d="M118 70 C138 68 146 86 140 104 C132 116 116 114 110 100 C106 86 108 74 118 70 Z" fill="#C98A5E" opacity="0.85" />

      {/* cheeks */}
      <circle cx="74" cy="104" r="8" fill="#FF9EC0" opacity="0.6" />
      <circle cx="126" cy="104" r="8" fill="#FF9EC0" opacity="0.6" />

      {/* eyes */}
      <circle cx="84" cy="92" r="6.5" fill="#3A2A22" />
      <circle cx="120" cy="92" r="6.5" fill="#3A2A22" />
      <circle cx="86" cy="89.5" r="2" fill="#fff" />
      <circle cx="122" cy="89.5" r="2" fill="#fff" />

      {/* snout */}
      <ellipse cx="100" cy="112" rx="20" ry="15" fill="#FFF7F2" />
      <ellipse cx="100" cy="106" rx="7" ry="5.5" fill="#3A2A22" />
      {/* mouth */}
      <path d="M100 111 L100 118" stroke="#3A2A22" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M100 118 Q90 126 82 119" stroke="#3A2A22" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M100 118 Q110 126 118 119" stroke="#3A2A22" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* little tongue */}
      <path d="M97 120 Q100 130 103 120 Z" fill="#FF6FA5" />

      {/* party hat */}
      <g>
        <path d="M100 14 L118 52 L82 52 Z" fill="#FF6FA5" />
        <path d="M100 14 L108 31 L92 31 Z" fill="#FFD86B" />
        <path d="M90 41 L110 41" stroke="#FFF1F6" strokeWidth="3" strokeLinecap="round" />
        <circle cx="100" cy="12" r="6" fill="#FFD86B" />
      </g>

      {/* little sparkle */}
      <path d="M150 96 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 z" fill="#FFD86B" />
    </svg>
  )
}
