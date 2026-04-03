'use client'

import { motion } from 'framer-motion'
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animationVariants'

const earningOpportunities = [
  {
    title: 'Freelancing',
    icon: '💼',
    description: 'Create AI content for clients',
    gradient: 'from-cyan-500/20 to-blue-500/10',
    border: 'border-cyan-400/30',
  },
  {
    title: 'Internships',
    icon: '🏢',
    description: 'AI-focused company positions',
    gradient: 'from-blue-500/20 to-purple-500/10',
    border: 'border-blue-400/30',
  },
  {
    title: 'Client Work',
    icon: '🤝',
    description: 'Direct business opportunities',
    gradient: 'from-purple-500/20 to-pink-500/10',
    border: 'border-purple-400/30',
  },
  {
    title: 'Content Income',
    icon: '💰',
    description: 'Monetize your AI creations',
    gradient: 'from-pink-500/20 to-rose-500/10',
    border: 'border-pink-400/30',
  }
]

export function Earning() {
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
          <h2 className='text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight'>
            Start Earning
            <span className='block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
              with AI Skills
            </span>
          </h2>
          <p className='text-xl text-white/70'>Turn your learning into income immediately</p>
        </motion.div>

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {earningOpportunities.map((opportunity) => (
            <motion.div
              key={opportunity.title}
              variants={staggerItemVariants}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Glow backdrop */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${opportunity.gradient} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Card */}
              <div className={`relative backdrop-blur-xl bg-white/5 border ${opportunity.border} rounded-2xl p-8 min-h-[240px] flex flex-col items-center justify-center text-center shadow-2xl group-hover:shadow-2xl transition-all duration-300`}>
                {/* Icon container */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className='w-16 h-16 rounded-xl bg-gradient-to-br from-white/20 to-white/5 border border-white/20 flex items-center justify-center text-3xl mb-4 shadow-lg'
                >
                  {opportunity.icon}
                </motion.div>

                {/* Title */}
                <h3 className='text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors'>
                  {opportunity.title}
                </h3>

                {/* Description */}
                <p className='text-lg text-white/70 group-hover:text-white/90 transition-colors'>
                  {opportunity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}