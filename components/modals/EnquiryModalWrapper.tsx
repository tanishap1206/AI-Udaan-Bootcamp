'use client'

import { useModal } from '@/components/providers/ModalContext'
import { EnquiryModal } from '@/components/modals/EnquiryModal'

export function EnquiryModalWrapper() {
  const { isModalOpen, closeModal } = useModal()
  return <EnquiryModal isOpen={isModalOpen} onClose={closeModal} />
}
