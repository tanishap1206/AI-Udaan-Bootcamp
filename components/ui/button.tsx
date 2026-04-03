'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      disabled,
      isLoading,
      children,
      ...props
    },
    ref
  ) => {
    const baseClass =
      'relative overflow-hidden font-semibold rounded-xl transition-all duration-300 focus:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-50'

    const variantClass = {
      primary:
        'text-white bg-cyan-500 shadow-md hover:bg-cyan-600 hover:scale-[1.02] hover:shadow-lg',
      secondary:
        'border border-cyan-400/50 bg-white/5 text-cyan-300 backdrop-blur-md hover:bg-cyan-500/10 hover:border-cyan-400',
      ghost:
        'text-slate-700 hover:bg-slate-100',
    }

    const sizeClass = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseClass,
          variantClass[variant],
          sizeClass[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className='inline-flex items-center gap-2'>
            <span className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent'></span>
            Loading...
          </span>
        ) : (
          <span className='relative z-10'>{children}</span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'