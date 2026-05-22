import type { z } from 'zod'
import type {
  personalInfoSchema,
  addressSchema,
  serviceDetailsSchema,
  documentUploadSchema,
  applicationSchema,
} from '@/schemas/application'

export type PersonalInfo = z.infer<typeof personalInfoSchema>
export type Address = z.infer<typeof addressSchema>
export type ServiceDetails = z.infer<typeof serviceDetailsSchema>
export type DocumentUpload = z.infer<typeof documentUploadSchema>
export type ApplicationFormData = z.infer<typeof applicationSchema>

export interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  progress: number
  status: 'uploading' | 'complete' | 'error'
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface SubmissionResult {
  applicationId: string
  submittedAt: string
  estimatedProcessingDays: number
}

export interface WizardStep {
  id: number
  label: string
  description: string
  status: 'pending' | 'active' | 'complete' | 'error'
}

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'info'
  title: string
  description?: string
}
