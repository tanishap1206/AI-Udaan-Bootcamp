'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks'
import { Sidebar } from '@/components/shared/sidebar'
import { GlassCard } from '@/components/shared/glass-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  if (!isAuthenticated) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-3xl md:text-4xl font-semibold mb-4 text-slate-900'>Please sign in to access dashboard</h1>
          <Link href='/sign-in'>
            <Button>
              Go to Sign In
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const stats = [
    { label: 'Courses Enrolled', value: '5', icon: '📚' },
    { label: 'In Progress', value: '3', icon: '🎯' },
    { label: 'Completed', value: '2', icon: '✅' },
    { label: 'Certificates', value: '2', icon: '🏆' },
  ]

  const recentCourses = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      progress: 65,
      lastAccessed: '2 hours ago',
      instructor: 'John Smith',
    },
    {
      id: '2',
      title: 'Advanced React Patterns',
      progress: 42,
      lastAccessed: '1 day ago',
      instructor: 'Sarah Developer',
    },
    {
      id: '3',
      title: 'Data Science for Beginners',
      progress: 28,
      lastAccessed: '3 days ago',
      instructor: 'Dr. AI Expert',
    },
  ]

  const continueLearning = [
    { id: '1', title: 'UI/UX Design Fundamentals', progress: 15 },
    { id: '2', title: 'Cloud Deployment with AWS', progress: 8 },
    { id: '3', title: 'Mobile App Development', progress: 0 },
  ]

  return (
    <div className='relative flex min-h-screen overflow-hidden pt-20'>
      <div className='glow-blob blob-purple -left-16 top-20 h-[320px] w-[320px]' />
      <div className='glow-blob blob-cyan -right-20 bottom-10 h-[340px] w-[340px]' />

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className='flex-1 overflow-auto'>
        <div className='p-4 sm:p-6 lg:p-8 xl:p-10'>
          {/* Mobile toggle */}
          <button
            className='mb-4 rounded-lg border border-white/15 bg-slate-900/70 p-2 text-slate-100 md:hidden'
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰ Menu
          </button>

          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='glass-container mb-10 p-6 md:p-8'
          >
            <p className='mb-2 text-sm uppercase tracking-[0.2em] text-cyan-300/80'>Dashboard</p>
            <h1 className='text-5xl md:text-6xl font-bold mb-2 text-slate-100'>
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className='text-base md:text-lg text-slate-300 leading-relaxed'>Continue your AI-powered learning journey and keep your streak alive.</p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard icon={stat.icon} className='border-white/15'>
                  <p className='mb-2 text-3xl md:text-4xl font-bold text-cyan-300'>{stat.value}</p>
                  <p className='text-base md:text-lg text-slate-300'>{stat.label}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Recent Courses & Continue Learning */}
          <div className='mb-12 grid grid-cols-1 gap-8 lg:grid-cols-3'>
            {/* Recent Courses */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='lg:col-span-2'
            >
              <div className='glass-container p-6 mb-6'>
                <h2 className='text-2xl md:text-3xl font-semibold mb-6 text-slate-100'>Recent Courses</h2>
                <div className='space-y-4'>
                  {recentCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                      className='glass-card border-white/15 p-4'
                    >
                      <div className='flex justify-between items-start mb-2'>
                        <div className='flex-1'>
                          <h3 className='text-lg md:text-xl font-semibold text-slate-100'>{course.title}</h3>
                          <p className='text-sm text-gray-400'>{course.instructor}</p>
                        </div>
                        <span className='font-bold text-cyan-300 text-base md:text-lg'>{course.progress}%</span>
                      </div>
                      <div className='mb-2 h-2 w-full overflow-hidden rounded-full bg-white/10'>
                        <div
                          className='h-full rounded-full bg-gradient-to-r from-accent-violet to-primary-400 transition-all duration-500'
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <p className='text-sm text-gray-400'>
                        Last accessed: {course.lastAccessed}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Continue Learning Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className='glass-container p-6'>
                <h2 className='text-2xl md:text-3xl font-semibold mb-6 text-slate-100'>Continue Learning</h2>
                <div className='space-y-3'>
                  {continueLearning.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                      className='glass-card cursor-pointer border-white/15 p-3'
                    >
                      <h4 className='mb-2 text-base md:text-lg font-medium text-slate-100'>{item.title}</h4>
                      <div className='h-1 w-full overflow-hidden rounded-full bg-white/10'>
                        <div
                          className='h-full rounded-full bg-primary-400'
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                      <p className='mt-1 text-sm text-gray-400'>{item.progress}% complete</p>
                    </motion.div>
                  ))}
                </div>
                <Link href='/courses'>
                  <Button variant='secondary' className='w-full mt-6'>
                    Browse More Courses
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Achievement Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='glass-container p-6'
          >
            <h2 className='text-2xl md:text-3xl font-semibold mb-4 text-slate-100'>🏆 Achievements</h2>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              {['🥇 First Course', '⭐ 100% Score', '🔥 7-Day Streak', '🎓 Certified'].map(
                (achievement, index) => (
                  <div key={index} className='glass-card border-white/15 p-4 text-center'>
                    <p className='text-2xl md:text-3xl mb-2'>{achievement.split(' ')[0]}</p>
                    <p className='text-base md:text-lg text-slate-300'>{achievement.split(' ').slice(1).join(' ')}</p>
                  </div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}