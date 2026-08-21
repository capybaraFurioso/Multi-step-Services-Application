import type { ReactNode } from 'react'
import { ToastContext } from '@/app/toast-context'
import { useToast } from '@/hooks/useToast'

export function ToastProvider({ children }: { children: ReactNode }) {
  const toast = useToast()

  return (
    <ToastContext.Provider value={toast}>{children}</ToastContext.Provider>
  )
}
