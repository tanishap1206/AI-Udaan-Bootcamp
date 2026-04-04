'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export function EnquireCTA() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/enquire')
  }

  return (
    <section id="questions" className="relative py-20 px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-purple-500/5" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mx-auto text-center relative z-10"
      >
        <h2 className="text-3xl md:text-4xl font-black mb-6">
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Have Any Questions?
          </span>
        </h2>

        <p className="text-gray-300 text-lg mb-10">
          Have any doubts or queries? Reach out to us and we'll be happy to help clarify everything.
        </p>

        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="relative inline-block"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-cyan-500 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />

          {/* Button */}
          <div className="relative px-10 py-4 rounded-full font-bold text-lg text-white bg-cyan-500 hover:bg-cyan-600 hover:shadow-2xl transition-all duration-300 flex items-center gap-2 group">
            Enquire Now
            <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </motion.button>

        <p className="text-gray-400 text-sm mt-8">
          Join 5000+ aspiring AI professionals
        </p>

        {/* Contact Information */}
        <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-8">
          <div className="flex items-center gap-3 bg-white/5 border border-white/20 rounded-lg px-6 py-4 hover:bg-white/10 transition-all duration-300">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-400">Email</p>
              <a href="mailto:info@aiudaan.com" className="text-white font-semibold hover:text-cyan-300 transition">
                info@aiudaan.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 border border-white/20 rounded-lg px-6 py-4 hover:bg-white/10 transition-all duration-300">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-400">Phone</p>
              <a href="tel:+919876543210" className="text-white font-semibold hover:text-cyan-300 transition">
                +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
