import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ hasError, className, id, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        id={id}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? `${id}-error` : undefined}
        className={cn(
          'block w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 shadow-sm transition-colors duration-150',
          'placeholder:text-slate-400 resize-none',
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

Textarea.displayName = 'Textarea'
