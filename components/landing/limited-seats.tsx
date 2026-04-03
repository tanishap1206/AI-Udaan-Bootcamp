'use client'

import { motion } from 'framer-motion'
import { fadeUpVariants, glowPulseVariants } from '@/lib/animationVariants'

const urgencyPoints = [
  { icon: '⚡', text: 'Limited seats available', color: 'from-cyan-400 to-blue-400' },
  { icon: '🎯', text: 'First come, first served', color: 'from-purple-400 to-pink-400' },
  { icon: '🏆', text: 'Certificate + Portfolio included', color: 'from-pink-400 to-rose-400' }
]

export function LimitedSeats() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="mx-auto max-w-4xl">
        {/* Background glow */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 40px rgba(34, 211, 238, 0.2), 0 0 80px rgba(168, 85, 247, 0.1)',
              '0 0 60px rgba(34, 211, 238, 0.4), 0 0 120px rgba(168, 85, 247, 0.2)',
              '0 0 40px rgba(34, 211, 238, 0.2), 0 0 80px rgba(168, 85, 247, 0.1)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className='absolute inset-0 rounded-3xl pointer-events-none'
        />

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Heading */}
          <div className="text-center mb-12">
            <motion.h2
              className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight"
            >
              Limited Seats
              <span className='block bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent'>
                Available! 🔥
              </span>
            </motion.h2>
            <p className="text-2xl text-white/80 font-semibold">
              Don't miss this life-changing opportunity
            </p>
          </div>

          {/* Main card with neon glow */}
          <motion.div
            variants={glowPulseVariants}
            animate="animate"
            className='relative'
          >
            {/* Neon border - top */}
            <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent' />
            {/* Neon border - bottom */}
            <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent' />
            {/* Neon border - left */}
            <div className='absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-purple-400 to-transparent' />
            {/* Neon border - right */}
            <div className='absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent' />

            {/* Card background */}
            <div className="relative backdrop-blur-2xl bg-gradient-to-br from-cyan-500/10 to-pink-500/10 border border-white/20 rounded-2xl p-10 md:p-16 overflow-hidden">
              {/* Animated background accent */}
              <div className='absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-pink-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl -z-10' />
              <div className='absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-cyan-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl -z-10' />

              {/* Alert icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                viewport={{ once: true }}
                className="flex justify-center mb-8"
              >
                <div className='w-20 h-20 rounded-full bg-gradient-to-br from-pink-500/30 to-rose-500/20 flex items-center justify-center text-4xl border border-pink-400/30 shadow-2xl shadow-pink-500/30'>
                  ⚡
                </div>
              </motion.div>

              {/* Main call to action */}
              <h3 className="text-4xl md:text-5xl font-black text-center text-white mb-8">
                Act Now!
              </h3>

              {/* Urgency points */}
              <div className="space-y-4 mb-10">
                {urgencyPoints.map((point, index) => (
                  <motion.div
                    key={point.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="flex items-center gap-4 p-4 rounded-xl backdrop-blur-lg bg-white/5 border border-white/10 hover:border-white/30 group-hover:bg-white/10 transition-all">
                      {/* Animated icon */}
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, delay: index * 0.2, repeat: Infinity }}
                        className='text-2xl'
                      >
                        {point.icon}
                      </motion.span>

                      {/* Text with gradient */}
                      <span className={`text-white font-bold text-xl bg-gradient-to-r ${point.color} bg-clip-text text-transparent`}>
                        {point.text}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Countdown style info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className='text-center p-6 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/30 backdrop-blur-lg'
              >
                <p className='text-white/90 font-semibold text-xl mb-2'>
                  Register within 48 hours for early-bird benefits
                </p>
                <p className='text-pink-300 font-bold text-sm'>
                  Only 5 remaining slots - Hurry! ⏳
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}