import type { ApiResponse, ApplicationFormData, SubmissionResult } from '@/types'

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function submitApplication(
  data: ApplicationFormData
): Promise<ApiResponse<SubmissionResult>> {
  await delay(2000 + Math.random() * 1500)

  const shouldSucceed = Math.random() > 0.15

  if (!shouldSucceed) {
    return {
      success: false,
      error:
        'We encountered an issue processing your application. Please try again.',
    }
  }

  const applicationId = `APP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`

  return {
    success: true,
    data: {
      applicationId,
      submittedAt: new Date().toISOString(),
      estimatedProcessingDays:
        data.serviceDetails.urgency === 'emergency'
          ? 1
          : data.serviceDetails.urgency === 'expedited'
            ? 5
            : 15,
    },
  }
}
