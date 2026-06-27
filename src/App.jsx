import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Background from './components/Background.jsx'

import LockScreen from './components/screens/LockScreen.jsx'
import BirthdayReveal from './components/screens/BirthdayReveal.jsx'
import MakeAWish from './components/screens/MakeAWish.jsx'
import LoveMessage from './components/screens/LoveMessage.jsx'
import ChooseGift from './components/screens/ChooseGift.jsx'
import PolaroidReveal from './components/screens/PolaroidReveal.jsx'
import ScrapbookLetter from './components/screens/ScrapbookLetter.jsx'
import FinalSong from './components/screens/FinalSong.jsx'

// Ordered list of screens — the state machine just walks this array.
const SCREENS = [
  'lock',
  'reveal',
  'wish',
  'love',
  'gift',
  'polaroid',
  'scrapbook',
  'song',
]

// Soft fade + slide transition shared by every screen.
// `direction` (1 = forward, -1 = back) flips the slide so going back feels right.
const screenVariants = {
  enter: (dir) => ({ opacity: 0, y: dir >= 0 ? 28 : -28, scale: 0.98 }),
  center: { opacity: 1, y: 0, scale: 1 },
  exit: (dir) => ({ opacity: 0, y: dir >= 0 ? -28 : 28, scale: 0.98 }),
}

export default function App() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const screen = SCREENS[index]

  const next = () => {
    setDirection(1)
    setIndex((i) => Math.min(i + 1, SCREENS.length - 1))
  }

  // Revisit earlier screens without reloading. Floor at 1 (reveal) so the
  // recipient never gets sent back to the PIN lock.
  const back = () => {
    setDirection(-1)
    setIndex((i) => Math.max(1, i - 1))
  }
  const canGoBack = index > 1

  const renderScreen = () => {
    switch (screen) {
      case 'lock':
        return <LockScreen onUnlock={next} />
      case 'reveal':
        return <BirthdayReveal onNext={next} />
      case 'wish':
        return <MakeAWish onNext={next} />
      case 'love':
        return <LoveMessage onNext={next} />
      case 'gift':
        return <ChooseGift onNext={next} />
      case 'polaroid':
        return <PolaroidReveal onNext={next} />
      case 'scrapbook':
        return <ScrapbookLetter onNext={next} />
      case 'song':
        return <FinalSong />
      default:
        return null
    }
  }

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden font-body">
      <Background />

      {/* Back button — revisit earlier screens without reloading */}
      <AnimatePresence>
        {canGoBack && (
          <motion.button
            type="button"
            key="back-btn"
            onClick={back}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            whileTap={{ scale: 0.92 }}
            className="fixed left-4 top-4 z-30 flex items-center gap-1 rounded-full bg-white/80 px-4 py-2 font-body text-sm font-bold text-softred shadow-soft backdrop-blur-sm hover:bg-white"
            aria-label="Go back to the previous screen"
          >
            <span className="text-base leading-none">←</span> Back
          </motion.button>
        )}
      </AnimatePresence>

      <main className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-md flex-col items-center justify-center px-5 py-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={screen}
            custom={direction}
            variants={screenVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full flex-col items-center"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
