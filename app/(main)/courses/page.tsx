'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CourseCard } from '@/components/shared/course-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Course } from '@/types'

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [level, setLevel] = useState('')
  const [loading, setLoading] = useState(true)

  // Mock courses data
  const mockCourses: Course[] = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      description: 'Learn HTML, CSS, JavaScript, React, and Node.js from scratch',
      price: 99,
      image: undefined,
      instructor: 'John Smith',
      duration: '12 weeks',
      level: 'Beginner',
      rating: 4.9,
      category: 'Technology',
      students: 5234,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      title: 'Advanced React Patterns',
      description: 'Master advanced React concepts and best practices',
      price: 79,
      image: undefined,
      instructor: 'Sarah Developer',
      duration: '8 weeks',
      level: 'Advanced',
      rating: 4.8,
      category: 'Technology',
      students: 3421,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      title: 'Data Science for Beginners',
      description: 'Introduction to Python, NumPy, Pandas, and machine learning',
      price: 89,
      image: undefined,
      instructor: 'Dr. AI Expert',
      duration: '10 weeks',
      level: 'Beginner',
      rating: 4.7,
      category: 'Data Science',
      students: 4123,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      title: 'UI/UX Design Fundamentals',
      description: 'Learn design principles, wireframing, and prototyping',
      price: 69,
      image: undefined,
      instructor: 'Emma Designer',
      duration: '6 weeks',
      level: 'Beginner',
      rating: 4.6,
      category: 'Design',
      students: 2890,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '5',
      title: 'Cloud Deployment with AWS',
      description: 'Deploy and scale applications on Amazon Web Services',
      price: 99,
      image: undefined,
      instructor: 'Mike Cloud',
      duration: '9 weeks',
      level: 'Intermediate',
      rating: 4.8,
      category: 'Technology',
      students: 3567,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '6',
      title: 'Mobile App Development',
      description: 'Build iOS and Android apps with React Native',
      price: 109,
      image: undefined,
      instructor: 'Alex Mobile',
      duration: '14 weeks',
      level: 'Intermediate',
      rating: 4.7,
      category: 'Technology',
      students: 2456,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  useEffect(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      let filtered = mockCourses

      if (search) {
        filtered = filtered.filter(
          (c) =>
            c.title.toLowerCase().includes(search.toLowerCase()) ||
            c.description.toLowerCase().includes(search.toLowerCase())
        )
      }
      if (category) {
        filtered = filtered.filter((c) => c.category === category)
      }
      if (level) {
        filtered = filtered.filter((c) => c.level === level)
      }

      setCourses(filtered)
      setLoading(false)
    }, 300)
  }, [search, category, level])

  const categories = ['Technology', 'Data Science', 'Design', 'Business']
  const levels = ['Beginner', 'Intermediate', 'Advanced']

  return (
    <div className='relative min-h-screen overflow-hidden px-4 py-16 sm:px-6 lg:px-8'>
      <div className='glow-blob blob-cyan -right-24 top-16 h-[340px] w-[340px]' />
      <div className='glow-blob blob-purple -left-20 bottom-6 h-[300px] w-[300px]' />

      <div className='relative z-10 mx-auto max-w-7xl'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='mb-12 text-center'
        >
          <h1 className='heading-1 mb-4'>Explore <span className='gradient-text'>AI Learn Universe</span></h1>
          <p className='text-lg text-slate-300'>
            Choose from premium learning tracks built for builders, analysts, and creators.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className='glass-container mb-12 p-6'
        >
          <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
            <Input
              placeholder='Search courses...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='glass-input'
            >
              <option value=''>All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className='glass-input'
            >
              <option value=''>All Levels</option>
              {levels.map((lv) => (
                <option key={lv} value={lv}>
                  {lv}
                </option>
              ))}
            </select>
            <Button
              onClick={() => {
                setSearch('')
                setCategory('')
                setLevel('')
              }}
              variant='secondary'
            >
              Reset
            </Button>
          </div>
        </motion.div>

        {/* Courses Grid */}
        {loading ? (
          <div className='py-12 text-center'>
            <p className='text-slate-300'>Loading futuristic learning tracks...</p>
          </div>
        ) : courses.length > 0 ? (
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <CourseCard {...course} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className='py-12 text-center'>
            <p className='text-slate-300'>No courses found. Try a different search vector.</p>
          </div>
        )}
      </div>
    </div>
  )
}