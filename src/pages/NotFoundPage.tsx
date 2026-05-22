import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'

export function NotFoundPage() {
  return (
    <Container className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <p className="text-6xl font-bold text-slate-200">404</p>
        <h1 className="mt-4 text-xl font-semibold text-slate-900">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link to="/" className="mt-6 inline-block">
          <Button variant="secondary">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Button>
        </Link>
      </div>
    </Container>
  )
}
