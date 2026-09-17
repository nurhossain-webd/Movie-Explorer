import { useEffect, useId, useRef, useState } from 'react'

function getSummaryText(summary) {
  if (!summary) return 'No overview is available for this show yet.'

  // Parse in an inert template. Only plain text is rendered through React.
  const template = document.createElement('template')
  template.innerHTML = summary
  template.content.querySelectorAll('script, style, iframe, object, embed').forEach((element) => element.remove())
  template.content.querySelectorAll('br').forEach((element) => element.replaceWith('\n'))
  template.content.querySelectorAll('p, div, li').forEach((element) => element.append('\n\n'))
  return template.content.textContent.trim() || 'No overview is available for this show yet.'
}

function MovieDetailsModal({ show, onClose }) {
  const dialogRef = useRef(null)
  const titleId = useId()
  const [imageFailed, setImageFailed] = useState(false)
  const name = show.name || 'Untitled show'
  const poster = show.image?.original || show.image?.medium
  const rating = show.rating?.average ?? 'N/A'
  const runtime = show.averageRuntime ?? show.runtime

  useEffect(() => {
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    const opener = document.activeElement
    dialog.showModal()
    document.body.style.overflow = 'hidden'

    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (opener?.isConnected) opener.focus({ preventScroll: true })
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return
        // Wrap keyboard focus between the two close buttons.
        const buttons = event.currentTarget.querySelectorAll('button')
        const first = buttons[0]
        const last = buttons[buttons.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-4xl overflow-y-auto overscroll-contain rounded-2xl border border-white/15 bg-zinc-900 p-0 text-zinc-100 shadow-2xl backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      <div>
        <div className="sticky top-0 z-10 flex justify-end bg-zinc-900/95 px-3 py-2">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="flex size-11 cursor-pointer items-center justify-center rounded-lg text-2xl text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white motion-reduce:transition-none"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="grid gap-7 px-5 pb-6 sm:px-8 sm:pb-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="mx-auto aspect-[2/3] w-full max-w-64 self-start overflow-hidden rounded-xl bg-zinc-950 md:max-w-none">
            {poster && !imageFailed ? (
              <img src={poster} alt={`${name} poster`} onError={() => setImageFailed(true)} className="size-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center bg-linear-to-br from-zinc-800 to-zinc-950 px-6 text-center text-sm text-zinc-500">
                Poster unavailable
              </div>
            )}
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-[0.2em] text-amber-300 uppercase">Show details</p>
            <h2 id={titleId} className="mt-3 text-3xl leading-tight font-bold tracking-tight wrap-anywhere sm:text-4xl">{name}</h2>
            <dl className="mt-6 grid grid-cols-2 gap-x-5 gap-y-5 text-sm">
              <div>
                <dt className="text-zinc-500">Rating</dt>
                <dd className="mt-1 font-medium text-amber-300">{rating}{rating !== 'N/A' && ' / 10'}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Premiere date</dt>
                <dd className="mt-1 text-zinc-200">{show.premiered || 'N/A'}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Language</dt>
                <dd className="mt-1 text-zinc-200 wrap-anywhere">{show.language || 'N/A'}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Status</dt>
                <dd className="mt-1 text-zinc-200 wrap-anywhere">{show.status || 'N/A'}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Episode length</dt>
                <dd className="mt-1 text-zinc-200">{runtime != null ? `${runtime} min` : 'N/A'}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Network</dt>
                <dd className="mt-1 text-zinc-200 wrap-anywhere">{show.network?.name || show.webChannel?.name || 'N/A'}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-zinc-500">Genres</dt>
                <dd className="mt-1 text-zinc-200 wrap-anywhere">{show.genres?.length ? show.genres.join(' · ') : 'N/A'}</dd>
              </div>
            </dl>

            <h3 className="mt-7 text-lg font-semibold">Overview</h3>
            <p className="mt-3 text-sm leading-7 whitespace-pre-line text-zinc-400 wrap-anywhere">{getSummaryText(show.summary)}</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 min-h-11 w-full cursor-pointer rounded-lg bg-amber-300 px-6 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-200 motion-reduce:transition-none sm:w-auto"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export default MovieDetailsModal
