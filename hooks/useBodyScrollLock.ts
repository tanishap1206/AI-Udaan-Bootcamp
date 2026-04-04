import { useEffect } from 'react'

/**
 * Custom hook to manage body scroll lock
 * Prevents body scroll when modal is open
 */
export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      // Save current scroll position
      const scrollY = window.scrollY
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = 'var(--scrollbar-width, 0px)'
      
      return () => {
        document.body.style.overflow = 'unset'
        document.body.style.paddingRight = '0px'
        // Restore scroll position
        window.scrollTo(0, scrollY)
      }
    }
    return undefined
  }, [isLocked])
}
