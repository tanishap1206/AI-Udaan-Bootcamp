'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeUpVariants } from '@/lib/animationVariants'
import { useSearchParams } from 'next/navigation'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const name = searchParams.get('name') || 'Learner'
  const email = searchParams.get('email') || ''
  const mobile = searchParams.get('mobile') || ''

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden flex items-center justify-center py-20 px-4">
      {/* Animated gradient backgrounds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top gradient blob */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl opacity-60 animate-pulse" />

        {/* Bottom gradient blob */}
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-3xl opacity-60 animate-pulse" />

        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl opacity-40" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-2xl relative z-10 text-center"
      >
        {/* Glass Card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 md:p-16 shadow-2xl shadow-cyan-500/10">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full opacity-75 blur-lg animate-pulse" />
              <div className="relative w-24 h-24 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                <motion.svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  strokeWidth={2}
                >
                  <motion.path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </div>
            </div>
          </motion.div>

          {/* Main Heading with Username */}
          <motion.h1
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-black mb-2"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Registration सफल! 🎉
            </span>
          </motion.h1>

          {/* Welcome message with name */}
          <motion.p
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="text-lg md:text-2xl text-cyan-300 mb-6 font-semibold"
          >
            Welcome, <span className="text-white">{name}</span>! 👋
          </motion.p>

          {/* Subtitle */}
          <motion.p
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.45 }}
            className="text-base md:text-lg text-gray-300 mb-8"
          >
            You're officially registered for the AI Udaan Bootcamp 2026
          </motion.p>

          {/* Registration Details Card */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
            className="bg-white/5 border border-cyan-400/30 rounded-xl p-6 mb-8 text-left"
          >
            <h3 className="text-cyan-400 font-bold text-lg mb-4">📋 Your Registration Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-gray-400 text-base">Name:</span>
                <span className="text-white font-semibold text-base">{name}</span>
              </div>
              {email && (
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="text-gray-400 text-base">Email:</span>
                  <span className="text-white font-semibold truncate text-base">{email}</span>
                </div>
              )}
              {mobile && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-base">Mobile:</span>
                  <span className="text-white font-semibold text-base">{mobile}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Bootcamp Schedule */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.55 }}
            className="bg-white/5 border border-purple-400/30 rounded-xl p-6 mb-8 text-left"
          >
            <h3 className="text-purple-400 font-bold text-lg mb-4">📅 Bootcamp Schedule</h3>
            <div className="space-y-3 text-gray-300 text-base">
              <div className="flex gap-3">
                <span className="text-purple-400 font-bold">📌</span>
                <span><strong>Duration:</strong> 2 Days Intensive</span>
              </div>
              <div className="flex gap-3">
                <span className="text-purple-400 font-bold">🏫</span>
                <span><strong>Location:</strong> Buddha Institute of Technology, Gaya</span>
              </div>
              <div className="flex gap-3">
                <span className="text-purple-400 font-bold">👥</span>
                <span><strong>Target:</strong> Class 10th & 12th Students</span>
              </div>
              <div className="flex gap-3">
                <span className="text-purple-400 font-bold">🎓</span>
                <span><strong>Certificate:</strong> Included with completion</span>
              </div>
            </div>
          </motion.div>

          {/* What's Next */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="space-y-4 mb-10"
          >
            <h3 className="text-cyan-400 font-bold text-lg">🚀 What's Next?</h3>
            <div className="border-t border-white/20 pt-6">
              <ul className="text-gray-300 space-y-3 text-left max-w-md mx-auto">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold mt-1 text-lg">✓</span>
                  <span><strong>Check your email</strong> for bootcamp details and login credentials</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold mt-1 text-lg">✓</span>
                  <span><strong>Join our WhatsApp group</strong> for real-time updates and announcements</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold mt-1 text-lg">✓</span>
                  <span><strong>Prepare in advance</strong> with resources we'll share before the bootcamp</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold mt-1 text-lg">✓</span>
                  <span><strong>Bring a laptop</strong> with stable internet connection for the session</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/" className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <button className="relative bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-4 text-lg rounded-xl font-bold border border-cyan-400/30 shadow-xl shadow-cyan-500/20 transition w-full">
                Back to Home
              </button>
            </Link>

            <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <button className="relative bg-white/10 border-2 border-white/30 hover:bg-green-500/10 text-white px-8 py-4 text-lg rounded-xl font-bold shadow-lg transition w-full">
                Join WhatsApp Group
              </button>
            </a>
          </motion.div>

          {/* Footer message */}
          <motion.p
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8 }}
            className="text-gray-400 text-sm mt-8"
          >
            Any questions? Contact us on WhatsApp or email. We're here to help! 💙
          </motion.p>
        </div>

        {/* Floating decorative elements */}
        <motion.div
          className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </motion.div>
    </div>
  )
}
