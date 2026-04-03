'use client'

import { motion } from 'framer-motion'

export function KeyMessage() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, rgba(34, 211, 238, 0.2) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 0%, rgba(168, 85, 247, 0.2) 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(34, 211, 238, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 0%, rgba(34, 211, 238, 0.2) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className='absolute inset-0 pointer-events-none'
      />

      <div className="mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Glowing container */}
          <div className='relative'>
            <div className='absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-50' />
            
            <div className='relative backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl p-12 md:p-16'>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-5xl lg:text-7xl xl:text-8xl font-black leading-tight"
              >
                <span className='text-white'>"AI will not replace you,</span>
                <br />
                <span className='bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
                  but people using AI will replace you"
                </span>
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className='mt-6 text-xl text-white/70'
              >
                Join the AI revolution today.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}