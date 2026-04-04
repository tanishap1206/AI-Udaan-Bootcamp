'use client'

import { motion } from 'framer-motion'
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animationVariants'

const partners = [
  { name: 'Nighwan Technology', description: 'Industry leaders in AI solutions and automation' },
  { name: 'BR Production', description: 'Expert in digital content and media production' }
]

export function AboutOrganizer() {
  return (
    <section id='about' className='relative py-24 px-6 overflow-hidden'>
      <div className='mx-auto max-w-6xl'>
        <div className='grid gap-12 lg:grid-cols-2 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='space-y-6'
          >
            <h2 className='text-5xl lg:text-6xl font-black text-white leading-tight'>
              About
              <span className='block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent'>
                Our Organizer
              </span>
            </h2>
            <h3 className='text-3xl font-bold text-white'>Buddha Institute of Technology</h3>
            <p className='text-white/80 text-lg'>Empowering the next generation of AI leaders with industry-focused education and practical skills.</p>
            
            {/* Collaboration Section */}
            <div className='space-y-3 pt-4 border-t border-white/20'>
              <p className='text-cyan-300 font-semibold text-lg'>In Collaboration With:</p>
              <motion.div
                variants={staggerContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className='space-y-2'
              >
                {partners.map((partner) => (
                  <motion.div
                    key={partner.name}
                    variants={staggerItemVariants}
                    className='flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10'
                  >
                    <div className='w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 mt-1.5 flex-shrink-0' />
                    <div>
                      <p className='text-white font-semibold'>{partner.name}</p>
                      <p className='text-white/60 text-sm'>{partner.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className='mt-6 p-4 backdrop-blur-xl bg-cyan-500/10 border border-cyan-400/30 rounded-xl'
            >
              <p className='text-cyan-300 italic'>Working on real industry projects across India</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='flex items-center justify-center'
          >
            <div className='relative w-full max-w-md'>
              {/* Glow backdrop */}
              <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl blur-3xl' />
              
              {/* Card */}
              <div className='relative backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-4 shadow-2xl overflow-hidden'>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.644745818265!2d84.8270049748605!3d25.080027277786648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398d31836dba4fd5%3A0x16e2a561ea982154!2sNighwan%20Technology%20Private%20Limited!5e0!3m2!1sen!2sin!4v1775155529011!5m2!1sen!2sin" 
                  width="100%" 
                  height="350" 
                  style={{border: '0', borderRadius: '0.5rem'}}
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className='rounded-lg'
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
