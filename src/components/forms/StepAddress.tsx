import { useFormContext } from 'react-hook-form'
import { MapPin } from 'lucide-react'
import { FormField } from '@/components/ui/FormField'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { US_STATES } from '@/utils/constants'
import type { ApplicationFormData } from '@/types'

export function StepAddress() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ApplicationFormData>()

  const e = errors.address

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
          <MapPin className="h-5 w-5 text-slate-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Address Information
          </h2>
          <p className="text-sm text-slate-500">
            Your current residential or mailing address.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <FormField
          label="Street address"
          htmlFor="streetAddress"
          error={e?.streetAddress?.message}
          required
        >
          <Input
            id="streetAddress"
            placeholder="123 Main Street"
            hasError={!!e?.streetAddress}
            autoComplete="address-line1"
            {...register('address.streetAddress')}
          />
        </FormField>

        <FormField
          label="Apartment, suite, unit"
          htmlFor="aptSuite"
          error={e?.aptSuite?.message}
        >
          <Input
            id="aptSuite"
            placeholder="Apt 4B (optional)"
            hasError={!!e?.aptSuite}
            autoComplete="address-line2"
            {...register('address.aptSuite')}
          />
        </FormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="City"
            htmlFor="city"
            error={e?.city?.message}
            required
          >
            <Input
              id="city"
              placeholder="New York"
              hasError={!!e?.city}
              autoComplete="address-level2"
              {...register('address.city')}
            />
          </FormField>

          <FormField
            label="State"
            htmlFor="state"
            error={e?.state?.message}
            required
          >
            <Select
              id="state"
              options={US_STATES}
              hasError={!!e?.state}
              autoComplete="address-level1"
              {...register('address.state')}
            />
          </FormField>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="ZIP code"
            htmlFor="zipCode"
            error={e?.zipCode?.message}
            hint="5 or 9 digit format"
            required
          >
            <Input
              id="zipCode"
              placeholder="10001"
              hasError={!!e?.zipCode}
              autoComplete="postal-code"
              {...register('address.zipCode')}
            />
          </FormField>

          <FormField label="Country" htmlFor="country">
            <Input
              id="country"
              disabled
              value="United States"
              {...register('address.country')}
            />
          </FormField>
        </div>
      </div>
    </div>
  )
}
