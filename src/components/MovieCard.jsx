import { useState } from 'react'

function MovieCard({ show, onSeeDetails }) {
  const [imageFailed, setImageFailed] = useState(false)
  const name = show.name || 'Untitled show'
  const poster = show.image?.medium || show.image?.original
  const rating = show.rating?.average ?? 'N/A'
  const year = show.premiered?.slice(0, 4) || 'N/A'

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-zinc-900/60 transition-colors duration-200 hover:border-amber-300/40 motion-reduce:transition-none">
      <div className="aspect-[2/3] overflow-hidden bg-zinc-900">
        {poster && !imageFailed ? (
          <img
            src={poster}
            alt={`${name} poster`}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 bg-linear-to-br from-zinc-800 to-zinc-950 px-6 text-center text-zinc-400">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-12">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M7 3v18M17 3v18M3 8h4M3 16h4M17 8h4M17 16h4M7 12h10" />
            </svg>
            <span className="text-sm">Poster unavailable</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h2 title={name} className="line-clamp-2 min-h-14 text-lg leading-7 font-semibold text-zinc-100 wrap-anywhere">{name}</h2>
        <dl className="mt-4 mb-6 flex items-center justify-between gap-3 text-sm">
          <div>
            <dt className="text-xs text-zinc-400">Rating</dt>
            <dd className="mt-1 font-medium text-amber-300">
              <span aria-hidden="true">★ </span>{rating}
              {rating !== 'N/A' && <span className="text-xs font-normal text-zinc-400"> / 10</span>}
            </dd>
          </div>
          <div className="text-right">
            <dt className="text-xs text-zinc-400">Premiere year</dt>
            <dd className="mt-1 text-zinc-300">{year}</dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={() => onSeeDetails(show)}
          aria-label={`See Details for ${name}`}
          aria-haspopup="dialog"
          className="mt-auto min-h-11 w-full cursor-pointer rounded-lg border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm font-medium text-amber-300 transition-colors hover:border-amber-300/50 hover:bg-amber-300 hover:text-zinc-950 motion-reduce:transition-none"
        >
          See Details
        </button>
      </div>
    </article>
  )
}

export default MovieCard
