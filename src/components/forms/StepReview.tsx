import { useFormContext } from 'react-hook-form'
import { ClipboardCheck, Pencil } from 'lucide-react'
import { maskIdNumber, formatPhoneDisplay, formatFileSize } from '@/utils/format'
import { SERVICE_TYPES, US_STATES } from '@/utils/constants'
import type { ApplicationFormData } from '@/types'

interface ReviewSectionProps {
  title: string
  stepIndex: number
  onEdit: (step: number) => void
  children: React.ReactNode
}

function ReviewSection({ title, stepIndex, onEdit, children }: ReviewSectionProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-5 py-3">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <button
          type="button"
          onClick={() => onEdit(stepIndex)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          <Pencil className="h-3 w-3" />
          Edit
        </button>
      </div>
      <dl className="divide-y divide-slate-100 px-5">{children}</dl>
    </div>
  )
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-3">
      <dt className="text-sm text-slate-500 shrink-0">{label}</dt>
      <dd className="text-sm font-medium text-slate-900 text-right truncate">
        {value}
      </dd>
    </div>
  )
}

interface StepReviewProps {
  onEditStep: (step: number) => void
}

export function StepReview({ onEditStep }: StepReviewProps) {
  const { getValues } = useFormContext<ApplicationFormData>()
  const values = getValues()

  const stateLabel =
    US_STATES.find((s) => s.value === values.address.state)?.label ??
    values.address.state

  const serviceLabel =
    SERVICE_TYPES.find((s) => s.value === values.serviceDetails.serviceType)
      ?.label ?? values.serviceDetails.serviceType

  const urgencyLabels = {
    standard: 'Standard demo priority',
    expedited: 'High demo priority',
    emergency: 'Critical demo priority',
  } as const

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
          <ClipboardCheck className="h-5 w-5 text-slate-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Review Your Application
          </h2>
          <p className="text-sm text-slate-500">
            Please verify all details before submitting.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <ReviewSection title="Personal Information" stepIndex={0} onEdit={onEditStep}>
          <ReviewRow
            label="Full name"
            value={`${values.personalInfo.firstName} ${values.personalInfo.lastName}`}
          />
          <ReviewRow label="Email" value={values.personalInfo.email} />
          <ReviewRow
            label="Phone"
            value={formatPhoneDisplay(values.personalInfo.phone)}
          />
          <ReviewRow
            label="Date of birth"
            value={values.personalInfo.dateOfBirth}
          />
          <ReviewRow
            label="ID number"
            value={maskIdNumber(values.personalInfo.idNumber)}
          />
        </ReviewSection>

        <ReviewSection title="Address" stepIndex={1} onEdit={onEditStep}>
          <ReviewRow
            label="Street"
            value={
              values.address.aptSuite
                ? `${values.address.streetAddress}, ${values.address.aptSuite}`
                : values.address.streetAddress
            }
          />
          <ReviewRow
            label="City, State, ZIP"
            value={`${values.address.city}, ${stateLabel} ${values.address.zipCode}`}
          />
          <ReviewRow label="Country" value={values.address.country} />
        </ReviewSection>

        <ReviewSection title="Service Details" stepIndex={2} onEdit={onEditStep}>
          <ReviewRow label="Service type" value={serviceLabel} />
          <ReviewRow
            label="Processing speed"
            value={
              urgencyLabels[
                values.serviceDetails.urgency as keyof typeof urgencyLabels
              ] ?? values.serviceDetails.urgency
            }
          />
          <ReviewRow
            label="Contact preference"
            value={
              values.serviceDetails.preferredContact.charAt(0).toUpperCase() +
              values.serviceDetails.preferredContact.slice(1)
            }
          />
          <div className="py-3">
            <dt className="text-sm text-slate-500 mb-1">Description</dt>
            <dd className="text-sm text-slate-900 whitespace-pre-wrap">
              {values.serviceDetails.description}
            </dd>
          </div>
        </ReviewSection>

        <ReviewSection title="Documents" stepIndex={3} onEdit={onEditStep}>
          {values.documentUpload.documents.map((doc) => (
            <ReviewRow
              key={doc.id}
              label={doc.name}
              value={formatFileSize(doc.size)}
            />
          ))}
        </ReviewSection>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm text-slate-700">
          This submission is sent only to the local demonstration API. Do not
          enter real personal information or identity documents.
        </p>
      </div>
    </div>
  )
}
