'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  icon?: React.ReactNode
  title?: string
  description?: string
}

export const GlassCard = ({
  children,
  className,
  hover = true,
  icon,
  title,
  description,
}: GlassCardProps) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5 } : {}}
      transition={{ duration: 0.3 }}
      className={cn(
        'group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 lg:p-8',
        hover && 'cursor-pointer',
        className
      )}
    >
      {icon && (
        <div className='mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-2xl'>
          {icon}
        </div>
      )}
      {title && (
        <h3 className='mb-2 text-xl font-semibold text-slate-900'>{title}</h3>
      )}
      {description && (
        <p className='mb-4 text-slate-500'>{description}</p>
      )}
      {children}
    </motion.div>
  )
}