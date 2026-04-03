'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function FinalCTA() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, rgba(34, 211, 238, 0.2) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 0%, rgba(168, 85, 247, 0.2) 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(34, 211, 238, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 0%, rgba(34, 211, 238, 0.2) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className='absolute inset-0 pointer-events-none'
      />

      <div className="mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight"
          >
            Ready to Start Your
            <span className='block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
              AI Journey?
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center items-center"
          >
            <Link href="/register" className="w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-10 py-6 text-xl rounded-xl font-bold shadow-lg"
                >
                  Register Now
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 