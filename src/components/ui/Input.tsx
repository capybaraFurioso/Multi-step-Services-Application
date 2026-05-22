import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ hasError, className, id, ...props }, ref) => {
    return (
      <input
        ref={ref}
        id={id}
        aria-invalid={hasError || undefined}
        aria-describedby={
          hasError ? `${id}-error` : props['aria-describedby']
        }
        className={cn(
          'block w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 shadow-sm transition-colors duration-150',
          'placeholder:text-slate-400',
          'focus:outline-none focus:ring-2 focus:ring-offset-0',
          hasError
            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
            : 'border-slate-300 focus:border-slate-500 focus:ring-slate-200',
          'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500',
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
