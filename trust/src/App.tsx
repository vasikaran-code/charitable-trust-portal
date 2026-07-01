import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Programs from './pages/Programs'
import Gallery from './pages/Gallery'
import News from './pages/News'
import EventDetail from './pages/EventDetail'
import Contact from './pages/Contact'
import Donate from './pages/Donate'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

/**
 * Application routes.
 *
 * Every page is wrapped in <Layout>, which provides the shared header and
 * footer. To add a new page: create it under src/pages/, then add a <Route>
 * here and a link in src/data/navigation.ts.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<EventDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
