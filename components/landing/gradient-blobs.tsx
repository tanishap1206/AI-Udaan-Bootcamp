'use client'

import { motion } from 'framer-motion'

export function GradientBlobs() {
  return (
    <div className='fixed inset-0 pointer-events-none'>
      {/* Large blob 1 - Top left */}
      <motion.div
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -30, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className='absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl'
      />

      {/* Large blob 2 - Right side */}
      <motion.div
        animate={{
          x: [0, -30, 30, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className='absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-bl from-pink-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl'
      />

      {/* Medium blob 3 - Bottom center */}
      <motion.div
        animate={{
          x: [0, 20, -20, 0],
          y: [0, -20, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className='absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-t from-purple-500/15 via-blue-500/10 to-transparent rounded-full blur-3xl'
      />

      {/* Small accent blob */}
      <motion.div
        animate={{
          scale: [1, 1.1, 0.9, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className='absolute top-1/2 right-1/4 w-32 h-32 bg-gradient-to-br from-cyan-400/30 via-blue-400/20 to-transparent rounded-full blur-2xl'
      />
    </div>
  )
}
