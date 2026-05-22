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
    title: 'Secure & Private',
    description:
      'Your data is encrypted in transit and at rest. We follow industry-standard security practices.',
  },
  {
    icon: Clock,
    title: 'Save & Resume',
    description:
      'Your progress is automatically saved. Return anytime to complete your application.',
  },
  {
    icon: FileCheck,
    title: 'Track Progress',
    description:
      'Receive real-time updates on your application status via your preferred contact method.',
  },
  {
    icon: HelpCircle,
    title: 'Support Available',
    description:
      'Need help? Our team is available during business hours to assist with your application.',
  },
]

export function HomePage() {
  return (
    <Container>
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Applications Open
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Smart Services Portal
        </h1>
        <p className="mt-4 text-base text-slate-600 leading-relaxed">
          Apply for permits, licenses, inspections, and other municipal
          services. Complete the multi-step application process securely
          online.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link to="/apply">
            <Button size="lg">
              Start Application
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="secondary" size="lg">
            Check Status
          </Button>
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
