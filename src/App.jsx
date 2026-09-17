import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Movies from './pages/Movies'

function App() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-amber-300 focus:px-5 focus:py-3 focus:text-zinc-950"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
