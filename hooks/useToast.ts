'use client'

import { useToastContext } from '@/components/providers/ToastContext'

export function useToast() {
  return useToastContext()
}
