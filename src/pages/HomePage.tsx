import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Shield,
  Clock,
  FileCheck,
  HelpCircle,
} from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'

const features = [
  {
    icon: Shield,
    title: 'Schema Validation',
    description:
      'React Hook Form and Zod validate each step before the user can continue.',
  },
  {
    icon: Clock,
    title: 'Draft Persistence',
    description:
      'Your progress is automatically saved. Return anytime to complete your application.',
  },
  {
    icon: FileCheck,
    title: 'HTTP Submission',
    description:
      'Completed applications are sent to the included local REST endpoint with loading and success states.',
  },
  {
    icon: HelpCircle,
    title: 'Recoverable Errors',
    description:
      'Validation, network, and unexpected application errors produce visible recovery paths.',
  },
]

export function HomePage() {
  return (
    <Container>
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Functional Local Demo
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Smart Services Portal
        </h1>
        <p className="mt-4 text-base text-slate-600 leading-relaxed">
          Apply for permits, licenses, inspections, and other municipal
          services. This portfolio demo validates, saves, and submits an
          application to its included local API.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link to="/apply">
            <Button size="lg">
              Start Application
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-sm"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
              <feature.icon className="h-5 w-5 text-slate-600" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">
              {feature.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </Container>
  )
}
