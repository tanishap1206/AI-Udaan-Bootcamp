'use client'

import { motion } from 'framer-motion'
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animationVariants'

const contentCards = [
  { title: 'Product photography using AI', color: 'from-cyan-400 to-blue-400' },
  { title: 'AI Ads & CGI', color: 'from-blue-400 to-purple-400' },
  { title: 'Storytelling', color: 'from-purple-400 to-pink-400' },
  { title: 'AI avatars', color: 'from-pink-400 to-rose-400' },
  { title: 'Voice generation', color: 'from-rose-400 to-cyan-400' }
]

const tools = [
  { name: 'ChatGPT', icon: '🤖' },
  { name: 'Flow', icon: '🎬' },
  { name: 'HeyGen', icon: '🎭' }
]

export function AIContentFilmmaking() {
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
            AI Content &
            <span className='block bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent'>
              Filmmaking
            </span>
          </h2>
        </motion.div>

        {/* Content Cards */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {contentCards.map((card) => (
            <motion.div
              key={card.title}
              variants={staggerItemVariants}
              whileHover={{ y: -8 }}
              className='group relative'
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className='relative backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-8 min-h-[200px] flex flex-col items-center justify-center text-center shadow-2xl group-hover:shadow-2xl transition-all'>
                <span className='text-4xl mb-4'>🎨</span>
                <h3 className={`font-bold text-xl bg-gradient-to-r ${card.color} bg-clip-text text-transparent group-hover:text-white transition-all`}>
                  {card.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-8">Tools You'll Master</h3>
          <div className="flex flex-wrap justify-center gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                className="text-center group"
              >
                <motion.div className="w-16 h-16 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border border-white/20 rounded-full flex items-center justify-center text-2xl mb-2 shadow-lg group-hover:shadow-cyan-500/30 transition-all">
                  {tool.icon}
                </motion.div>
                <p className='text-white font-semibold'>{tool.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}