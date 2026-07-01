import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useI18n } from '../../i18n/useI18n'
import './Layout.css'

/**
 * App shell: header + page content + footer.
 *
 * `Outlet` renders whichever page matches the current route. On every route
 * change we (1) jump back to the top of the page and (2) wire up the scroll
 * reveal: any element with the `reveal` class fades/slides in once it scrolls
 * into view. Centralising the observer here keeps page code declarative —
 * components just add `className="reveal"`.
 */
export default function Layout() {
  const { pathname } = useLocation()
  const { t } = useI18n()

  useEffect(() => {
    window.scrollTo(0, 0)

    const elements = document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)')

    // No IntersectionObserver (very old browsers): show everything immediately.
    if (typeof IntersectionObserver === 'undefined') {
      elements.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            obs.unobserve(entry.target) // reveal once, then stop watching
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  return (
    <div className="layout">
      <a href="#main" className="skip-link">
        {t('common.skipToContent')}
      </a>
      <Header />
      <main id="main" className="layout__main">
        {/* `key` re-mounts the page on navigation so the fade-in replays. */}
        <div key={pathname} className="page-transition">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
