import { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'

function Movies() {
  const [shows, setShows] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    // Cancel the request when leaving the page, including StrictMode cleanup.
    const controller = new AbortController()

    async function fetchShows() {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch('https://api.tvmaze.com/shows', {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Unable to load shows')
        }

        const data = await response.json()

        if (!Array.isArray(data)) {
          throw new Error('Unexpected response')
        }

        if (!controller.signal.aborted) {
          setShows(data)
        }
      } catch {
        if (!controller.signal.aborted) {
          setError('We couldn’t load the collection. Please check your connection and try again.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchShows()

    return () => controller.abort()
  }, [retryCount])

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
      <p className="text-xs font-semibold tracking-[0.2em] text-amber-300 uppercase">The collection</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Movies</h1>
      <p className="mt-4 text-base leading-7 text-zinc-400">Explore TV shows and find your next great watch.</p>
      <p className="mt-2 text-sm text-zinc-500">
        Show data by{' '}
        <a href="https://www.tvmaze.com/" className="text-zinc-400 underline underline-offset-4 transition-colors hover:text-amber-300">
          TVMaze
        </a>. Show details are coming soon.
      </p>

      <div className="mt-10 sm:mt-12" aria-busy={isLoading}>
        {isLoading ? (
          <div role="status" className="flex min-h-80 flex-col items-center justify-center gap-5 rounded-2xl border border-white/10 bg-zinc-900/40 px-6 text-center">
            <span aria-hidden="true" className="size-8 rounded-full border-2 border-zinc-700 border-t-amber-300 motion-safe:animate-spin" />
            <p className="text-zinc-400">Loading the collection…</p>
          </div>
        ) : error ? (
          <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/40 px-6 py-12 text-center">
            <h2 className="text-xl font-semibold">The collection is taking an intermission.</h2>
            <p role="alert" className="mt-4 max-w-md text-sm leading-7 text-zinc-400">{error}</p>
            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
              className="mt-6 min-h-11 rounded-lg bg-amber-300 px-6 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-200 motion-reduce:transition-none"
            >
              Try again
            </button>
          </div>
        ) : shows.length === 0 ? (
          <p role="status" className="rounded-2xl border border-white/10 bg-zinc-900/40 px-6 py-16 text-center text-zinc-400">
            No shows are available right now. Please check back soon.
          </p>
        ) : (
          <ul aria-label="TV show collection" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {shows.map((show) => (
              <li key={show.id} className="min-w-0">
                <MovieCard show={show} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Movies
