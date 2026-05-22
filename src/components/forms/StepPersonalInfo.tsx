import { useFormContext } from 'react-hook-form'
import { User } from 'lucide-react'
import { FormField } from '@/components/ui/FormField'
import { Input } from '@/components/ui/Input'
import type { ApplicationFormData } from '@/types'

export function StepPersonalInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ApplicationFormData>()

  const e = errors.personalInfo

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
          <User className="h-5 w-5 text-slate-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Personal Information
          </h2>
          <p className="text-sm text-slate-500">
            Provide your legal name and identification details.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="First name"
            htmlFor="firstName"
            error={e?.firstName?.message}
            required
          >
            <Input
              id="firstName"
              placeholder="Enter your first name"
              hasError={!!e?.firstName}
              autoComplete="given-name"
              {...register('personalInfo.firstName')}
            />
          </FormField>

          <FormField
            label="Last name"
            htmlFor="lastName"
            error={e?.lastName?.message}
            required
          >
            <Input
              id="lastName"
              placeholder="Enter your last name"
              hasError={!!e?.lastName}
              autoComplete="family-name"
              {...register('personalInfo.lastName')}
            />
          </FormField>
        </div>

        <FormField
          label="Email address"
          htmlFor="email"
          error={e?.email?.message}
          required
        >
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            hasError={!!e?.email}
            autoComplete="email"
            {...register('personalInfo.email')}
          />
        </FormField>

        <FormField
          label="Phone number"
          htmlFor="phone"
          error={e?.phone?.message}
          hint="US format: (555) 123-4567"
          required
        >
          <Input
            id="phone"
            type="tel"
            placeholder="(555) 123-4567"
            hasError={!!e?.phone}
            autoComplete="tel"
            {...register('personalInfo.phone')}
          />
        </FormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="Date of birth"
            htmlFor="dateOfBirth"
            error={e?.dateOfBirth?.message}
            required
          >
            <Input
              id="dateOfBirth"
              type="date"
              hasError={!!e?.dateOfBirth}
              autoComplete="bday"
              {...register('personalInfo.dateOfBirth')}
            />
          </FormField>

          <FormField
            label="ID number"
            htmlFor="idNumber"
            error={e?.idNumber?.message}
            hint="Format: XXX-XX-XXXX"
            required
          >
            <Input
              id="idNumber"
              placeholder="000-00-0000"
              hasError={!!e?.idNumber}
              {...register('personalInfo.idNumber')}
            />
          </FormField>
        </div>
      </div>
    </div>
  )
}
