import { motion } from 'framer-motion'
import config from '../../config.js'

export default function FinalSong() {
  return (
    <div className="flex w-full flex-col items-center text-center">
      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-script text-5xl text-hotpink"
      >
        Our song 🎶
      </motion.h1>
      <p className="mb-5 mt-1 font-body text-sm text-softred/70">
        Press play and dance it out — wish I could be there 💛
      </p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full overflow-hidden rounded-3xl bg-white/70 p-3 shadow-soft"
      >
        <div className="relative w-full overflow-hidden rounded-2xl" style={{ paddingTop: '56.25%' }}>
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${config.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title="Birthday song"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-7 font-hand text-lg text-softred"
      >
        Happy birthday, {config.recipientName}.
        <br />
        {config.signoff}
      </motion.p>

      {/* floating notes */}
      <div className="pointer-events-none relative h-10 w-full">
        {['🎵', '🎶', '🎵'].map((n, i) => (
          <motion.span
            key={i}
            className="absolute text-2xl"
            style={{ left: `${30 + i * 20}%` }}
            animate={{ y: [-4, -22, -4], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.4, delay: i * 0.5, repeat: Infinity }}
          >
            {n}
          </motion.span>
        ))}
      </div>
    </div>
  )
}
