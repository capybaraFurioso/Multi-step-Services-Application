import { CheckCircle2, Copy, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import type { SubmissionResult } from '@/types'

interface SuccessScreenProps {
  result: SubmissionResult
  onStartNew: () => void
}

export function SuccessScreen({ result, onStartNew }: SuccessScreenProps) {
  const [copied, setCopied] = useState(false)

  const copyId = async () => {
    await navigator.clipboard.writeText(result.applicationId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mx-auto w-full max-w-lg text-center">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>

        <h1 className="text-2xl font-semibold text-slate-900">
          Application Submitted
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          The local demonstration API accepted the fictional test data and
          generated the reference below. No email or external service is used.
        </p>

        <div className="mt-8 rounded-lg bg-slate-50 p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Reference Number
          </p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <code className="text-lg font-bold tracking-wide text-slate-900">
              {result.applicationId}
            </code>
            <button
              type="button"
              onClick={copyId}
              className="rounded-md p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
              aria-label="Copy reference number"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
          {copied && (
            <p className="mt-1 text-xs text-emerald-600">
              Copied to clipboard
            </p>
          )}
        </div>

        <dl className="mt-6 divide-y divide-slate-100 text-left">
          <div className="flex justify-between py-3">
            <dt className="text-sm text-slate-500">Submitted</dt>
            <dd className="text-sm font-medium text-slate-900">
              {new Date(result.submittedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </dd>
          </div>
          <div className="flex justify-between py-3">
            <dt className="text-sm text-slate-500">Endpoint</dt>
            <dd className="text-sm font-medium text-slate-900">Local REST demo</dd>
          </div>
        </dl>

        <div className="mt-8">
          <Button onClick={onStartNew} variant="secondary" fullWidth>
            Start New Application
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
