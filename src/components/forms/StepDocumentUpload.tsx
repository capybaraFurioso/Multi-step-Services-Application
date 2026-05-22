import { useFormContext, Controller } from 'react-hook-form'
import { Paperclip } from 'lucide-react'
import { FormField } from '@/components/ui/FormField'
import { FileUpload } from '@/components/ui/FileUpload'
import type { ApplicationFormData } from '@/types'

export function StepDocumentUpload() {
  const {
    control,
    formState: { errors },
  } = useFormContext<ApplicationFormData>()

  const e = errors.documentUpload

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
          <Paperclip className="h-5 w-5 text-slate-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Document Upload
          </h2>
          <p className="text-sm text-slate-500">
            Upload supporting documents for your application.
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-medium text-amber-800">
          Required documents may include:
        </p>
        <ul className="mt-2 space-y-1 text-sm text-amber-700">
          <li className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-amber-500" />
            Government-issued photo ID
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-amber-500" />
            Proof of address (utility bill, bank statement)
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-amber-500" />
            Any additional supporting documentation
          </li>
        </ul>
      </div>

      <FormField
        label="Upload documents"
        htmlFor="documents"
        error={e?.documents?.message ?? e?.documents?.root?.message}
        required
      >
        <Controller
          name="documentUpload.documents"
          control={control}
          render={({ field }) => (
            <FileUpload
              files={field.value ?? []}
              onChange={field.onChange}
              error={e?.documents?.message ?? e?.documents?.root?.message}
            />
          )}
        />
      </FormField>
    </div>
  )
}
