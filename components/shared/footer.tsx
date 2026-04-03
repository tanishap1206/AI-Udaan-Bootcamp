'use client'

import Link from 'next/link'
// import { motion, AnimatePresence } from "framer-motion";

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-glass-light backdrop-blur-lg border-t border-white/20 mt-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
          {/* Brand */}
          <div className='md:col-span-1'>
            <div className='mb-3 flex items-center justify-center bg-white rounded-full w-32 h-32 overflow-hidden border-2 border-white/50 shadow-lg'>
              <img
                src='/images/logo.png'
                alt='Buddha Institute of Technology logo'
                width={128}
                height={128}
                className='w-full h-full object-contain p-2'
              />
            </div>
            <h3 className='text-3xl font-bold text-white mb-2'>Buddha Institute of Technology</h3>
            <p className='text-white/60 text-lg'>AICTE Approved · BEU Affiliated</p>
            <p className='text-white/60 text-lg'>Empowering the next generation of AI leaders</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-white text-xl font-semibold mb-4'>Product</h4>
            <ul className='space-y-2'>
              <li>
                <Link href='/courses' className='text-white/60 hover:text-white transition text-lg'>
                  Courses
                </Link>
              </li>
              <li>
                <Link href='/#features' className='text-white/60 hover:text-white transition'>
                  Features
                </Link>
              </li>
              <li>
                <Link href='/#pricing' className='text-white/60 hover:text-white transition'>
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className='text-white font-semibold mb-4'>Support</h4>
            <ul className='space-y-2'>
              <li>
                <Link href='/contact' className='text-white/60 hover:text-white transition'>
                  Contact
                </Link>
              </li>
              <li>
                <Link href='/privacy-policy' className='text-white/60 hover:text-white transition'>
                  Privacy
                </Link>
              </li>
              <li>
                <Link href='/' className='text-white/60 hover:text-white transition'>
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className='text-white font-semibold mb-4'>Social</h4>
            <div className='flex gap-4'>
              <a href='#' className='text-white/60 hover:text-white transition text-xl'>
                𝕏
              </a>
              <a href='#' className='text-white/60 hover:text-white transition text-xl'>
                f
              </a>
              <a href='#' className='text-white/60 hover:text-white transition text-xl'>
                in
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className='border-t border-white/10 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-white/60 text-sm'>
              © {currentYear} AI Learn NG. All rights reserved.
            </p>
            <div className='flex gap-6 mt-4 md:mt-0'>
              <Link href='/privacy-policy' className='text-white/60 hover:text-white transition text-sm'>
                Privacy Policy
              </Link>
              <Link href='/' className='text-white/60 hover:text-white transition text-sm'>
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ...existing code...