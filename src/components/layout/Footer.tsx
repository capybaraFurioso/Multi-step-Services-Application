export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} SmartServices Portal. All rights
            reserved.
          </p>
          <div className="flex gap-4 text-xs text-slate-500">
            <span className="hover:text-slate-700 cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-slate-700 cursor-pointer transition-colors">
              Terms of Service
            </span>
            <span className="hover:text-slate-700 cursor-pointer transition-colors">
              Accessibility
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
