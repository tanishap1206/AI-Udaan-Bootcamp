'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  DocumentTextIcon,
  MegaphoneIcon,
  ShareIcon,
  Cog6ToothIcon,
  SparklesIcon,
  FilmIcon,
} from '@heroicons/react/24/solid'
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animationVariants'

const projects = [
  {
    title: 'AI Web App Generation',
    icon: DocumentTextIcon,
    description: 'Build full-stack web applications using AI. Learn to create modern web apps with guided steps and real-world deployment.',
    gradient: 'from-cyan-500/20 to-blue-500/10',
    border: 'border-cyan-400/30',
    glow: 'shadow-cyan-500/20',
    details: {
      overview: 'Learn to build production-ready web applications using AI assistance. This project combines frontend, backend, and AI integration.',
      objectives: [
        'Master modern web development frameworks (Next.js, React)',
        'Integrate AI APIs and chatbots into applications',
        'Deploy applications to production'
      ],
      tools: ['Next.js', 'React', 'ChatGPT API', 'Vercel'],
      duration: '4-6 weeks',
      difficulty: 'Intermediate to Advanced'
    }
  },
  {
    title: 'AI Product Advertisement',
    icon: MegaphoneIcon,
    description: 'Generate compelling product ads using AI. Create landing pages, ad copy, and marketing materials for real businesses.',
    gradient: 'from-blue-500/20 to-purple-500/10',
    border: 'border-blue-400/30',
    glow: 'shadow-blue-500/20',
    details: {
      overview: 'Create professional marketing materials and advertisements using AI tools. Learn copywriting, design, and campaign optimization.',
      objectives: [
        'Generate compelling ad copy using ChatGPT and Claude',
        'Design graphics with Midjourney/DALL-E',
        'Create responsive landing pages'
      ],
      tools: ['ChatGPT', 'Midjourney', 'Figma', 'Google Ads'],
      duration: '3-5 weeks',
      difficulty: 'Beginner to Intermediate'
    }
  },
  {
    title: 'Social Media Designs',
    icon: ShareIcon,
    description: 'Design eye-catching social media posts and graphics. Learn to use AI tools to create viral-worthy content.',
    gradient: 'from-purple-500/20 to-pink-500/10',
    border: 'border-purple-400/30',
    glow: 'shadow-purple-500/20',
    details: {
      overview: 'Master social media design and content creation using AI. Create viral-worthy posts for Instagram, TikTok, LinkedIn, and more.',
      objectives: [
        'Create consistent brand visuals using AI design tools',
        'Design video thumbnails and promotional graphics',
        'Optimize content for different social platforms'
      ],
      tools: ['Canva', 'Midjourney', 'Adobe Firefly', 'ChatGPT'],
      duration: '3-4 weeks',
      difficulty: 'Beginner'
    }
  },
  {
    title: 'AI Filmmaking',
    icon: FilmIcon,
    description: 'Create AI-powered films with talking avatars, CGI, and video production. Master the art of visual storytelling with AI.',
    gradient: 'from-pink-500/20 to-rose-500/10',
    border: 'border-pink-400/30',
    glow: 'shadow-pink-500/20',
    details: {
      overview: 'Produce professional-quality videos and films using AI tools. Learn video production, animation, and visual effects creation.',
      objectives: [
        'Create talking avatar videos with HeyGen and Synthesia',
        'Master video editing and post-production',
        'Produce complete short films with AI assistance'
      ],
      tools: ['HeyGen', 'Synthesia', 'Runway ML', 'Adobe Premiere'],
      duration: '6-8 weeks',
      difficulty: 'Intermediate to Advanced'
    }
  },
  {
    title: 'Prompt Engineering',
    icon: SparklesIcon,
    description: 'Master the art of crafting powerful AI prompts. Learn advanced techniques to unlock the full potential of LLMs.',
    gradient: 'from-rose-500/20 to-orange-500/10',
    border: 'border-rose-400/30',
    glow: 'shadow-rose-500/20',
    details: {
      overview: 'Become an expert in prompt engineering. Learn to write effective prompts that maximize AI model capabilities and accuracy.',
      objectives: [
        'Master prompt structure and best practices',
        'Learn chain-of-thought and few-shot prompting',
        'Create custom GPT applications'
      ],
      tools: ['ChatGPT', 'Claude', 'GPT-4', 'Prompt Frameworks'],
      duration: '2-3 weeks',
      difficulty: 'Beginner to Intermediate'
    }
  },
  {
    title: 'AI Automation Workflows',
    icon: Cog6ToothIcon,
    description: 'Build end-to-end AI automation systems. Create intelligent workflows that save time and boost productivity.',
    gradient: 'from-orange-500/20 to-cyan-500/10',
    border: 'border-orange-400/30',
    glow: 'shadow-orange-500/20',
    details: {
      overview: 'Design and implement intelligent automation systems. Create workflows that integrate AI into business processes.',
      objectives: [
        'Build automation workflows using Make.com and Zapier',
        'Integrate AI APIs into automation pipelines',
        'Create data processing workflows'
      ],
      tools: ['Make.com', 'Zapier', 'N8N', 'Python', 'OpenAI API'],
      duration: '4-6 weeks',
      difficulty: 'Intermediate'
    }
  }
]

