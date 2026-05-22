import { useState, useCallback } from 'react'
import type { ToastMessage } from '@/types'
import { generateId } from '@/utils/format'

interface UseToastReturn {
  toasts: ToastMessage[]
  addToast: (toast: Omit<ToastMessage, 'id'>) => void
  removeToast: (id: string) => void
}

export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback(
    (toast: Omit<ToastMessage, 'id'>) => {
      const id = generateId()
      setToasts((prev) => [...prev, { ...toast, id }])
      setTimeout(() => removeToast(id), 5000)
    },
    [removeToast]
  )

  return { toasts, addToast, removeToast }
}
