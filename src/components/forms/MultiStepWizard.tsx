import { useState, useCallback } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { ArrowLeft, ArrowRight, Send } from 'lucide-react'
import {
  personalInfoSchema,
  addressSchema,
  serviceDetailsSchema,
  documentUploadSchema,
} from '@/schemas/application'
import { useWizard } from '@/hooks/useWizard'
import { useFormPersist } from '@/hooks/useFormPersist'
import { useToastContext } from '@/app/toast-context'
import { submitApplication } from '@/services/api'
import { Button } from '@/components/ui/Button'
import { StepIndicator } from '@/components/ui/StepIndicator'
import { StepPersonalInfo } from './StepPersonalInfo'
import { StepAddress } from './StepAddress'
import { StepServiceDetails } from './StepServiceDetails'
import { StepDocumentUpload } from './StepDocumentUpload'
import { StepReview } from './StepReview'
import { SuccessScreen } from './SuccessScreen'
import type { ApplicationFormData, SubmissionResult } from '@/types'

const stepSchemas = [
  personalInfoSchema,
  addressSchema,
  serviceDetailsSchema,
  documentUploadSchema,
  null,
] as const

const stepFieldPrefixes = [
  'personalInfo',
  'address',
  'serviceDetails',
  'documentUpload',
  null,
] as const

const DEFAULT_VALUES: ApplicationFormData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    idNumber: '',
  },
  address: {
    streetAddress: '',
    aptSuite: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  },
  serviceDetails: {
    serviceType: '',
    urgency: 'standard',
    description: '',
    preferredContact: 'email',
    agreeToTerms: false as unknown as true,
  },
  documentUpload: {
    documents: [],
  },
}

export function MultiStepWizard() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionResult, setSubmissionResult] =
    useState<SubmissionResult | null>(null)

  const { addToast } = useToastContext()

  const form = useForm<ApplicationFormData>({
    mode: 'onTouched',
    defaultValues: DEFAULT_VALUES,
  })

  const { clearSavedData } = useFormPersist({ form })

  const wizard = useWizard()

  const validateCurrentStep = useCallback(async (): Promise<boolean> => {
    const prefix = stepFieldPrefixes[wizard.currentStep]
    if (!prefix) return true

    const schema = stepSchemas[wizard.currentStep]
    if (!schema) return true

    const values = form.getValues(prefix as keyof ApplicationFormData)
    const result = schema.safeParse(values)

    if (!result.success) {
      for (const issue of result.error.issues) {
        const fieldPath = `${prefix}.${issue.path.map(String).join('.')}` as Parameters<
          typeof form.setError
        >[0]
        form.setError(fieldPath, { message: issue.message })
      }
      return false
    }

    form.clearErrors(prefix as keyof ApplicationFormData)
    return true
  }, [wizard.currentStep, form])

  const handleNext = useCallback(async () => {
    const isValid = await validateCurrentStep()
    if (isValid) {
      wizard.markStepComplete(wizard.currentStep)
      wizard.nextStep()
      addToast({ type: 'info', title: 'Progress saved' })
    } else {
      wizard.markStepError(wizard.currentStep)
    }
  }, [validateCurrentStep, wizard, addToast])

  const handlePrev = useCallback(() => {
    wizard.prevStep()
  }, [wizard])

  const handleGoToStep = useCallback(
    async (step: number) => {
      if (step < wizard.currentStep) {
        wizard.goToStep(step)
        return
      }
      const isValid = await validateCurrentStep()
      if (isValid) {
        wizard.markStepComplete(wizard.currentStep)
        wizard.goToStep(step)
      }
    },
    [wizard, validateCurrentStep]
  )

  const handleSubmit = useCallback(async () => {
    const isValid = await validateCurrentStep()
    if (!isValid) return

    setIsSubmitting(true)
    try {
      const data = form.getValues()
      const response = await submitApplication(data)

      if (response.success && response.data) {
        setSubmissionResult(response.data)
        clearSavedData()
        addToast({
          type: 'success',
          title: 'Application submitted successfully',
          description: `Reference: ${response.data.applicationId}`,
        })
      } else {
        addToast({
          type: 'error',
          title: 'Submission failed',
          description: response.error,
        })
      }
    } catch {
      addToast({
        type: 'error',
        title: 'Network error',
        description: 'Please check your connection and try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [validateCurrentStep, form, clearSavedData, addToast])

  if (submissionResult) {
    return (
      <SuccessScreen
        result={submissionResult}
        onStartNew={() => {
          form.reset(DEFAULT_VALUES)
          wizard.goToStep(0)
          setSubmissionResult(null)
        }}
      />
    )
  }

  const stepComponents = [
    <StepPersonalInfo key="personal" />,
    <StepAddress key="address" />,
    <StepServiceDetails key="service" />,
    <StepDocumentUpload key="documents" />,
    <StepReview key="review" onEditStep={handleGoToStep} />,
  ]

  return (
    <FormProvider {...form}>
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-8">
          <StepIndicator
            steps={wizard.steps}
            currentStep={wizard.currentStep}
            onStepClick={handleGoToStep}
          />
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="p-6 sm:p-8">
            {stepComponents[wizard.currentStep]}
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-6 py-4 sm:px-8">
            <div>
              {!wizard.isFirstStep && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handlePrev}
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              )}
            </div>
            <div>
              {wizard.isLastStep ? (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  loading={isSubmitting}
                  size="lg"
                >
                  <Send className="h-4 w-4" />
                  Submit Application
                </Button>
              ) : (
                <Button type="button" onClick={handleNext}>
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-slate-400">
          Your progress is automatically saved. You can safely close this page
          and return later.
        </p>
      </div>
    </FormProvider>
  )
}
