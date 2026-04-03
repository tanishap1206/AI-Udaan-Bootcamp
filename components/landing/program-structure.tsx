'use client'

import { motion } from 'framer-motion'
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animationVariants'

const days = [
  { day: '01', title: 'Foundations & Tools', items: ['AI basics & ChatGPT mastery', 'Design with Canva & AI', 'Content creation fundamentals'], gradient: 'from-cyan-500/20 to-blue-500/10', border: 'border-cyan-400/30' },
  { day: '02', title: 'Advanced AI Tools', items: ['Prompt engineering secrets', 'SaaS tools & automation demo', 'Monetization strategies'], gradient: 'from-purple-500/20 to-pink-500/10', border: 'border-purple-400/30' },
]

export function ProgramStructure() {
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
            Program
            <span className='block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent'>
              Structure
            </span>
          </h2>
          <p className='text-lg text-white/70 max-w-3xl mx-auto'>A structured timeline for a focused two-day intensive bootcamp.</p>
        </motion.div>

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className='grid gap-8 lg:grid-cols-2'
        >
          {days.map((day) => (
            <motion.div
              key={day.day}
              variants={staggerItemVariants}
              whileHover={{ y: -8 }}
              className='group relative'
            >
              {/* Glow backdrop */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${day.gradient} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              {/* Card */}
              <div className={`relative backdrop-blur-xl bg-white/5 border ${day.border} rounded-2xl p-10 min-h-[280px] shadow-2xl group-hover:shadow-2xl transition-all duration-300`}>
                {/* Day number badge */}
                <div className='flex items-center gap-4 mb-6'>
                  <div className='flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-white/20 to-white/5 border border-white/30 font-black text-2xl text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text'>
                    {day.day}
                  </div>
                  <h3 className='text-3xl font-bold text-white group-hover:text-cyan-300 transition-colors'>{day.title}</h3>
                </div>

                {/* Items list */}
                <ul className='space-y-3'>
                  {day.items.map((item) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                      viewport={{ once: true }}
                      className='flex items-start gap-3 text-white/75 group-hover:text-white/90 transition-colors'
                    >
                      <span className='w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 mt-2 flex-shrink-0' />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
