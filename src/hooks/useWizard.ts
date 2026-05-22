import { useState, useCallback, useMemo } from 'react'
import type { WizardStep } from '@/types'
import { WIZARD_STEPS } from '@/utils/constants'

interface UseWizardReturn {
  currentStep: number
  steps: WizardStep[]
  isFirstStep: boolean
  isLastStep: boolean
  goToStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  markStepComplete: (step: number) => void
  markStepError: (step: number) => void
  progress: number
}

export function useWizard(initialStep = 0): UseWizardReturn {
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [steps, setSteps] = useState<WizardStep[]>(
    WIZARD_STEPS.map((s, i) => ({
      ...s,
      status: i === initialStep ? 'active' : 'pending',
    }))
  )

  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === steps.length - 1
  const progress = ((currentStep) / (steps.length - 1)) * 100

  const updateStepStatuses = useCallback(
    (targetStep: number, completedSteps: Set<number>) => {
      setSteps((prev) =>
        prev.map((s, i) => ({
          ...s,
          status:
            i === targetStep
              ? 'active'
              : completedSteps.has(i) || (i < targetStep && prev[i].status === 'complete')
                ? 'complete'
                : i < targetStep
                  ? 'complete'
                  : prev[i].status === 'error'
                    ? 'error'
                    : 'pending',
        }))
      )
    },
    []
  )

  const completedSteps = useMemo(
    () => new Set(steps.filter((s) => s.status === 'complete').map((s) => s.id)),
    [steps]
  )

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 0 && step < steps.length) {
        setCurrentStep(step)
        updateStepStatuses(step, completedSteps)
      }
    },
    [steps.length, updateStepStatuses, completedSteps]
  )

  const nextStep = useCallback(() => {
    if (!isLastStep) {
      const next = currentStep + 1
      const updated = new Set(completedSteps)
      updated.add(currentStep)
      setCurrentStep(next)
      updateStepStatuses(next, updated)
    }
  }, [currentStep, isLastStep, updateStepStatuses, completedSteps])

  const prevStep = useCallback(() => {
    if (!isFirstStep) {
      goToStep(currentStep - 1)
    }
  }, [currentStep, isFirstStep, goToStep])

  const markStepComplete = useCallback((step: number) => {
    setSteps((prev) =>
      prev.map((s, i) => (i === step ? { ...s, status: 'complete' as const } : s))
    )
  }, [])

  const markStepError = useCallback((step: number) => {
    setSteps((prev) =>
      prev.map((s, i) => (i === step ? { ...s, status: 'error' as const } : s))
    )
  }, [])

  return {
    currentStep,
    steps,
    isFirstStep,
    isLastStep,
    goToStep,
    nextStep,
    prevStep,
    markStepComplete,
    markStepError,
    progress,
  }
}
