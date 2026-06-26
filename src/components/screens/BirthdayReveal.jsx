import { useEffect } from 'react'
import { motion } from 'framer-motion'
import config from '../../config.js'
import Character from '../Character.jsx'
import Cake from '../Cake.jsx'
import Button from '../ui/Button.jsx'
import { heartsBurst } from '../../confetti.js'

export default function BirthdayReveal({ onNext }) {
  useEffect(() => {
    const t = setTimeout(heartsBurst, 400)
    return () => clearTimeout(t)
  }, [])

  const word = 'HAPPY'
  return (
    <div className="flex w-full flex-col items-center text-center">
      {/* sparkles */}
      <div className="relative">
        <motion.div
          className="absolute -left-6 -top-2 text-2xl"
          animate={{ rotate: [0, 20, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          ✨
        </motion.div>
        <motion.div
          className="absolute -right-6 top-4 text-2xl"
          animate={{ rotate: [0, -20, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          ✨
        </motion.div>

        <h1 className="flex justify-center font-hand text-4xl leading-tight text-hotpink">
          {word.split('').map((c, i) => (
            <motion.span
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: [20, -8, 0], opacity: 1 }}
              transition={{ delay: 0.1 * i, duration: 0.6 }}
            >
              {c}
            </motion.span>
          ))}
        </h1>
      </div>

      <motion.h2
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', bounce: 0.6 }}
        className="font-script text-6xl text-softred"
      >
        BIRTHDAY!
      </motion.h2>

      <p className="mt-2 font-hand text-lg text-softred/80">
        {config.recipientName} 🎉
      </p>

      <div className="relative my-4 flex items-end justify-center gap-1">
        <Character variant="flowers" className="h-36 w-36 animate-floaty" />
        <Cake className="h-40 w-40" />
      </div>

      <Button onClick={onNext}>NEXT →</Button>
    </div>
  )
}
