# Movie Explorer

A beginner-friendly React assignment. **Step 3 of 5: TVMaze movie listing.**

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
    MovieCard.jsx # Poster, title, rating, year, and details placeholder
  pages/
    Home.jsx      # Responsive Discover Movies hero
    Movies.jsx    # API fetching, loading/error states, and responsive grid
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

Search and the details modal are reserved for later steps. The See Details
buttons are intentionally disabled until the details interaction is implemented.

If deployed to a static host later, configure all page URLs to serve `index.html`
so React Router works when a page such as `/movies` is opened directly.
