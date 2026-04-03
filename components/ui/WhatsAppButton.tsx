'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

interface WhatsAppButtonProps {
  phone?: string
  message?: string
}

export default function WhatsAppButton({
  phone = '918985025794',
  message = ''
}: WhatsAppButtonProps) {
  const encodedMessage = encodeURIComponent(message)
  const url = `https://wa.me/${phone}${message ? `?text=${encodedMessage}` : ''}`

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.320, 1],
      },
    },
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.08, 1],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  const glowVariants = {
    animate: {
      opacity: [0.4, 0.8, 0.4],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with AI Bootcamp Team on WhatsApp"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="relative group">
        {/* Outer neon glow layer 1 */}
        <motion.div
          variants={glowVariants}
          animate="animate"
          className="absolute -inset-4 rounded-full bg-gradient-to-r from-green-400/50 via-emerald-400/40 to-green-500/50 blur-3xl"
        />

        {/* Outer neon glow layer 2 */}
        <motion.div
          variants={glowVariants}
          animate="animate"
          transition={{ delay: 0.2 }}
          className="absolute -inset-2 rounded-full bg-gradient-to-r from-green-400/70 via-emerald-500/60 to-green-500/70 blur-2xl"
        />

        {/* Neon pulse ring */}
        <motion.div
          variants={pulseVariants}
          animate="animate"
          className="absolute -inset-1 rounded-full border-2 border-green-400/40"
        />

        {/* Main button container */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
        >
          {/* Button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-2xl ring-2 ring-green-400/50 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-green-300/70 hover:shadow-green-500/60"
          >
            {/* Neon glow on button */}
            <div className='absolute inset-0 rounded-full bg-gradient-to-br from-green-300/20 to-emerald-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

            {/* Icon with glow */}
            <MessageCircle className="h-7 w-7 drop-shadow-lg relative z-10" />

            {/* Shimmer effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </motion.button>
        </motion.div>

        {/* Premium glassmorphism tooltip with neon glow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="pointer-events-none absolute bottom-full right-0 mb-4 hidden group-hover:block"
        >
          <div className="relative">
            {/* Tooltip glow background */}
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(34, 211, 238, 0.1)',
                  '0 0 40px rgba(34, 211, 238, 0.3)',
                  '0 0 20px rgba(34, 211, 238, 0.1)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-1 rounded-lg bg-gradient-to-r from-green-400/20 to-emerald-500/20 blur-lg"
            />

            {/* Tooltip content */}
            <div className="relative rounded-lg border border-green-400/40 bg-green-500/15 backdrop-blur-xl px-4 py-2 text-sm font-semibold text-white shadow-2xl shadow-green-500/30">
              Chat with AI Bootcamp Team 💬
              {/* Tooltip arrow */}
              <div className="absolute top-full right-4 h-2 w-2 -translate-y-1 rotate-45 border-r border-t border-green-400/40 bg-green-500/15" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.a>
  )
}
