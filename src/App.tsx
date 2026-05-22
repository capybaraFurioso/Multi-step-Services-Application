import { RouterProvider } from 'react-router-dom'
import { ToastProvider, useToastContext } from '@/app/toast-context'
import { ToastContainer } from '@/components/ui/Toast'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { router } from '@/routes'

function ToastLayer() {
  const { toasts, removeToast } = useToastContext()
  return <ToastContainer toasts={toasts} onDismiss={removeToast} />
}

export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <RouterProvider router={router} />
        <ToastLayer />
      </ToastProvider>
    </ErrorBoundary>
  )
}
