import { createContext, useContext, type ReactNode } from 'react'
import { useToast } from '@/hooks/useToast'
import type { ToastMessage } from '@/types'

interface ToastContextValue {
  toasts: ToastMessage[]
  addToast: (toast: Omit<ToastMessage, 'id'>) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const toast = useToast()

  return (
    <ToastContext.Provider value={toast}>{children}</ToastContext.Provider>
  )
}

export function useToastContext(): ToastContextValue {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider')
  }
  return context
}
