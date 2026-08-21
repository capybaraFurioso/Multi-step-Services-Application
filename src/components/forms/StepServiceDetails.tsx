import { useFormContext, Controller } from 'react-hook-form'
import { FileStack } from 'lucide-react'
import { FormField } from '@/components/ui/FormField'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { RadioGroup } from '@/components/ui/RadioGroup'
import { SERVICE_TYPES } from '@/utils/constants'
import { cn } from '@/utils/cn'
import type { ApplicationFormData } from '@/types'

const URGENCY_OPTIONS = [
  {
    value: 'standard',
    label: 'Standard',
    description: 'Default demo priority',
  },
  {
    value: 'expedited',
    label: 'Expedited',
    description: 'High demo priority',
  },
  {
    value: 'emergency',
    label: 'Emergency',
    description: 'Critical demo priority',
  },
] as const

const CONTACT_OPTIONS = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'mail', label: 'Physical Mail' },
] as const

export function StepServiceDetails() {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<ApplicationFormData>()

  const e = errors.serviceDetails
  const description = watch('serviceDetails.description') ?? ''

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
          <FileStack className="h-5 w-5 text-slate-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Service Details
          </h2>
          <p className="text-sm text-slate-500">
            Tell us about the service you need.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <FormField
          label="Service type"
          htmlFor="serviceType"
          error={e?.serviceType?.message}
          required
        >
          <Select
            id="serviceType"
            options={SERVICE_TYPES}
            hasError={!!e?.serviceType}
            {...register('serviceDetails.serviceType')}
          />
        </FormField>

        <FormField
          label="Processing speed"
          htmlFor="urgency"
          error={e?.urgency?.message}
          required
        >
          <Controller
            name="serviceDetails.urgency"
            control={control}
            render={({ field }) => (
              <RadioGroup
                name={field.name}
                options={URGENCY_OPTIONS}
                selectedValue={field.value}
                hasError={!!e?.urgency}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        </FormField>

        <FormField
          label="Description of request"
          htmlFor="description"
          error={e?.description?.message}
          required
        >
          <Textarea
            id="description"
            rows={5}
            placeholder="Please describe your request in detail. Include any relevant background, specific requirements, or circumstances that may affect processing."
            hasError={!!e?.description}
            {...register('serviceDetails.description')}
          />
          <div className="mt-1 flex justify-end">
            <span
              className={cn(
                'text-xs',
                description.length > 900
                  ? 'text-amber-600'
                  : description.length > 1000
                    ? 'text-red-600'
                    : 'text-slate-400'
              )}
            >
              {description.length} / 1000
            </span>
          </div>
        </FormField>

        <FormField
          label="Preferred contact method"
          htmlFor="preferredContact"
          error={e?.preferredContact?.message}
          required
        >
          <Controller
            name="serviceDetails.preferredContact"
            control={control}
            render={({ field }) => (
              <RadioGroup
                name={field.name}
                options={CONTACT_OPTIONS}
                selectedValue={field.value}
                hasError={!!e?.preferredContact}
                layout="horizontal"
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        </FormField>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-500"
              {...register('serviceDetails.agreeToTerms')}
            />
            <span className="text-sm text-slate-700">
              I understand this is a portfolio demonstration and confirm that
              the information entered is fictional test data.
            </span>
          </label>
          {e?.agreeToTerms && (
            <p className="mt-2 text-sm text-red-600" role="alert">
              {e.agreeToTerms.message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
