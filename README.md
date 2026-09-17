# Movie Explorer

A responsive React assignment for discovering TV shows, searching by title, and
reading show details. Built with JavaScript and a dark cinema-inspired design.
The five assignment steps are complete.

## Submission links

- **Live site:** `<YOUR_VERCEL_LIVE_URL>`
- **GitHub repository:** `<YOUR_GITHUB_REPOSITORY_URL>`

Replace these placeholders with your published URLs before submitting.

## Features

- Home page with a branded navbar, hero banner, Explore Now link, and footer.
- Movies page with live TVMaze data and a responsive 1–4-column grid.
- Reusable cards with posters, titles, ratings, premiere years, and See Details.
- Title search with a 350 ms typing delay and cancellation of outdated requests.
- Clearing search restores the cached collection for the current page visit.
- Pagination with 20 shows per page, result ranges, and Previous/Next controls.
- Loading, retryable error, and empty-result states.
- Missing ratings/dates display `N/A`; absent or broken images use placeholders.
- A scrollable details modal with a large poster, plain-text overview, rating,
  premiere date, genres, language, status, episode length, and network.
- Close buttons, Escape and backdrop closing, keyboard focus containment and
  restoration, background scroll locking, and visible focus styles.
- Mobile, tablet, and desktop layouts, descriptive image alt text, and support
  for reduced-motion preferences.

## Technologies

- React 19 with JavaScript/JSX
- React Router 7
- Tailwind CSS 4
- Vite 8
- Oxlint for JavaScript/JSX checks
- Browser Fetch API and native HTML dialog; no state-management or modal library

## TVMaze API

Base URL: `https://api.tvmaze.com`

| Purpose | Endpoint | Response |
| --- | --- | --- |
| Initial collection | `GET /shows` | Array of show objects |
| Title search | `GET /search/shows?q=<encoded query>` | Array of `{ score, show }` objects |

Search results are normalized before rendering. Details reuse the selected show
rather than making another request. HTML summaries are parsed in an inert
HTML template and rendered only as plain text through React.

TVMaze supplies **TV show data**, despite the assignment's Movie Explorer name.
The initial collection uses the first API index page. The app's 20-item pagination
splits those fetched results; title searches query TVMaze's wider catalog.

No API key, backend, or environment variables are required. Internet access is
needed to load shows and posters. Data and images are provided by TVMaze; see
[TVMaze API documentation and attribution information](https://www.tvmaze.com/api).

## Installation and local development

Install Node.js 22.12 or newer, then open a terminal in the project folder:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Keep the terminal running while developing.
For a reproducible install using the committed lockfile, use `npm ci` in place
of `npm install`.

## Build and checks

```sh
npm run lint
npm run build
npm run preview
```

The build writes production files to `dist/`. The preview command serves that
build locally; it is not the production hosting service.

For a final manual check, open both routes, follow the navbar and Explore Now
links, search and clear a title, paginate results, and open/close details using
buttons, Escape, and the backdrop. Also check small screens, keyboard navigation,
and the error message with the API request blocked in browser developer tools.

## Project structure

```text
public/
  favicon.svg
src/
  components/
    Navbar.jsx             # Brand and active navigation
    Footer.jsx             # Footer and copyright
    MovieCard.jsx          # Reusable listing card
    MovieDetailsModal.jsx  # Accessible show details and safe summary text
  pages/
    Home.jsx               # Discover Movies hero
    Movies.jsx             # Fetching, search, pagination, and selected show
  App.jsx                  # Shared layout and routes
  main.jsx                 # React entry point and BrowserRouter
  index.css                # Tailwind and global styles
index.html
vite.config.js
vercel.json                # Vercel build settings and SPA route fallback
.oxlintrc.json
package.json
package-lock.json
```

## Routes

| URL | Page |
| --- | --- |
| `/` | Home |
| `/movies` | Movies, search, and details modal |

## Deploy to Vercel

1. Push this project, including `package-lock.json` and `vercel.json`, to GitHub.
2. Import the repository into Vercel and select this project folder as the root.
3. Use the **Vite** framework preset, `npm run build` as the build command, and
   `dist` as the output directory. Select a supported Node.js version compatible
   with the installation requirement above. No environment variables are needed.
4. Deploy, then verify both `/` and `/movies`, including refreshing `/movies`.
5. Replace the submission link placeholders above with the live and repository URLs.

The included rewrite serves `index.html` for React Router routes so direct links
and refreshes work on Vercel. See the official
[Vite deployment guide](https://vercel.com/docs/frameworks/frontend/vite#using-vite-to-make-spas).
