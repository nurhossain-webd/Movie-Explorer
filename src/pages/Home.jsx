import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <section className="border-b border-white/10 bg-[radial-gradient(ellipse_at_top_right,rgba(251,191,36,0.09),transparent_60%)]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-24 lg:py-28">
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-amber-300 uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-amber-300" />
            Welcome to MovieExplorer
          </p>
          <h1 className="mt-8 max-w-4xl text-5xl leading-[1.08] font-bold tracking-tight sm:text-7xl lg:text-8xl">
            Good stories.<br />
            <span className="text-amber-300">Great discoveries.</span>
          </h1>
          <p className="mt-7 max-w-lg text-base leading-8 text-zinc-400 sm:text-lg">
            For the nights you want to escape, feel something, or see the world
            a little differently. Your next great watch starts here.
          </p>
          <Link
            to="/movies"
            className="mt-9 inline-flex min-h-12 items-center gap-6 rounded-lg bg-amber-300 px-6 py-3.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-200"
          >
            Explore movies <span aria-hidden="true" className="text-xl leading-none">→</span>
          </Link>
          <p className="mt-12 text-xs tracking-[0.16em] text-zinc-500 uppercase sm:mt-16">
            Dim the lights. Open your world.
          </p>
        </div>
      </section>
      <section
        aria-labelledby="intro-heading"
        className="mx-auto grid max-w-6xl gap-5 px-6 py-12 sm:px-8 sm:py-14 md:grid-cols-2 md:gap-16"
      >
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-zinc-500 uppercase">Beyond the opening credits</p>
          <h2 id="intro-heading" className="mt-3 text-2xl font-semibold tracking-tight">A place for your love of stories.</h2>
        </div>
        <p className="text-sm leading-7 text-zinc-400">
          Big adventures. Quiet moments. Endings that stay with you.
          MovieExplorer is a space for discovering the stories that make
          screen time worth your time.
        </p>
      </section>
    </>
  )
}

export default Home