export function WhatYouWillBuild() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedProject])
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
                className='group relative flex flex-col h-full'
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.gradient} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Card */}
                <div className={`relative backdrop-blur-xl bg-white/5 border ${project.border} rounded-2xl p-8 md:p-10 h-full flex flex-col justify-between shadow-2xl ${project.glow} group-hover:shadow-2xl transition-all duration-300 overflow-hidden`}>
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
                  <div className='flex-1 mb-6'>
                    <h3 className='text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors'>
                      {project.title}
                    </h3>
                    <p className='text-base text-white/70 group-hover:text-white/80 transition-colors leading-relaxed'>
                      {project.description}
                    </p>
                  </div>

                  {/* Button & Bottom accent */}
                  <div className='space-y-4'>
                    {/* Details Button */}
                    <motion.button
                      onClick={() => setSelectedProject(project)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className='w-full py-3 px-5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/50'
                    >
                      Click here for details
                    </motion.button>

                    {/* Bottom accent */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className='h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent origin-left'
                    />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className='fixed inset-0 bg-black/80 backdrop-blur-md z-40'
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className='fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto'
              >
                <div className='w-full max-w-2xl my-8'>
                  <motion.div
                    className='bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden'
                  >
                    {/* Header with gradient accent */}
                    <div className='h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500' />
                    
                    <div className='p-8 md:p-10 space-y-6 max-h-[85vh] overflow-y-auto'>
                      {/* Close Button */}
                      <motion.button
                        onClick={() => setSelectedProject(null)}
                        className='absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all'
                        whileHover={{ scale: 1.1 }}
                      >
                        <span className='text-white text-xl'>✕</span>
                      </motion.button>

                      {/* Title */}
                      <div>
                        <h3 className='text-3xl md:text-4xl font-bold text-white mb-2'>
                          {selectedProject.title}
                        </h3>
                        <div className='h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full' />
                      </div>

                      {/* Overview */}
                      <div>
                        <h4 className='text-lg font-semibold text-cyan-300 mb-3'>Overview</h4>
                        <p className='text-white/80 leading-relaxed'>
                          {selectedProject.details.overview}
                        </p>
                      </div>

                      {/* Objectives */}
                      <div>
                        <h4 className='text-lg font-semibold text-cyan-300 mb-3'>Learning Objectives</h4>
                        <ul className='space-y-2'>
                          {selectedProject.details.objectives.map((objective, idx) => (
                            <li key={idx} className='flex items-start gap-3 text-white/80'>
                              <span className='text-cyan-400 font-bold mt-1'>✓</span>
                              <span>{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tools & Technologies */}
                      <div>
                        <h4 className='text-lg font-semibold text-cyan-300 mb-3'>Tools & Technologies</h4>
                        <div className='flex flex-wrap gap-2'>
                          {selectedProject.details.tools.map((tool, idx) => (
                            <span
                              key={idx}
                              className='px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 text-sm'
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Course Details Grid */}
                      <div className='grid grid-cols-3 gap-4'>
                        <div className='p-3 rounded-lg bg-white/5 border border-white/10'>
                          <p className='text-xs text-white/60 mb-1'>Duration</p>
                          <p className='text-sm font-semibold text-white'>{selectedProject.details.duration}</p>
                        </div>
                        <div className='p-3 rounded-lg bg-white/5 border border-white/10'>
                          <p className='text-xs text-white/60 mb-1'>Difficulty</p>
                          <p className='text-sm font-semibold text-white'>{selectedProject.details.difficulty}</p>
                        </div>
                        <div className='p-3 rounded-lg bg-white/5 border border-white/10'>
                          <p className='text-xs text-white/60 mb-1'>Skills</p>
                          <p className='text-sm font-semibold text-cyan-300'>Practical</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className='flex gap-3 pt-4'>
                        <motion.button
                          onClick={() => {
                            // Dispatch event to show registration modal
                            window.dispatchEvent(new Event('enrollNow'))
                            // Close course details modal
                            setSelectedProject(null)
                          }}
                          whileHover={{ scale: 1.05 }}
                          className='flex-1 py-3 px-5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold transition-all duration-300'
                        >
                          Enroll Now
                        </motion.button>
                        <motion.button
                          onClick={() => setSelectedProject(null)}
                          whileHover={{ scale: 1.05 }}
                          className='px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold transition-all duration-300'
                        >
                          Close
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
