import { Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-slate-900">
              SmartServices
            </span>
            <span className="hidden sm:inline ml-2 text-xs font-medium text-slate-400 border-l border-slate-200 pl-2">
              Digital Portal
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            System Online
          </span>
        </div>
      </div>
    </header>
  )
}
