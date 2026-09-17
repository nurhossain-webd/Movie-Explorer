# Movie Explorer

A beginner-friendly React assignment. **Step 1 of 5: foundation and layout.**

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
  pages/
    Home.jsx      # Welcome page
    Movies.jsx    # Collection placeholder
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
navigation. The Movies page intentionally displays a coming-soon message.

API fetching, movie cards, search, and modals are reserved for later steps.
The planned API is [TVMaze](https://api.tvmaze.com); it supplies TV show data.
No API connection is implemented in Step 1.

If deployed to a static host later, configure all page URLs to serve `index.html`
so React Router works when a page such as `/movies` is opened directly.
