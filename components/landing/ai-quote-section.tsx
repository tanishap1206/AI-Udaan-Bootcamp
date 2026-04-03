'use client'

import { motion } from 'framer-motion'

export function AIQuoteSection() {
  return (
    <section className='relative py-32 px-6 overflow-hidden'>
      <div className='mx-auto max-w-4xl'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='relative'
        >
          {/* Glow background */}
          <div className='absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 blur-3xl rounded-3xl opacity-60' />

          {/* Content */}
          <div className='relative backdrop-blur-2xl bg-white/5 border border-white/20 rounded-3xl p-12 md:p-16'>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
              className='text-center'
            >
              <p className='text-3xl md:text-5xl font-bold leading-relaxed mb-8'>
                <span className='bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent'>
                  AI is not the future.
                </span>
                <br />
                <span className='text-white'>
                  It's happening right now.
                </span>
              </p>

              <p className='text-2xl text-white/70'>
                Master it today, lead tomorrow.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
