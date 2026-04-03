'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
    return (
      <div className='w-full'>
        {label && (
          <label className='block mb-2 text-sm font-medium text-slate-200'>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'glass-input',
            error && 'border-red-500 focus:border-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className='mt-1 text-sm text-red-400'>{error}</p>
        )}
        {helperText && !error && (
          <p className='mt-1 text-sm text-slate-400'>{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'