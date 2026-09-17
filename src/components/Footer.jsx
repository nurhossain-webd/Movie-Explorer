import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <Link to="/" className="inline-flex min-h-11 items-center text-sm font-semibold text-zinc-200 transition-colors hover:text-amber-300 motion-reduce:transition-none">MovieExplorer</Link>
          <p className="mt-2 text-sm text-zinc-400">A little curiosity. A great story.</p>
        </div>
        <p className="text-xs leading-6 text-zinc-400">
          © {new Date().getFullYear()} MovieExplorer. Made for the love of cinema.
        </p>
      </div>
    </footer>
  )
}

export default Footer
