import type { ApiResponse, ApplicationFormData, SubmissionResult } from '@/types'

const APPLICATIONS_ENDPOINT =
  import.meta.env.VITE_APPLICATIONS_API_URL ?? '/api/applications'

export async function submitApplication(
  data: ApplicationFormData
): Promise<ApiResponse<SubmissionResult>> {
  const response = await fetch(APPLICATIONS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    signal: AbortSignal.timeout(10_000),
  })

  const payload = (await response.json()) as ApiResponse<SubmissionResult>
  if (!response.ok) {
    return {
      success: false,
      error: payload.error ?? 'The server could not process the application.',
    }
  }

  return payload
}
