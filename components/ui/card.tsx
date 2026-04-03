'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'elevated' | 'outlined'
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, variant = 'default', ...props }, ref) => {
    const variantClass = {
      default: 'glass-card',
      elevated: 'bg-glass-lighter backdrop-blur-xl border border-white/30 rounded-2xl shadow-glass-lg',
      outlined: 'bg-transparent border-2 border-white/20 rounded-2xl',
    }

    return (
      <div
        ref={ref}
        className={cn(variantClass[variant], className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'