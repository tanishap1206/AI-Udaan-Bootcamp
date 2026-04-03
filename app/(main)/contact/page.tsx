'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GlassCard } from '@/components/shared/glass-card'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name || !email || !message) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (response.ok) {
        setSubmitted(true)
        setName('')
        setEmail('')
        setMessage('')
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        setError('Failed to send message')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12'
        >
          <h1 className='heading-1 mb-4'>Get In Touch</h1>
          <p className='text-white/70 text-lg'>
            Have a question? We'd love to hear from you. Send us a message!
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className='h-full' icon='📧' title='Email'>
              <p className='text-white/80 mb-2'>info@ailearn.ng</p>
              <p className='text-white/60 text-sm'>We'll respond within 24 hours</p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <GlassCard className='h-full' icon='📱' title='Phone'>
              <p className='text-white/80 mb-2'>+234 123 456 7890</p>
              <p className='text-white/60 text-sm'>Mon-Fri, 9am - 6pm</p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard className='h-full' icon='📍' title='Location'>
              <p className='text-white/80 mb-2'>Lagos, Nigeria</p>
              <p className='text-white/60 text-sm'>Africa Tech Hub</p>
            </GlassCard>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className='glass-container p-8 md:p-12'
        >
          {submitted && (
            <div className='mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400'>
              ✓ Thank you for your message! We'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <Input
                label='Your Name'
                type='text'
                placeholder='John Doe'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label='Your Email'
                type='email'
                placeholder='you@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className='block mb-2 text-sm font-medium text-white'>
                Message
              </label>
              <textarea
                placeholder='Your message here...'
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className='glass-input resize-none'
              ></textarea>
            </div>

            {error && (
              <div className='p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm'>
                {error}
              </div>
            )}

            <Button type='submit' isLoading={loading} className='w-full'>
              Send Message
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}