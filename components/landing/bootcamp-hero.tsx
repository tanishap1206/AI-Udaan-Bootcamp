'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { fadeUpVariants, floatingVariants } from '@/lib/animationVariants'

export function BootcampHero() {
  return (
    <section id="home" className="relative min-h-screen py-32 px-6 flex items-center justify-center overflow-hidden">
      {/* Animated gradient borders */}
      <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none' />

      <div className="mx-auto max-w-6xl w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 backdrop-blur-sm"
            >
              <span className='w-2 h-2 rounded-full bg-cyan-400 animate-pulse' />
              <span className='text-base font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'>
                2-Day Intensive Bootcamp
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tighter\">
                <span className='block text-white mb-3'>AI Udaan</span>
                <span className='block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse'>
                  Bootcamp
                </span>
                <span className='block text-white'>2026</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-3xl text-white leading-relaxed max-w-3xl font-medium"
            >
              <span className='font-bold text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text'>Master AI Tools</span>, Content Creation & Real-World Skills
            </motion.p>

            {/* Learn → Build → Earn */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-3"
            >
              <p className="text-2xl font-semibold text-cyan-400">
                Learn AI → Build Projects → Start Earning
              </p>
              <div className='h-1 w-32 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full' />
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-4 pt-6 border-t border-white/20"
            >
              <p className="flex items-center gap-4 text-white text-xl font-medium">
                <span className='w-3 h-3 rounded-full bg-cyan-400 flex-shrink-0' />
                Buddha Institute of Technology, Gaya
              </p>
              <p className="flex items-center gap-4 text-white text-xl font-medium">
                <span className='w-3 h-3 rounded-full bg-purple-400 flex-shrink-0' />
                For Class 10th & 12th Students
              </p>
              <p className="flex items-center gap-4 text-white text-xl font-medium">
                <span className='w-3 h-3 rounded-full bg-pink-400 flex-shrink-0' />
                Limited Seats | Certificate Included
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col gap-4 pt-6"
            >
              <Link href="/register" className="w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full"
                >
                  <Button
                    size="lg"
                    className="w-full px-9 py-8 text-xl rounded-xl font-bold bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg"
                  >
                    Register Now
                  </Button>
                </motion.div>
              </Link>

              {/* Limited Seats Warning Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-orange-500/20 border border-orange-400/50 backdrop-blur-sm"
              >
                <span className="text-xl animate-pulse">⚠️</span>
                <span className="text-orange-300 font-semibold">Only a few seats left! Hurry up</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right side - AI Illustration / Floating cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-full min-h-[700px] hidden md:flex items-center justify-center perspective"
          >
            {/* Central glow circle */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className='absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 blur-3xl'
            />

            {/* Cards container with diagonal flex layout */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Floating AI card 1 - Top Left */}
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="absolute w-64 h-80 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-400/30 p-8 shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all cursor-pointer hover:scale-105 top-0 left-8"
              >
                <div className='text-5xl mb-6'>🤖</div>
                <h3 className='text-white font-bold text-xl mb-3'>AI Tools</h3>
                <p className='text-cyan-300 text-lg leading-relaxed'>Master ChatGPT, Midjourney & more</p>
              </motion.div>

              {/* Floating AI card 2 - Center Right */}
              <motion.div
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: 0.3 }}
                className="absolute w-64 h-80 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 border border-purple-400/30 p-8 shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all cursor-pointer hover:scale-105 top-1/3 right-0"
              >
                <div className='text-5xl mb-6'>💡</div>
                <h3 className='text-white font-bold text-xl mb-3'>Build Projects</h3>
                <p className='text-purple-300 text-lg leading-relaxed'>Real-world applications</p>
              </motion.div>

              {/* Floating AI card 3 - Bottom Left */}
              <motion.div
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: 0.6 }}
                className="absolute w-64 h-80 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-pink-500/20 to-purple-500/10 border border-pink-400/30 p-8 shadow-2xl shadow-pink-500/30 hover:shadow-pink-500/50 transition-all cursor-pointer hover:scale-105 bottom-0 left-8"
              >
                <div className='text-5xl mb-6'>💰</div>
                <h3 className='text-white font-bold text-xl mb-3'>Earn Money</h3>
                <p className='text-pink-300 text-lg leading-relaxed'>Monetize your skills</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}