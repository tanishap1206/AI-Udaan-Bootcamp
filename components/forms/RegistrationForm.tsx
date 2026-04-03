'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useToast } from '@/hooks/useToast'
import { fadeUpVariants } from '@/lib/animationVariants'

interface FormData {
  name: string
  mobile: string
  email: string
  address: string
  class: string
  source: string
  interest: string
}

interface FormErrors {
  [key: string]: string
}

export function RegistrationForm() {
  const { addToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    email: '',
    address: '',
    class: '',
    source: '',
    interest: '',
  })

  // Validation functions
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
      newErrors.name = 'Full Name is required'
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile Number is required'
    } else if (!validateMobile(formData.mobile)) {
      newErrors.mobile = 'Mobile must be 10 digits'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.class) {
      newErrors.class = 'Please select your class'
    }

    if (!formData.source) {
      newErrors.source = 'Please select how you heard about us'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
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
      addToast('Please fill all required fields correctly', 'error', 4000)
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        addToast(data.message || 'Registration failed. Please try again.', 'error', 4000)
        return
      }

      // Success
      addToast('Registration सफल 🎉', 'success', 4000)

      // Reset form
      setFormData({
        name: '',
        mobile: '',
        email: '',
        address: '',
        class: '',
        source: '',
        interest: '',
      })

      // Redirect to success page with user details
      setTimeout(() => {
        const params = new URLSearchParams({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
        })
        window.location.href = `/success?${params.toString()}`
      }, 1500)
    } catch (error) {
      console.error('Registration error:', error)
      addToast('Something went wrong. Please try again.', 'error', 4000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4">
      {/* Animated gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-4xl relative z-10"
      >
        {/* Glass Card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl shadow-cyan-500/10">
          {/* Header */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mb-4 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-black mb-2">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Register Now
              </span>
            </h1>
            <p className="text-gray-300 text-lg">Join AI Udaan Bootcamp 2026</p>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-auto mt-2" />
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-1 md:grid-cols-2 md:gap-4">
            {/* Full Name */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
            >
              <label className="block mb-2 text-gray-300 font-medium text-base">
                Full Name
                <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full px-4 py-2 bg-white/5 border rounded-lg backdrop-blur-sm transition-all duration-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base ${
                  errors.name ? 'border-red-500' : 'border-white/20'
                }`}
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </motion.div>

            {/* Mobile Number */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.15 }}
            >
              <label className="block mb-2 text-gray-300 font-medium text-base">
                Mobile Number
                <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter 10 digit mobile number"
                className={`w-full px-4 py-2 bg-white/5 border rounded-lg backdrop-blur-sm transition-all duration-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base ${
                  errors.mobile ? 'border-red-500' : 'border-white/20'
                }`}
              />
              {errors.mobile && <p className="text-red-400 text-sm mt-1">{errors.mobile}</p>}
            </motion.div>

            {/* Email */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <label className="block mb-2 text-gray-300 font-medium text-base">
                Email ID
                <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full px-4 py-2 bg-white/5 border rounded-lg backdrop-blur-sm transition-all duration-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base ${
                  errors.email ? 'border-red-500' : 'border-white/20'
                }`}
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </motion.div>

            {/* Address */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.25 }}
            >
              <label className="block mb-2 text-gray-300 font-medium text-base">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                rows={2}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg backdrop-blur-sm transition-all duration-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-base"
              />
            </motion.div>

            {/* Class Dropdown */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              <label className="block mb-2 text-gray-300 font-medium text-base">
                Class
                <span className="text-red-400">*</span>
              </label>
              <select
                name="class"
                value={formData.class}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-white/5 border rounded-lg backdrop-blur-sm transition-all duration-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer text-base ${
                  errors.class ? 'border-red-500' : 'border-white/20'
                }`}
              >
                <option value="" className="text-slate-900">
                  Select your class
                </option>
                <option value="10th Pass" className="text-slate-900">
                  10th Pass
                </option>
                <option value="12th Pass" className="text-slate-900">
                  12th Pass
                </option>
              </select>
              {errors.class && <p className="text-red-400 text-sm mt-1">{errors.class}</p>}
            </motion.div>

            {/* How did you hear about us */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.35 }}
            >
              <label className="block mb-2 text-gray-300 font-medium text-base">
                How did you hear about us?
                <span className="text-red-400">*</span>
              </label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-white/5 border rounded-lg backdrop-blur-sm transition-all duration-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer text-base ${
                  errors.source ? 'border-red-500' : 'border-white/20'
                }`}
              >
                <option value="" className="text-slate-900">
                  Select source
                </option>
                <option value="Instagram" className="text-slate-900">
                  Instagram
                </option>
                <option value="WhatsApp" className="text-slate-900">
                  WhatsApp
                </option>
                <option value="Friends" className="text-slate-900">
                  Friends
                </option>
                <option value="College" className="text-slate-900">
                  College
                </option>
                <option value="Other" className="text-slate-900">
                  Other
                </option>
              </select>
              {errors.source && <p className="text-red-400 text-sm mt-1">{errors.source}</p>}
            </motion.div>

            {/* Interest Level */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <label className="block mb-2 text-gray-300 font-medium text-base">Interest Level (Optional)</label>
              <select
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg backdrop-blur-sm transition-all duration-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer text-base"
              >
                <option value="" className="text-slate-900">
                  Select your interest level
                </option>
                <option value="Just exploring" className="text-slate-900">
                  Just exploring
                </option>
                <option value="Want to learn AI" className="text-slate-900">
                  Want to learn AI
                </option>
                <option value="Want to earn using AI" className="text-slate-900">
                  Want to earn using AI
                </option>
              </select>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.45 }}
              className="pt-2 col-span-1 md:col-span-2"
            >
              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative overflow-hidden group py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg"
              >
                {/* Button content */}
                <div className="relative flex items-center justify-center gap-2 text-white">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Register Now</span>
                      <span className="text-lg">✨</span>
                    </>
                  )}
                </div>
              </button>
            </motion.div>

            {/* Terms */}
            <motion.p
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
              className="text-center text-gray-400 text-sm mt-3 col-span-1 md:col-span-2"
            >
              By registering, you agree to our terms and conditions
            </motion.p>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
