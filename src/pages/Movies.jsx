import { useEffect, useRef, useState } from 'react'
import MovieCard from '../components/MovieCard'
import MovieDetailsModal from '../components/MovieDetailsModal'

const SHOWS_PER_PAGE = 20

function Movies() {
  const [shows, setShows] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)
  const [query, setQuery] = useState('')
  const [selectedShow, setSelectedShow] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const collectionCache = useRef(null)
  const searchInput = useRef(null)
  const resultsHeading = useRef(null)
  const searchQuery = query.trim()
  const totalPages = Math.ceil(shows.length / SHOWS_PER_PAGE)
  const startIndex = (currentPage - 1) * SHOWS_PER_PAGE
  const visibleShows = shows.slice(startIndex, startIndex + SHOWS_PER_PAGE)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchShows() {
      setError('')

      // Clearing search restores the collection without another network request.
      if (!searchQuery && collectionCache.current !== null) {
        setShows(collectionCache.current)
        setCurrentPage(1)
        setIsLoading(false)
        return
      }

      try {
        const url = searchQuery
          ? `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchQuery)}`
          : 'https://api.tvmaze.com/shows'
        const response = await fetch(url, {
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
          // Search results wrap each show in a { score, show } object.
          const results = searchQuery ? data.map((result) => result?.show) : data
          const validShows = results.filter((show) => show?.id != null)
          setShows(validShows)
          setCurrentPage(1)
          if (!searchQuery) collectionCache.current = validShows
        }
      } catch {
        if (!controller.signal.aborted) {
          setError(searchQuery
            ? 'We couldn’t search right now. Please check your connection and try again.'
            : 'We couldn’t load the collection. Please check your connection and try again.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    // Wait for a pause in typing; cancel both the timer and outdated requests.
    const timer = setTimeout(fetchShows, searchQuery ? 350 : 0)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [searchQuery, retryCount])

  function updateQuery(value) {
    setQuery(value)
    if (value.trim() !== searchQuery) {
      setIsLoading(true)
      setError('')
    }
  }

  function clearSearch() {
    updateQuery('')
    searchInput.current.focus()
  }

  function changePage(page) {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    resultsHeading.current.scrollIntoView({ block: 'start', behavior: 'instant' })
    resultsHeading.current.focus({ preventScroll: true })
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-12">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-amber-300 uppercase">The collection</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Movies</h1>
          <p className="mt-4 text-base leading-7 text-zinc-400">Explore TV shows and find your next great watch.</p>
        </div>

        <form role="search" onSubmit={(event) => event.preventDefault()} className="min-w-0">
          <label htmlFor="show-search" className="mb-3 block text-sm font-medium text-zinc-200">
            Search movies and TV shows
          </label>
          <div className="relative">
            <input
              ref={searchInput}
              id="show-search"
              type="search"
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
              placeholder="Search by title…"
              autoComplete="off"
              className="min-h-14 w-full rounded-xl border border-white/15 bg-zinc-900 px-5 py-4 pr-20 text-base text-zinc-100 placeholder:text-zinc-500 focus:border-amber-300 focus:outline-2 focus:outline-offset-2 focus:outline-amber-300/50 [&::-webkit-search-cancel-button]:appearance-none"
            />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear search"
                className="absolute top-1/2 right-2 min-h-11 -translate-y-1/2 rounded-lg px-3 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-amber-300 motion-reduce:transition-none"
              >
                Clear
              </button>
            )}
          </div>
          <p className="mt-3 text-sm text-zinc-500 lg:text-right">
            Show data by{' '}
            <a href="https://www.tvmaze.com/" className="text-zinc-400 underline underline-offset-4 transition-colors hover:text-amber-300">
              TVMaze
            </a>.
          </p>
        </form>
      </div>

      <div className="mt-8" aria-busy={isLoading}>
        {isLoading ? (
          <div role="status" className="flex min-h-80 flex-col items-center justify-center gap-5 rounded-2xl border border-white/10 bg-zinc-900/40 px-6 text-center">
            <span aria-hidden="true" className="size-8 rounded-full border-2 border-zinc-700 border-t-amber-300 motion-safe:animate-spin" />
            <p className="text-zinc-400">{searchQuery ? 'Searching for shows…' : 'Loading the collection…'}</p>
          </div>
        ) : error ? (
          <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/40 px-6 py-12 text-center">
            <h2 className="text-xl font-semibold">The collection is taking an intermission.</h2>
            <p role="alert" className="mt-4 max-w-md text-sm leading-7 text-zinc-400">{error}</p>
            <button
              type="button"
              onClick={() => {
                setIsLoading(true)
                setRetryCount((count) => count + 1)
              }}
              className="mt-6 min-h-11 rounded-lg bg-amber-300 px-6 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-200 motion-reduce:transition-none"
            >
              Try again
            </button>
          </div>
        ) : shows.length === 0 ? (
          <p role="status" className="rounded-2xl border border-white/10 bg-zinc-900/40 px-6 py-16 text-center text-zinc-400 wrap-anywhere">
            {searchQuery
              ? `No shows found for “${searchQuery}”. Try a different title.`
              : 'No shows are available right now. Please check back soon.'}
          </p>
        ) : (
          <>
            <p ref={resultsHeading} role="status" tabIndex={-1} className="mb-5 scroll-mt-6 text-sm text-zinc-400 outline-none wrap-anywhere">
              Showing {startIndex + 1}–{Math.min(startIndex + SHOWS_PER_PAGE, shows.length)} of{' '}
              {searchQuery
                ? `${shows.length} ${shows.length === 1 ? 'result' : 'results'} for “${searchQuery}”`
                : `${shows.length} shows`}
            </p>
            <ul aria-label="TV show collection" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleShows.map((show) => (
                <li key={show.id} className="min-w-0">
                  <MovieCard show={show} onSeeDetails={setSelectedShow} />
                </li>
              ))}
            </ul>
            {totalPages > 1 && (
              <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center justify-center gap-3 border-t border-white/10 pt-6 sm:gap-6">
                <button
                  type="button"
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="min-h-11 cursor-pointer rounded-lg border border-white/15 px-4 py-3 text-sm font-medium text-zinc-200 transition-colors enabled:hover:border-amber-300/50 enabled:hover:text-amber-300 disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none"
                >
                  Previous
                </button>
                <span className="text-sm text-zinc-400">
                  Page <span className="font-semibold text-amber-300">{currentPage}</span> of {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="min-h-11 cursor-pointer rounded-lg border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm font-medium text-amber-300 transition-colors enabled:hover:bg-amber-300 enabled:hover:text-zinc-950 disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none"
                >
                  Next
                </button>
              </nav>
            )}
          </>
        )}
      </div>
      {selectedShow && (
        <MovieDetailsModal show={selectedShow} onClose={() => setSelectedShow(null)} />
      )}
    </div>
  )
}

export default Movies
