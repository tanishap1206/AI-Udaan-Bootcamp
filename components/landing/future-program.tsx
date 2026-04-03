'use client'

import { motion } from 'framer-motion'
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animationVariants'

const futureFeatures = [
  'Advanced AI techniques',
  'Automation workflows',
  'Freelancing strategies'
]

export function FutureProgram() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight">
            Future
            <span className='block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>
              Program
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='relative group'
        >
          <div className='absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-2xl blur-3xl opacity-50' />
          <div className='relative backdrop-blur-xl bg-white/5 border border-blue-400/30 rounded-2xl p-10 shadow-2xl'>
            <div className="text-center mb-6">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 border border-white/20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg"
              >
                🚀
              </motion.div>
              <h3 className="text-3xl font-bold text-white">AI Udaan Advanced Program</h3>
            </div>

            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3"
            >
              {futureFeatures.map((feature) => (
                <motion.div
                  key={feature}
                  variants={staggerItemVariants}
                  className="flex items-center gap-3 text-white/90 p-3 backdrop-blur-lg bg-white/5 border border-white/10 rounded-lg hover:border-white/30 transition"
                >
                  <span className='w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex-shrink-0' />
                  <span className="font-medium capitalize">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}