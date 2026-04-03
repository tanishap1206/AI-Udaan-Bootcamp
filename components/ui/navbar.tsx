'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className='w-full bg-slate-950/95 backdrop-blur-xl border-b border-white/20 px-4 pt-6 sm:px-6 lg:px-8 shadow-lg shadow-cyan-500/10'>
      <div className='mx-auto max-w-7xl rounded-full border border-cyan-400/30 bg-gradient-to-r from-slate-950/80 to-slate-900/80 shadow-xl'>
        <div className='relative flex h-28 items-center justify-between px-4 sm:px-6'>
          {/* Logo left */}
          <Link href='/' className='flex items-center gap-4 text-white h-full'>
            <div className='flex items-center justify-center h-20 w-20 rounded-full bg-white overflow-hidden border-2 border-white/50 shadow-lg'>
              <Image
                src='/images/logo.png'
                alt='AI NG LMS logo'
                width={200}
                height={60}
                className='h-full w-full object-contain p-2'
                priority
              />
            </div>
            <span className='hidden text-3xl font-bold tracking-tight text-white sm:inline bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent'>AI Learn NG</span>
          </Link>

          {/* Menu center */}
          <div className='absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex'>
            <Link href='#home' className='text-xl font-bold text-white transition hover:text-cyan-300'>
              Home
            </Link>
            <Link href='#contact' className='text-xl font-bold text-white transition hover:text-cyan-300'>
              Contact
            </Link>
            <Link href='#about' className='text-xl font-bold text-white transition hover:text-cyan-300'>
              About
            </Link>
          </div>

          {/* CTA right */}
          <div className='hidden md:block'>
            <Link
              href='/enquire'
              className='inline-flex rounded-full bg-cyan-500 hover:bg-cyan-600 px-8 py-3 text-lg font-bold text-white shadow-lg transition'
            >
              Enquire Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className='text-white md:hidden'
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label='Toggle navigation menu'
          >
            <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            className='rounded-b-3xl border-t border-white/20 px-4 pb-4 pt-2 md:hidden bg-slate-950/80 backdrop-blur-lg'
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <Link href='#home' className='block py-3 text-lg font-medium text-white hover:text-cyan-300'>
              Home
            </Link>
            <Link href='#about' className='block py-3 text-lg font-medium text-white hover:text-cyan-300'>
              About
            </Link>
            <Link href='#contact' className='block py-3 text-lg font-medium text-white hover:text-cyan-300'>
              Contact
            </Link>
            <Link
              href='/enquire'
              className='mt-4 inline-flex rounded-full bg-cyan-500 hover:bg-cyan-600 px-8 py-3 text-lg font-bold text-white shadow-lg transition'
            >
              Enquire Now
            </Link>
          </motion.div>
        )}
      </div>
    </nav>
  )
}