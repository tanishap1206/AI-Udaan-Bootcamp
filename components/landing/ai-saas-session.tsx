'use client'

import { motion } from 'framer-motion'
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animationVariants'

const learningPoints = [
  'AI Prompt Engineering',
  'Web App Development',
  'UI/UX Design',
  'Content Generation',
  'Deployment & Hosting'
]

const flowSteps = [
  { step: 'Idea', icon: '💡', color: 'from-cyan-500 to-blue-500' },
  { step: 'Prompt', icon: '✍️', color: 'from-blue-500 to-purple-500' },
  { step: 'Content', icon: '📝', color: 'from-purple-500 to-pink-500' },
  { step: 'Design', icon: '🎨', color: 'from-pink-500 to-rose-500' },
  { step: 'Web Output', icon: '🌐', color: 'from-rose-500 to-cyan-500' }
]

export function AISaasSession() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
            Build a Real
            <span className='block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent'>
              AI Web Application
            </span>
          </h2>
          <p className="text-2xl text-cyan-300 font-bold">AI Resume Generator</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Learning Points */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='relative group'
          >
            <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity' />
            <div className='relative backdrop-blur-xl bg-white/5 border border-cyan-400/30 rounded-2xl p-10 shadow-2xl'>
              <h3 className="text-3xl font-bold text-white mb-6">What You'll Learn</h3>
              <motion.ul
                variants={staggerContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {learningPoints.map((point) => (
                  <motion.li
                    key={point}
                    variants={staggerItemVariants}
                    className="flex items-center gap-3 text-white/90 text-base"
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex-shrink-0" />
                    <span className="font-medium">{point}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>

          {/* Flow Diagram */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className='relative group'
          >
            <div className='absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity' />
            <div className='relative backdrop-blur-xl bg-white/5 border border-purple-400/30 rounded-2xl p-10 shadow-2xl'>
              <h3 className="text-3xl font-bold text-white mb-6 text-center">Project Flow</h3>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
                {flowSteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center relative"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-xl sm:text-2xl shadow-lg shadow-cyan-500/30`}
                    >
                      {step.icon}
                    </motion.div>
                    <span className="text-xs sm:text-sm font-bold text-white mt-2">{step.step}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}