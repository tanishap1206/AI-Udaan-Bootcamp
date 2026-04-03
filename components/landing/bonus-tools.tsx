'use client'

import { motion } from 'framer-motion'
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animationVariants'

const bonusTools = [
  { name: 'Descript', icon: '🎙️', gradient: 'from-cyan-500/20 to-blue-500/10', border: 'border-cyan-400/30' },
  { name: 'Veed AI', icon: '✂️', gradient: 'from-blue-500/20 to-purple-500/10', border: 'border-blue-400/30' },
  { name: 'ElevenLabs', icon: '🔊', gradient: 'from-purple-500/20 to-pink-500/10', border: 'border-purple-400/30' },
  { name: 'Adobe Podcast', icon: '🎧', gradient: 'from-pink-500/20 to-rose-500/10', border: 'border-pink-400/30' }
]

export function BonusTools() {
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
            Bonus
            <span className='block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
              Tools
            </span>
          </h2>
          <p className="text-lg text-white/70">Additional powerful tools you'll get access to</p>
        </motion.div>

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {bonusTools.map((tool) => (
            <motion.div
              key={tool.name}
              variants={staggerItemVariants}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tool.gradient} blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className={`relative backdrop-blur-xl bg-white/5 border ${tool.border} rounded-2xl p-8 min-h-[200px] flex flex-col items-center justify-center text-center shadow-2xl group-hover:shadow-2xl transition-all`}>
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className='text-4xl mb-4'
                >
                  {tool.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">{tool.name}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}