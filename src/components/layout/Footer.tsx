export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} SmartServices Portal. Portfolio
            demonstration.
          </p>
          <div className="flex gap-4 text-xs text-slate-500">
            <a
              className="hover:text-slate-700 transition-colors"
              href="https://github.com/capybaraFurioso/Multi-step-Services-Application"
              target="_blank"
              rel="noreferrer"
            >
              View source on GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
