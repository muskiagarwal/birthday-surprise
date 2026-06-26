import { motion } from 'framer-motion'

// Rounded-full pink pill button with a subtle press animation.
export default function Button({ children, onClick, variant = 'solid', className = '', ...props }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 font-body font-bold tracking-wide select-none cursor-pointer transition-colors'

  const variants = {
    solid: 'bg-hotpink text-white shadow-pill hover:bg-[#ff5b99]',
    soft: 'bg-white/80 text-softred shadow-soft hover:bg-white',
    ghost: 'bg-blush/60 text-softred hover:bg-blush',
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
