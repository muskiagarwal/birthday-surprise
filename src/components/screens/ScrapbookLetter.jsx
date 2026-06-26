import { motion } from 'framer-motion'
import config from '../../config.js'
import Button from '../ui/Button.jsx'
import PhotoFrame from '../PhotoFrame.jsx'

export default function ScrapbookLetter({ onNext }) {
  return (
    <div className="flex w-full flex-col items-center text-center">
      <h1 className="mb-4 font-script text-4xl text-hotpink">For you, with love 💌</h1>

      <div className="relative w-full max-w-sm rounded-2xl bg-cream/90 p-5 shadow-soft">
        {/* washi tape corners */}
        <Tape className="-left-3 -top-3 rotate-[-18deg]" />
        <Tape className="-right-3 -top-3 rotate-[16deg]" color="#FF6FA5" />

        {/* photo collage */}
        <div className="mb-4 flex items-start justify-center gap-3">
          <motion.div
            initial={{ rotate: -10, scale: 0.9, opacity: 0 }}
            animate={{ rotate: -6, scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="relative rounded-sm bg-white p-2 pb-5 shadow"
          >
            <PhotoFrame src={config.photos[0]} alt="us" className="h-24 w-24 rounded-sm" />
            <Pin />
          </motion.div>
          <motion.div
            initial={{ rotate: 10, scale: 0.9, opacity: 0 }}
            animate={{ rotate: 6, scale: 1, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="relative mt-4 rounded-sm bg-white p-2 pb-5 shadow"
          >
            <PhotoFrame
              src={config.photos[1] || config.photos[0]}
              alt="us"
              className="h-24 w-24 rounded-sm"
            />
            <Pin color="#FFD86B" />
          </motion.div>
        </div>

        {/* flowers row */}
        <div className="mb-3 flex justify-center gap-2 text-xl">
          <span>🌸</span>
          <span>🌷</span>
          <span>🌼</span>
          <span>🌸</span>
        </div>

        {/* the pinned handwritten note */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative mx-auto max-w-xs rotate-[-1deg] rounded-sm bg-white p-5 shadow"
          style={{
            backgroundImage:
              'repeating-linear-gradient(transparent, transparent 27px, #FFE3EE 28px)',
          }}
        >
          <Pin />
          <p className="whitespace-pre-line text-left font-hand text-[15px] leading-7 text-softred/90">
            Dear {config.recipientName},{'\n'}
            {config.letterText}
          </p>
          <p className="mt-3 text-right font-script text-2xl text-hotpink">
            {config.signoff}
          </p>
        </motion.div>
      </div>

      <div className="mt-6">
        <Button onClick={onNext}>Next →</Button>
      </div>
    </div>
  )
}

function Tape({ className = '', color = '#FFD86B' }) {
  return (
    <div
      className={`absolute h-6 w-16 opacity-70 ${className}`}
      style={{ background: color, mixBlendMode: 'multiply' }}
    />
  )
}

function Pin({ color = '#FF6FA5' }) {
  return (
    <span
      className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full shadow"
      style={{ background: color }}
    />
  )
}
