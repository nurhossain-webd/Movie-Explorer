import { Link } from 'react-router-dom'

function Movies() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
      <p className="text-xs font-semibold tracking-[0.2em] text-amber-300 uppercase">The collection</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Movies</h1>
      <p className="mt-4 text-base leading-7 text-zinc-400">A world of stories, waiting to be explored.</p>

      <section
        aria-labelledby="coming-soon-heading"
        className="mt-10 flex min-h-80 flex-col items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/40 px-6 py-16 text-center sm:mt-12"
      >
        <span className="rounded-full border border-amber-300/20 bg-amber-300/5 px-4 py-1.5 text-xs font-medium tracking-wide text-amber-300">
          Coming soon
        </span>
        <h2 id="coming-soon-heading" className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">The best is yet to roll.</h2>
        <p className="mt-4 max-w-md text-sm leading-7 text-zinc-400">
          Our collection is taking shape. Soon, this will be your starting
          point for finding your next great watch.
        </p>
        <Link to="/" className="mt-8 inline-flex min-h-11 items-center gap-3 text-sm font-medium text-amber-300 transition-colors hover:text-amber-200">
          <span aria-hidden="true">←</span> Back to home
        </Link>
      </section>
    </div>
  )
}

export default Movies
