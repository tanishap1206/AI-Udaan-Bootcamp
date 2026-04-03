'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks'

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export const Sidebar = ({ isOpen = true, onClose }: SidebarProps) => {
  const { user } = useAuth()
  const [expandedMenu, setExpandedMenu] = useState<string | null>('dashboard')

  const menuItems = [
    { label: 'Dashboard', href: '/dashboard', icon: '📊', id: 'dashboard' },
    { label: 'Courses', href: '/courses', icon: '📚', id: 'courses' },
    { label: 'My Learning', href: '/dashboard/learning', icon: '🎓', id: 'learning' },
    { label: 'Messages', href: '/dashboard/messages', icon: '💬', id: 'messages' },
    { label: 'Certificates', href: '/dashboard/certificates', icon: '🏆', id: 'certificates' },
    { label: 'Settings', href: '/dashboard/settings', icon: '⚙️', id: 'settings' },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-40 md:hidden'
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <motion.aside
        className='fixed left-0 top-0 h-screen w-64 bg-glass-light backdrop-blur-lg border-r border-white/20 overflow-y-auto z-50 md:z-40 md:relative md:top-auto'
        initial={{ x: -256 }}
        animate={{ x: isOpen ? 0 : -256 }}
        transition={{ duration: 0.3 }}
      >
        {/* User Section */}
        <div className='p-6 border-b border-white/10'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-violet rounded-full flex items-center justify-center text-xl'>
              👤
            </div>
            <div className='flex-1'>
              <p className='font-semibold text-white text-sm'>{user?.name}</p>
              <p className='text-white/50 text-xs'>{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className='p-4'>
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => {
                setExpandedMenu(item.id)
                onClose?.()
              }}
            >
              <motion.button
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  expandedMenu === item.id
                    ? 'bg-primary-500/20 border border-primary-400/50 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
                whileHover={{ x: 5 }}
              >
                <span className='text-xl'>{item.icon}</span>
                <span className='font-medium'>{item.label}</span>
              </motion.button>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className='absolute bottom-0 w-full p-4 border-t border-white/10'>
          <p className='text-white/50 text-xs text-center'>AI Learn NG © 2024</p>
        </div>
      </motion.aside>
    </>
  )
}