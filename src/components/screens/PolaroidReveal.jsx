import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import config from '../../config.js'
import Button from '../ui/Button.jsx'
import PhotoFrame from '../PhotoFrame.jsx'

export default function PolaroidReveal({ onNext }) {
  const [revealed, setRevealed] = useState(false)
  const [developed, setDeveloped] = useState(false)

  const reveal = () => {
    setRevealed(true)
    // photo "develops" from blurry to sharp shortly after sliding out
    setTimeout(() => setDeveloped(true), 1100)
  }

  return (
    <div className="flex w-full flex-col items-center text-center">
      <h1 className="font-script text-4xl leading-tight text-hotpink">
        Wow! That looks so good on you
      </h1>
      <p className="mb-5 mt-2 max-w-xs font-body text-sm text-softred/70">
        now get ready to take a picture 📸
      </p>

      {/* camera + polaroid slot */}
      <div className="relative mb-6 flex h-72 w-64 items-start justify-center">
        {/* the polaroid slides UP out of the camera */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: -8, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 60, damping: 14 }}
              className="absolute top-0 z-20 rotate-[-4deg] rounded-sm bg-white p-3 pb-10 shadow-soft"
            >
              <PhotoFrame
                src={config.photos[0]}
                alt="A beautiful memory"
                className={`h-44 w-44 rounded-sm transition-all duration-1000 ${
                  developed ? 'blur-0 saturate-100' : 'blur-md saturate-50 brightness-110'
                }`}
              />
              <p className="absolute bottom-2 left-0 right-0 text-center font-hand text-sm text-softred">
                Who is this beautiful??
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* camera body */}
        <div className="absolute bottom-0 z-10">
          <Camera />
        </div>
      </div>

      {!revealed ? (
        <Button onClick={reveal}>See the picture 📸</Button>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: developed ? 1 : 0 }}
        >
          <Button onClick={onNext}>Next →</Button>
        </motion.div>
      )}
    </div>
  )
}

function Camera() {
  return (
    <svg viewBox="0 0 160 110" className="h-32 w-44" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="20" width="144" height="84" rx="16" fill="#FF6FA5" />
      <rect x="8" y="20" width="144" height="20" rx="10" fill="#FF89B7" />
      {/* slot */}
      <rect x="30" y="16" width="100" height="8" rx="4" fill="#E14B6A" opacity="0.5" />
      {/* lens */}
      <circle cx="80" cy="66" r="26" fill="#FFE3EE" />
      <circle cx="80" cy="66" r="18" fill="#E14B6A" opacity="0.85" />
      <circle cx="80" cy="66" r="9" fill="#7A2B40" />
      <circle cx="86" cy="60" r="3" fill="#fff" opacity="0.8" />
      {/* flash + button */}
      <rect x="22" y="48" width="16" height="12" rx="3" fill="#FFE066" />
      <circle cx="132" cy="52" r="6" fill="#FFF1F6" />
    </svg>
  )
}
