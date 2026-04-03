'use client'

import { useToast } from '@/hooks/useToast'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toasts } = useToast()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <>
      {children}
      <AnimatePresence>
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
          {toasts.map((toast) => (
            <Toast key={toast.id} toast={toast} />
          ))}
        </div>
      </AnimatePresence>
    </>
  )
}

function Toast({ toast }: { toast: any }) {
  const getStyles = () => {
    switch (toast.type) {
      case 'success':
        return {
          bg: 'bg-gradient-to-r from-green-500/20 to-emerald-500/20',
          border: 'border-green-500/30',
          text: 'text-green-300',
          icon: '✅',
        }
      case 'error':
        return {
          bg: 'bg-gradient-to-r from-red-500/20 to-pink-500/20',
          border: 'border-red-500/30',
          text: 'text-red-300',
          icon: '❌',
        }
      case 'warning':
        return {
          bg: 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20',
          border: 'border-yellow-500/30',
          text: 'text-yellow-300',
          icon: '⚠️',
        }
      default:
        return {
          bg: 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20',
          border: 'border-cyan-500/30',
          text: 'text-cyan-300',
          icon: 'ℹ️',
        }
    }
  }

  const styles = getStyles()

  return (
    <motion.div
      initial={{ opacity: 0, x: 400, y: 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 400, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      className={`${styles.bg} ${styles.border} backdrop-blur-xl border rounded-lg p-4 shadow-xl pointer-events-auto flex items-center gap-3`}
    >
      <span className="text-2xl flex-shrink-0">{styles.icon}</span>
      <p className={`${styles.text} font-medium`}>{toast.message}</p>
    </motion.div>
  )
}
