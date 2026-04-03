'use client'

import { motion } from 'framer-motion'
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animationVariants'

const features = [
  { icon: '💻', title: 'No Coding Required', text: 'Learn AI without complex programming', gradient: 'from-cyan-500/20 to-blue-500/10', border: 'border-cyan-400/30' },
  { icon: '🌱', title: 'Beginner-Friendly', text: 'Friendly curriculum for first-time learners', gradient: 'from-blue-500/20 to-purple-500/10', border: 'border-blue-400/30' },
  { icon: '🛠️', title: '100% Practical Learning', text: 'Hands-on sessions with real tools', gradient: 'from-purple-500/20 to-pink-500/10', border: 'border-purple-400/30' },
  { icon: '🎯', title: 'Real-World Projects', text: 'Build projects for resumes', gradient: 'from-pink-500/20 to-rose-500/10', border: 'border-pink-400/30' },
  { icon: '💼', title: 'Career-Focused', text: 'Job & internship readiness', gradient: 'from-rose-500/20 to-cyan-500/10', border: 'border-rose-400/30' },
]

export function WhyThisBootcamp() {
  return (
    <section className='relative py-24 px-6 overflow-hidden'>
      <div className='mx-auto max-w-6xl'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight'>
            Why This
            <span className='block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent'>
              Bootcamp
            </span>
          </h2>
          <p className='text-lg text-white/70 max-w-3xl mx-auto'>
            A trusted program built for students to gain practical AI skills quickly with real-world applications.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className='grid gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-3'
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={staggerItemVariants}
              whileHover={{ y: -8 }}
              className='group relative'
            >
              {/* Glow backdrop */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              {/* Card */}
              <div className={`relative backdrop-blur-xl bg-white/5 border ${feature.border} rounded-2xl p-8 min-h-[220px] flex flex-col items-center text-center shadow-2xl group-hover:shadow-2xl transition-all duration-300`}>
                {/* Icon */}
                <div className='text-4xl mb-4'>{feature.icon}</div>
                
                {/* Title */}
                <h3 className='text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors'>
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className='text-white/70 group-hover:text-white/90 transition-colors text-base'>
                  {feature.text}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
