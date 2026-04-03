'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export function EnquireCTA() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/enquire')
  }

  return (
    <section className="relative py-20 px-4">
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
      </motion.div>
    </section>
  )
}
