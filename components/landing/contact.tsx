'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUpVariants } from '@/lib/animationVariants'
import { useToast } from '@/hooks/useToast'

interface EnquiryData {
  name: string
  email: string
  mobile: string
  message: string
}

interface FormErrors {
  [key: string]: string
}

export function Contact() {
  const { addToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [formData, setFormData] = useState<EnquiryData>({
    name: '',
    email: '',
    mobile: '',
    message: '',
  })

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateMobile = (mobile: string): boolean => {
    return /^\d{10}$/.test(mobile.replace(/\D/g, ''))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email'
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile is required'
    } else if (!validateMobile(formData.mobile)) {
      newErrors.mobile = 'Enter 10-digit mobile'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      addToast('Please fill all fields correctly', 'error', 3000)
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          message: formData.message,
          bootcamp: 'General Enquiry',
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        addToast(data.message || 'Failed to send enquiry', 'error', 3000)
        return
      }

      addToast('Enquiry sent successfully! ✅', 'success', 3000)
      setFormData({
        name: '',
        email: '',
        mobile: '',
        message: '',
      })
    } catch (error) {
      console.error('Enquiry error:', error)
      addToast('Something went wrong', 'error', 3000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id='contact' className='relative py-24 px-6 overflow-hidden'>
      <div className='mx-auto max-w-2xl'>
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className='text-center mb-12'
        >
          <h2 className='text-5xl md:text-6xl font-black text-white mb-8 leading-tight'>
            Get in
            <span className='block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent'>
              Touch
            </span>
          </h2>
          <p className='text-lg text-white/70'>Have questions? We're here to help!</p>
        </motion.div>

        {/* Contact cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className='grid gap-6 md:grid-cols-2 mb-12'
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className='relative group'
          >
            <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity' />
            <div className='relative backdrop-blur-xl bg-white/5 border border-cyan-400/30 rounded-2xl p-6 shadow-2xl'>
              <h3 className='text-3xl font-bold text-white mb-3'>📧 Email</h3>
              <a href='mailto:admissions@buddhainstitute.edu' className='text-cyan-300 hover:text-cyan-200 transition text-lg'>
                admissions@buddhainstitute.edu
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className='relative group'
          >
            <div className='absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity' />
            <div className='relative backdrop-blur-xl bg-white/5 border border-purple-400/30 rounded-2xl p-6 shadow-2xl'>
              <h3 className='text-3xl font-bold text-white mb-3'>📞 Phone</h3>
              <a href='tel:+919876543210' className='text-purple-300 hover:text-purple-200 transition text-lg'>
                +91 98765 43210
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className='relative group'
        >
          <div className='absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-3xl opacity-50' />
          <div className='relative backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-8 shadow-2xl'>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Your Name'
                  className='w-full rounded-lg backdrop-blur-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:border-cyan-400/50 focus:outline-none transition'
                />
                {errors.name && <p className='text-red-400 text-sm mt-1'>{errors.name}</p>}
              </div>

              <div>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Your Email'
                  className='w-full rounded-lg backdrop-blur-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:border-cyan-400/50 focus:outline-none transition'
                />
                {errors.email && <p className='text-red-400 text-sm mt-1'>{errors.email}</p>}
              </div>

              <div>
                <input
                  type='tel'
                  name='mobile'
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder='Mobile Number (10 digits)'
                  maxLength={10}
                  className='w-full rounded-lg backdrop-blur-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:border-cyan-400/50 focus:outline-none transition'
                />
                {errors.mobile && <p className='text-red-400 text-sm mt-1'>{errors.mobile}</p>}
              </div>

              <div>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  placeholder='Your Message'
                  rows={4}
                  className='w-full rounded-lg backdrop-blur-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:border-cyan-400/50 focus:outline-none transition resize-none'
                />
                {errors.message && <p className='text-red-400 text-sm mt-1'>{errors.message}</p>}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type='submit'
                disabled={isLoading}
                className='w-full rounded-lg bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 px-6 py-3 text-white font-bold transition shadow-lg'
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
