import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  const linkClassName = ({ isActive }) =>
    `rounded-lg px-5 py-3 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-amber-300/10 text-amber-300'
        : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
    }`

  return (
    <header className="border-b border-white/10 bg-zinc-950">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-5 sm:flex-row sm:px-8"
      >
        <Link to="/" className="flex items-center gap-3 text-xl font-bold tracking-tight">
          <span className="flex size-9 items-center justify-center rounded-lg bg-amber-300 text-zinc-950">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="currentColor">
              <path d="M8 4.5v15L20 12 8 4.5Z" />
            </svg>
          </span>
          <span>Movie<span className="text-amber-300">Explorer</span></span>
        </Link>
        <div className="flex items-center gap-2">
          <NavLink to="/" end className={linkClassName}>Home</NavLink>
          <NavLink to="/movies" className={linkClassName}>Movies</NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
