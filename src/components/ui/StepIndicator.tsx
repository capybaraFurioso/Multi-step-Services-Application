import { Check, AlertCircle } from 'lucide-react'
import { cn } from '@/utils/cn'
import type { WizardStep } from '@/types'

interface StepIndicatorProps {
  steps: WizardStep[]
  currentStep: number
  onStepClick?: (step: number) => void
}

export function StepIndicator({
  steps,
  currentStep,
  onStepClick,
}: StepIndicatorProps) {
  return (
    <nav aria-label="Application progress" className="w-full">
      {/* Desktop */}
      <ol className="hidden md:flex items-center justify-between" role="list">
        {steps.map((step, index) => {
          const isClickable =
            onStepClick && (step.status === 'complete' || index <= currentStep)

          return (
            <li key={step.id} className="flex flex-1 items-center">
              <button
                type="button"
                onClick={() => isClickable && onStepClick(index)}
                disabled={!isClickable}
                className={cn(
                  'group flex items-center gap-3 disabled:cursor-default',
                  isClickable && 'cursor-pointer'
                )}
                aria-current={step.status === 'active' ? 'step' : undefined}
              >
                <span
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-200',
                    step.status === 'active' &&
                      'border-slate-900 bg-slate-900 text-white',
                    step.status === 'complete' &&
                      'border-emerald-500 bg-emerald-500 text-white',
                    step.status === 'error' &&
                      'border-red-500 bg-red-500 text-white',
                    step.status === 'pending' &&
                      'border-slate-300 bg-white text-slate-400'
                  )}
                >
                  {step.status === 'complete' ? (
                    <Check className="h-4 w-4" />
                  ) : step.status === 'error' ? (
                    <AlertCircle className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </span>
                <div className="hidden lg:block text-left">
                  <p
                    className={cn(
                      'text-sm font-medium transition-colors',
                      step.status === 'active'
                        ? 'text-slate-900'
                        : step.status === 'complete'
                          ? 'text-emerald-700'
                          : 'text-slate-500'
                    )}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs text-slate-400">{step.description}</p>
                </div>
              </button>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'mx-3 h-px flex-1 transition-colors',
                    step.status === 'complete' ? 'bg-emerald-300' : 'bg-slate-200'
                  )}
                />
              )}
            </li>
          )
        })}
      </ol>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-900">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm text-slate-500">
            {steps[currentStep].label}
          </span>
        </div>
        <div className="flex gap-1.5">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                'h-1.5 flex-1 rounded-full transition-colors',
                index <= currentStep
                  ? step.status === 'error'
                    ? 'bg-red-400'
                    : step.status === 'complete'
                      ? 'bg-emerald-400'
                      : 'bg-slate-900'
                  : 'bg-slate-200'
              )}
            />
          ))}
        </div>
      </div>
    </nav>
  )
}
