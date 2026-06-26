import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import config from '../../config.js'
import Button from '../ui/Button.jsx'

export default function ChooseGift({ onNext }) {
  // which non-camera note is open (bottle | star | null)
  const [openNote, setOpenNote] = useState(null)

  const items = [
    { key: 'camera', emoji: '📷', label: 'Camera' },
    { key: 'bottle', emoji: '🍾', label: 'Bottle' },
    { key: 'star', emoji: '⭐', label: 'Star' },
  ]

  const handlePick = (key) => {
    if (key === 'camera') {
      onNext()
    } else {
      setOpenNote(key)
    }
  }

  const note = openNote ? config.gifts[openNote] : null

  return (
    <div className="flex w-full flex-col items-center text-center">
      <h1 className="font-script text-5xl text-hotpink">These are for you!</h1>
      <p className="mb-8 mt-1 font-body text-sm text-softred/70">
        Choose one to open 🎁
      </p>

      <div className="flex w-full justify-center gap-4">
        {items.map((item, i) => (
          <motion.button
            key={item.key}
            type="button"
            onClick={() => handlePick(item.key)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 * i }}
            whileHover={{ rotate: [0, -8, 8, -6, 6, 0], scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            className="flex flex-1 flex-col items-center gap-2 rounded-3xl bg-white/70 px-3 py-5 shadow-soft"
          >
            <span className="text-4xl">{item.emoji}</span>
            <span className="font-body text-xs font-bold text-softred/80">{item.label}</span>
          </motion.button>
        ))}
      </div>

      <p className="mt-8 max-w-xs font-hand text-sm text-softred/50">
        psst… the camera has a memory waiting 📸
      </p>

      {/* note popup for bottle / star */}
      <AnimatePresence>
        {note && (
          <motion.div
            className="fixed inset-0 z-30 flex items-center justify-center bg-softred/30 px-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenNote(null)}
          >
            <motion.div
              initial={{ scale: 0.7, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.7, y: 30, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-3xl bg-cream p-7 text-center shadow-soft"
              style={{ backgroundImage: 'linear-gradient(0deg,#fff7f2, #fff)' }}
            >
              <h3 className="font-script text-3xl text-hotpink">{note.title}</h3>
              <p className="mb-6 mt-3 font-hand text-base leading-relaxed text-softred/90">
                {note.note}
              </p>
              <Button variant="soft" onClick={() => setOpenNote(null)}>
                Aww, close 💕
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
