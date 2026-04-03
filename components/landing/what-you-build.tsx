'use client'

import { motion } from 'framer-motion'
import {
  DocumentTextIcon,
  MegaphoneIcon,
  ShareIcon,
  UserCircleIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/solid'
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animationVariants'

const projects = [
  {
    title: 'AI Resume Generator Web App',
    icon: DocumentTextIcon,
    description: 'Build a practical output with guided steps and group support.',
    gradient: 'from-cyan-500/20 to-blue-500/10',
    border: 'border-cyan-400/30',
    glow: 'shadow-cyan-500/20',
  },
  {
    title: 'AI Product Advertisement',
    icon: MegaphoneIcon,
    description: 'Build a practical output with guided steps and group support.',
    gradient: 'from-blue-500/20 to-purple-500/10',
    border: 'border-blue-400/30',
    glow: 'shadow-blue-500/20',
  },
  {
    title: 'Social Media Designs',
    icon: ShareIcon,
    description: 'Build a practical output with guided steps and group support.',
    gradient: 'from-purple-500/20 to-pink-500/10',
    border: 'border-purple-400/30',
    glow: 'shadow-purple-500/20',
  },
  {
    title: 'AI Talking Avatar Videos',
    icon: UserCircleIcon,
    description: 'Build a practical output with guided steps and group support.',
    gradient: 'from-pink-500/20 to-rose-500/10',
    border: 'border-pink-400/30',
    glow: 'shadow-pink-500/20',
  },
  {
    title: 'Real AI Workflow System',
    icon: Cog6ToothIcon,
    description: 'Build a practical output with guided steps and group support.',
    gradient: 'from-rose-500/20 to-cyan-500/10',
    border: 'border-rose-400/30',
    glow: 'shadow-rose-500/20',
  }
]

export function WhatYouWillBuild() {
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
            What You Will Build
            <span className='block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
              in This Bootcamp
            </span>
          </h2>
          <p className='text-lg md:text-xl text-white/70 max-w-3xl mx-auto'>
            Hands-on projects designed for learners building a strong foundational portfolio with real-world applications.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10'
        >
          {projects.map((project, index) => {
            const Icon = project.icon
            return (
              <motion.div
                key={project.title}
                variants={staggerItemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className='group relative'
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.gradient} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Card */}
                <div className={`relative backdrop-blur-xl bg-white/5 border ${project.border} rounded-2xl p-8 md:p-10 min-h-[280px] flex flex-col justify-between shadow-2xl ${project.glow} group-hover:shadow-2xl transition-all duration-300 overflow-hidden`}>
                  {/* Top accent */}
                  <div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent' />

                  {/* Icon container */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className='mb-6'
                  >
                    <div className='flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-white/20 to-white/5 border border-white/20 group-hover:border-white/40 transition-all'>
                      <Icon className='w-8 h-8 text-white' />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className='flex-1'>
                    <h3 className='text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors'>
                      {project.title}
                    </h3>
                    <p className='text-lg text-white/60 group-hover:text-white/80 transition-colors'>
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom accent */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className='mt-6 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent origin-left'
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
