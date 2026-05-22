import { useEffect, useState } from 'react'
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react'
import { cn } from '@/utils/cn'
import type { ToastMessage } from '@/types'

interface ToastProps {
  toast: ToastMessage
  onDismiss: (id: string) => void
}

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
} as const

const styles = {
  success: 'border-emerald-200 bg-emerald-50',
  error: 'border-red-200 bg-red-50',
  info: 'border-slate-200 bg-slate-50',
} as const

const iconStyles = {
  success: 'text-emerald-600',
  error: 'text-red-600',
  info: 'text-slate-600',
} as const

function ToastItem({ toast, onDismiss }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const Icon = icons[toast.type]

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true))
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setTimeout(() => onDismiss(toast.id), 200)
  }

  return (
    <div
      role="alert"
      className={cn(
        'pointer-events-auto flex items-start gap-3 rounded-lg border p-4 shadow-lg transition-all duration-200',
        styles[toast.type],
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-2 opacity-0'
      )}
    >
      <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', iconStyles[toast.type])} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-900">{toast.title}</p>
        {toast.description && (
          <p className="mt-0.5 text-sm text-slate-600">{toast.description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={handleDismiss}
        className="rounded-md p-1 text-slate-400 hover:text-slate-600 transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

interface ToastContainerProps {
  toasts: ToastMessage[]
  onDismiss: (id: string) => void
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-2 sm:max-w-sm w-full px-4 sm:px-0"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  )
}
