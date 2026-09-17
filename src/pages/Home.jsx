import { Link } from 'react-router-dom'

function Home() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="flex flex-1 items-center justify-center bg-[radial-gradient(ellipse_at_50%_0%,rgba(251,191,36,0.14),transparent_65%)] px-6 py-16 sm:px-8 sm:py-20 lg:py-24"
    >
      <div className="flex w-full max-w-4xl flex-col items-center text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-amber-300 uppercase">
          Your next great watch starts here
        </p>
        <h1
          id="hero-heading"
          className="mt-6 text-5xl leading-[1.05] font-bold tracking-tight sm:text-7xl lg:text-8xl"
        >
          Discover{' '}
          <span className="block text-amber-300">Movies</span>
        </h1>
        <p className="mt-6 max-w-lg text-base leading-7 text-zinc-400 sm:mt-8 sm:text-lg sm:leading-8">
          Explore a world of movies and TV shows, from unforgettable adventures
          to stories that stay with you. Find your next reason to press play.
        </p>
        <Link
          to="/movies"
          className="group mt-8 inline-flex min-h-12 w-full items-center justify-center gap-5 rounded-lg bg-amber-300 px-7 py-4 text-sm font-semibold text-zinc-950 shadow-lg shadow-amber-300/10 transition-colors duration-200 hover:bg-amber-200 motion-reduce:transition-none sm:mt-10 sm:w-auto"
        >
          Explore Now
          <span
            aria-hidden="true"
            className="text-xl leading-none transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
          >
            →
          </span>
        </Link>
      </div>
    </section>
  )
}

export default Home
