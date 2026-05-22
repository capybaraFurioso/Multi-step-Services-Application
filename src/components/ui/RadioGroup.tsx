import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface RadioOption {
  value: string
  label: string
  description?: string
}

interface RadioGroupProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  options: readonly RadioOption[]
  selectedValue?: string
  hasError?: boolean
  layout?: 'vertical' | 'horizontal'
}

export const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ options, selectedValue, hasError, layout = 'vertical', name, className, ...props }, ref) => {
    return (
      <fieldset
        className={cn(
          'space-y-2',
          layout === 'horizontal' && 'flex flex-wrap gap-3 space-y-0',
          className
        )}
      >
        {options.map((option, index) => (
          <label
            key={option.value}
            className={cn(
              'relative flex cursor-pointer items-start gap-3 rounded-lg border p-3.5 transition-all duration-150',
              selectedValue === option.value
                ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50',
              hasError && 'border-red-200',
              layout === 'horizontal' && 'flex-1 min-w-[140px]'
            )}
          >
            <input
              ref={index === 0 ? ref : undefined}
              type="radio"
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              className="mt-0.5 h-4 w-4 border-slate-300 text-slate-900 focus:ring-slate-500"
              {...props}
            />
            <div className="min-w-0">
              <span className="block text-sm font-medium text-slate-900">
                {option.label}
              </span>
              {option.description && (
                <span className="block text-xs text-slate-500 mt-0.5">
                  {option.description}
                </span>
              )}
            </div>
          </label>
        ))}
      </fieldset>
    )
  }
)

RadioGroup.displayName = 'RadioGroup'
