import { z } from 'zod'

export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name contains invalid characters'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name contains invalid characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(
      /^\+?1?\s*\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      'Please enter a valid US phone number'
    ),
  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required')
    .refine((val) => {
      const date = new Date(val)
      const now = new Date()
      const age = now.getFullYear() - date.getFullYear()
      return age >= 18
    }, 'You must be at least 18 years old'),
  idNumber: z
    .string()
    .min(1, 'ID number is required')
    .regex(/^\d{3}-\d{2}-\d{4}$/, 'ID must follow format: XXX-XX-XXXX'),
})

export const addressSchema = z.object({
  streetAddress: z
    .string()
    .min(5, 'Street address must be at least 5 characters')
    .max(100, 'Street address must not exceed 100 characters'),
  aptSuite: z.string().max(20, 'Apt/Suite must not exceed 20 characters').optional().default(''),
  city: z
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must not exceed 50 characters'),
  state: z.string().min(1, 'Please select a state'),
  zipCode: z
    .string()
    .min(1, 'ZIP code is required')
    .regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)'),
  country: z.string().default('United States'),
})

export const serviceDetailsSchema = z.object({
  serviceType: z.string().min(1, 'Please select a service type'),
  urgency: z.enum(['standard', 'expedited', 'emergency'], {
    error: 'Please select a processing speed',
  }),
  description: z
    .string()
    .min(20, 'Please provide at least 20 characters describing your request')
    .max(1000, 'Description must not exceed 1000 characters'),
  preferredContact: z.enum(['email', 'phone', 'mail'], {
    error: 'Please select a contact preference',
  }),
  agreeToTerms: z.literal(true, {
    error: 'You must agree to the terms of service',
  }),
})

export const documentUploadSchema = z.object({
  documents: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        size: z.number(),
        type: z.string(),
        progress: z.number(),
        status: z.enum(['uploading', 'complete', 'error']),
      })
    )
    .min(1, 'Please upload at least one document')
    .max(5, 'Maximum 5 documents allowed'),
})

export const applicationSchema = z.object({
  personalInfo: personalInfoSchema,
  address: addressSchema,
  serviceDetails: serviceDetailsSchema,
  documentUpload: documentUploadSchema,
})
