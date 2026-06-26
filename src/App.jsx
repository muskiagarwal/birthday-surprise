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
const screenVariants = {
  enter: { opacity: 0, y: 28, scale: 0.98 },
  center: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -28, scale: 0.98 },
}

export default function App() {
  const [index, setIndex] = useState(0)
  const screen = SCREENS[index]

  const next = () => setIndex((i) => Math.min(i + 1, SCREENS.length - 1))

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

      <main className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-md flex-col items-center justify-center px-5 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
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
