import { Container } from '@/components/layout/Container'
import { MultiStepWizard } from '@/components/forms/MultiStepWizard'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'

export function ApplicationPage() {
  return (
    <Container className="py-4">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Service Application
        </h1>
        <p className="mt-2 text-sm text-slate-600 max-w-lg mx-auto">
          Complete each section below to submit your application. All fields
          marked with an asterisk are required.
        </p>
      </div>

      <ErrorBoundary>
        <MultiStepWizard />
      </ErrorBoundary>
    </Container>
  )
}
