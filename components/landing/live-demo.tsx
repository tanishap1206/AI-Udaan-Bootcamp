'use client'

import { motion } from 'framer-motion'

const demoPoints = [
  'Real-time AI content creation',
  'Resume generator demo',
  'Full workflow demonstration'
]

export function LiveDemo() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight">
            Live
            <span className='block bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent'>
              Demo
            </span>
          </h2>
          <p className="text-2xl text-white/70">See the power of AI in action</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='relative group'
        >
          <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-3xl opacity-50' />
          <div className='relative backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-10 shadow-2xl'>
            <div className="text-center mb-8">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 bg-gradient-to-br from-cyan-500/30 to-pink-500/30 border border-white/20 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg"
              >
                🎥
              </motion.div>
              <h3 className="text-3xl font-bold text-white">Interactive Live Session</h3>
            </div>

            <div className="space-y-3">
              {demoPoints.map((point, index) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-3 backdrop-blur-lg bg-white/10 border border-white/10 rounded-xl hover:border-white/30 transition"
                >
                  <span className='w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-pink-400 flex-shrink-0' />
                  <span className="text-white font-medium">{point}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}