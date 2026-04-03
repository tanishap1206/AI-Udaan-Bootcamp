'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const { register, loading } = useAuth()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    try {
      await register(name, email, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center px-4 py-20'>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className='glass-container p-8 w-full max-w-md'
      >
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='heading-2 mb-2'>Join AI Learn NG</h1>
          <p className='text-white/60'>Create your account and start learning today</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <Input
            label='Full Name'
            type='text'
            placeholder='John Doe'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label='Email'
            type='email'
            placeholder='you@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label='Password'
            type='password'
            placeholder='••••••••'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText='At least 6 characters'
          />
          <Input
            label='Confirm Password'
            type='password'
            placeholder='••••••••'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && (
            <div className='p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm'>
              {error}
            </div>
          )}

          <Button
            type='submit'
            isLoading={loading}
            className='w-full'
          >
            Create Account
          </Button>
        </form>

        {/* Terms */}
        <p className='text-white/50 text-xs text-center mt-4'>
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>

        {/* Divider */}
        <div className='my-6 flex items-center gap-4'>
          <div className='flex-1 h-px bg-white/10'></div>
          <span className='text-white/50 text-sm'>or</span>
          <div className='flex-1 h-px bg-white/10'></div>
        </div>

        {/* Social Signup */}
        <div className='space-y-3'>
          <button type='button' className='w-full glass-button-secondary'>
            Continue with Google
          </button>
          <button type='button' className='w-full glass-button-secondary'>
            Continue with GitHub
          </button>
        </div>

        {/* Sign In Link */}
        <div className='mt-6 text-center'>
          <p className='text-white/60'>
            Already have an account?{' '}
            <Link href='/sign-in' className='text-primary-400 hover:text-primary-300'>
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}