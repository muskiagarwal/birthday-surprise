import { motion } from 'framer-motion'
import Cake from '../Cake.jsx'
import Button from '../ui/Button.jsx'

export default function LoveMessage({ onNext }) {
  return (
    <div className="flex w-full flex-col items-center text-center">
      <motion.div
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Cake className="h-44 w-44" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4 font-script text-5xl leading-tight text-softred"
      >
        Happy Birthday
        <br />
        bestie
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mb-7 mt-3 max-w-xs font-body text-softred/70"
      >
        I hope today is as sweet and wonderful as you are 🍰💛
      </motion.p>

      <Button onClick={onNext}>Next →</Button>
    </div>
  )
}
