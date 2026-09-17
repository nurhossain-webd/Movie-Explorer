# Movie Explorer

A beginner-friendly React assignment. **Step 4 of 5: search and show details.**

## Run locally

Use Node.js 22.12+ (or a newer supported version).

```sh
npm install
npm run dev
```

Open the local URL printed in your terminal.

```sh
npm run lint     # Check JavaScript and JSX
npm run build    # Create a production build in dist/
npm run preview  # Serve the production build locally
```

## Stack

- React with JavaScript and Vite
- React Router for page navigation
- Tailwind CSS with the Vite plugin

## Structure

```text
src/
  components/
    Navbar.jsx    # Shared brand and active navigation links
    Footer.jsx    # Shared responsive footer
    MovieCard.jsx # Poster, title, rating, year, and details button
    MovieDetailsModal.jsx # Accessible native dialog and plain-text overview
  pages/
    Home.jsx      # Responsive Discover Movies hero
    Movies.jsx    # Search, API states, responsive grid, and selected show
  App.jsx         # Global layout and routes
  main.jsx        # React entry point and BrowserRouter
  index.css       # Tailwind import and global styles
```

## Routes

| URL | Page |
| --- | --- |
| `/` | Home |
| `/movies` | Movies |

The layout includes visible keyboard focus, a skip-to-content link, and responsive
navigation. The Home page fills the available space with a dark cinema-style
gradient hero and an Explore Now link to `/movies`.

The Movies page fetches [TVMaze shows](https://api.tvmaze.com/shows) when mounted
using `useEffect`, `useState`, and the browser's built-in `fetch`. A failed request
shows a friendly message and a retry button; requests are cancelled when leaving
the page. Loading and empty states are also included.

Cards use a 1/2/3/4-column responsive grid. Missing ratings and premiere dates
display `N/A`; missing or broken posters display a local placeholder.
TVMaze provides TV show data despite the assignment's Movie Explorer name.

Search uses `/search/shows?q=<encoded query>` after a 350 ms pause in typing.
Search results are normalized from `{ score, show }` objects, and outdated
requests are cancelled so old results cannot replace a newer search. Clearing
the input restores the collection cached for the current page visit. Empty
results and failed searches have helpful messages, and failures can be retried.

See Details opens a reusable native `<dialog>` using the already-fetched show
data. It includes the poster, overview, rating, premiere date, genres, language,
status, episode length, and network, with fallbacks for missing values. HTML
summaries are parsed in an inert template and rendered only as plain text.

The modal supports its close buttons, Escape, and backdrop clicks. Keyboard focus
stays inside and returns to the opening card when closed; background scrolling is
locked while the modal is open. Its contents scroll within the screen on mobile.
No additional dependencies or later assignment steps are included.

If deployed to a static host later, configure all page URLs to serve `index.html`
so React Router works when a page such as `/movies` is opened directly.
