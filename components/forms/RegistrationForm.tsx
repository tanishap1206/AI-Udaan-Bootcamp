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
  aiDomain: string
  otherAiDomain: string
  source: string
  interest: string
}

interface FormErrors {
  [key: string]: string
}

interface RegistrationFormProps {
  onSuccess?: () => void
  isModal?: boolean
}

export function RegistrationForm({ onSuccess, isModal = false }: RegistrationFormProps = {}) {
  const { addToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    email: '',
    address: '',
    class: '',
    aiDomain: '',
    otherAiDomain: '',
    source: '',
    interest: '',
  })
  const [otpSent, setOtpSent] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)
  const [otp, setOtp] = useState('')
  const [otpLoading, setOtpLoading] = useState(false)
  const [otpError, setOtpError] = useState('')

  // Larger fonts for modal display
  const labelClass = isModal ? 'block mb-2 text-base text-gray-300 font-medium' : 'block mb-2 text-sm text-gray-400 font-medium'
  const controlClass = isModal
    ? 'w-full h-14 px-4 bg-white/10 border border-white/20 rounded-xl backdrop-blur-sm transition-all duration-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base'
    : 'w-full h-12 px-4 bg-white/10 border border-white/20 rounded-xl backdrop-blur-sm transition-all duration-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base'
  const controlErrorClass = 'border-red-500'

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateMobile = (mobile: string): boolean => {
    return /^\d{10}$/.test(mobile.replace(/\D/g, ''))
  }

  const sendOTP = async () => {
    setOtpError('')
    
    if (!formData.email.trim()) {
      setOtpError('Email is required')
      return
    }

    if (!validateEmail(formData.email)) {
      setOtpError('Invalid email format')
      return
    }

    setOtpLoading(true)
    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setOtpError(data.message || 'Failed to send OTP')
        addToast(data.message || 'Failed to send OTP', 'error', 3000)
        return
      }

      setOtpSent(true)
      addToast('OTP sent to your email! Check your inbox.', 'success', 3000)
    } catch (error) {
      console.error('Send OTP error:', error)
      setOtpError('Failed to send OTP. Please try again.')
      addToast('Failed to send OTP', 'error', 3000)
    } finally {
      setOtpLoading(false)
    }
  }

  const verifyOTP = async () => {
    setOtpError('')

    if (!otp.trim()) {
      setOtpError('Please enter OTP')
      return
    }

    setOtpLoading(true)
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp }),
      })

      const data = await response.json()

      if (!response.ok) {
        setOtpError(data.message || 'Invalid OTP')
        addToast(data.message || 'Invalid OTP', 'error', 3000)
        return
      }

      setEmailVerified(true)
      setOtp('')
      addToast('Email verified successfully!', 'success', 3000)
    } catch (error) {
      console.error('Verify OTP error:', error)
      setOtpError('Failed to verify OTP. Please try again.')
      addToast('Failed to verify OTP', 'error', 3000)
    } finally {
      setOtpLoading(false)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!emailVerified) {
      newErrors.email = 'Please verify your email with OTP'
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile Number is required'
    } else if (!validateMobile(formData.mobile)) {
      newErrors.mobile = 'Mobile must be 10 digits'
    }

    if (!formData.class) {
      newErrors.class = 'Please select your class'
    }

    if (!formData.aiDomain) {
      newErrors.aiDomain = 'Please select a domain to explore using AI'
    }

    if (formData.aiDomain === 'Other (Please Specify)' && !formData.otherAiDomain.trim()) {
      newErrors.otherAiDomain = 'Please specify your domain'
    }

    if (!formData.source) {
      newErrors.source = 'Please select how you heard about us'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === 'email') {
      setEmailVerified(false)
      setOtpSent(false)
      setOtp('')
      setOtpError('')
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (name === 'aiDomain' && value !== 'Other (Please Specify)') {
      setFormData((prev) => ({
        ...prev,
        otherAiDomain: '',
      }))
      if (errors.otherAiDomain) {
        setErrors((prev) => ({
          ...prev,
          otherAiDomain: '',
        }))
      }
    }

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

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess()
      }

      // Reset form
      setFormData({
        name: '',
        mobile: '',
        email: '',
        address: '',
        class: '',
        aiDomain: '',
        otherAiDomain: '',
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
    <div className={isModal ? "p-6" : "min-h-screen flex items-center justify-center py-4 px-4"}>
      {/* Animated gradient background - only show when not in modal */}
      {!isModal && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className={isModal ? "w-full relative" : "w-full max-w-5xl relative z-10"}
      >
        {/* Glass Card */}
        <div className={isModal ? "p-6" : "bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-[0_0_40px_rgba(34,211,238,0.18)]"}>
          {/* Header */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mb-5 text-center"
          >
            <h1 className={isModal ? "text-4xl font-bold mb-1" : "text-3xl font-bold mb-1"}>
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Register Now
              </span>
            </h1>
            <p className={isModal ? "text-gray-300 text-lg" : "text-gray-300 text-base"}>Join AI Udaan Bootcamp 2026</p>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-auto mt-2" />
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4">
            {/* Full Name */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
            >
              <label className={labelClass}>
                Full Name
                <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`${controlClass} ${
                  errors.name ? controlErrorClass : ''
                }`}
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </motion.div>

            {/* Email */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.15 }}
            >
              <label className={labelClass}>
                Email ID
                <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={emailVerified}
                  placeholder="Enter your email"
                  className={`flex-1 ${controlClass} disabled:opacity-50 ${
                    errors.email ? controlErrorClass : ''
                  }`}
                />
                {!emailVerified && (
                  <button
                    type="button"
                    onClick={sendOTP}
                    disabled={otpLoading || !formData.email.trim()}
                    className={isModal ? "h-14 px-4 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-500 text-white font-medium rounded-xl transition-all duration-300 whitespace-nowrap text-base" : "h-12 px-4 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-500 text-white font-medium rounded-xl transition-all duration-300 whitespace-nowrap"}
                  >
                    {otpLoading ? 'Sending...' : 'Send OTP'}
                  </button>
                )}
                {emailVerified && (
                  <div className={isModal ? "h-14 px-4 bg-green-500/20 border border-green-500 text-green-400 font-medium rounded-xl whitespace-nowrap flex items-center gap-2 text-base" : "h-12 px-4 bg-green-500/20 border border-green-500 text-green-400 font-medium rounded-xl whitespace-nowrap flex items-center gap-2"}>
                    ✓ Verified
                  </div>
                )}
              </div>
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              {otpError && <p className="text-red-400 text-sm mt-1">{otpError}</p>}
            </motion.div>

            {/* OTP Verification */}
            {otpSent && !emailVerified && (
              <motion.div
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.16 }}
              >
                <label className={labelClass}>
                  OTP Code
                  <span className="text-red-400">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    className={`flex-1 ${controlClass}`}
                  />
                  <button
                    type="button"
                    onClick={verifyOTP}
                    disabled={otpLoading || !otp.trim()}
                    className={isModal ? "h-14 px-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-500 text-white font-medium rounded-xl transition-all duration-300 whitespace-nowrap text-base" : "h-12 px-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-500 text-white font-medium rounded-xl transition-all duration-300 whitespace-nowrap"}
                  >
                    {otpLoading ? 'Verifying...' : 'Verify'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Mobile Number */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <label className={labelClass}>
                Mobile Number
                <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter 10 digit mobile number"
                className={`${controlClass} ${
                  errors.mobile ? controlErrorClass : ''
                }`}
              />
              {errors.mobile && <p className="text-red-400 text-sm mt-1">{errors.mobile}</p>}
            </motion.div>

            {/* Address */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.25 }}
            >
              <label className={labelClass}>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className={controlClass}
              />
            </motion.div>

            {/* Class Dropdown */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              <label className={labelClass}>
                Class
                <span className="text-red-400">*</span>
              </label>
              <select
                name="class"
                value={formData.class}
                onChange={handleChange}
                className={`${controlClass} appearance-none cursor-pointer ${
                  errors.class ? controlErrorClass : ''
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
                <option value="Graduate" className="text-slate-900">
                  Graduate
                </option>
                <option value="Post Graduate" className="text-slate-900">
                  Post Graduate
                </option>
                <option value="Others" className="text-slate-900">
                  Others
                </option>
              </select>
              {errors.class && <p className="text-red-400 text-sm mt-1">{errors.class}</p>}
            </motion.div>

            {/* Domain Exploration Dropdown */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.34 }}
            >
              <label className={labelClass}>
                Select Domain You Want to Explore Using AI
                <span className="text-red-400">*</span>
              </label>
              <select
                name="aiDomain"
                value={formData.aiDomain}
                onChange={handleChange}
                className={`${controlClass} appearance-none cursor-pointer ${
                  errors.aiDomain ? controlErrorClass : ''
                }`}
              >
                <option value="" className="text-slate-900">
                  Select domain
                </option>
                <option value="AI Filmmaking & Creative Design" className="text-slate-900">
                  AI Filmmaking & Creative Design
                </option>
                <option value="SaaS Web Application Development" className="text-slate-900">
                  SaaS Web Application Development
                </option>
                <option value="AI-Powered Digital Marketing" className="text-slate-900">
                  AI-Powered Digital Marketing
                </option>
                <option value="Other (Please Specify)" className="text-slate-900">
                  Other (Please Specify)
                </option>
              </select>
              {errors.aiDomain && <p className="text-red-400 text-sm mt-1">{errors.aiDomain}</p>}
            </motion.div>

            {/* Other Domain Input (Conditional) */}
            {formData.aiDomain === 'Other (Please Specify)' && (
              <motion.div
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.35 }}
                className="overflow-hidden"
              >
                <label className={labelClass}>
                  Please Specify Your Domain
                  <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="otherAiDomain"
                  value={formData.otherAiDomain}
                  onChange={handleChange}
                  placeholder="Enter your domain of interest"
                  className={`${controlClass} ${
                    errors.otherAiDomain ? controlErrorClass : ''
                  }`}
                />
                {errors.otherAiDomain && <p className="text-red-400 text-sm mt-1">{errors.otherAiDomain}</p>}
              </motion.div>
            )}

            {/* How did you hear about us */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.36 }}
            >
              <label className={labelClass}>
                How did you hear about us?
                <span className="text-red-400">*</span>
              </label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className={`${controlClass} appearance-none cursor-pointer ${
                  errors.source ? controlErrorClass : ''
                }`}
              >
                <option value="" className="text-slate-900">
                  Select source
                </option>
                <option value="Facebook" className="text-slate-900">
                  Facebook
                </option>
                <option value="Google" className="text-slate-900">
                  Google
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
              transition={{ delay: 0.37 }}
            >
              <label className={labelClass}>Interest Level (Optional)</label>
              <select
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className={`${controlClass} appearance-none cursor-pointer`}
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
            </div>

            {/* Submit Button */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="pt-1"
            >
              <button
                type="submit"
                disabled={isLoading}
                className={isModal ? "w-full relative overflow-hidden group h-14 px-6 rounded-xl font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg" : "w-full relative overflow-hidden group h-12 px-6 rounded-xl font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg"}
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
              transition={{ delay: 0.42 }}
              className="text-center text-gray-400 text-xs mt-1"
            >
              By registering, you agree to our terms and conditions
            </motion.p>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
