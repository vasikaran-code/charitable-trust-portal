import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navLinks } from '../../data/navigation'
import { site } from '../../data/site'
import { useI18n } from '../../i18n/useI18n'
import LanguageSelector from '../ui/LanguageSelector'
import './Header.css'

/**
 * Sticky site header with a responsive navigation menu and language selector.
 * On small screens the links collapse into a toggle ("hamburger") menu, while
 * the language selector stays visible.
 */
export default function Header() {
  const { t } = useI18n()
  const [menuOpen, setMenuOpen] = useState(false)
  // Becomes true once the page is scrolled, so we can add a shadow and slightly
  // shrink the header for clearer separation from the content below.
  const [scrolled, setScrolled] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll() // set the correct state on first render (e.g. deep links)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container header__inner">
        {/* Brand / logo — the bilingual wordmark is the trust's fixed identity. */}
        <Link to="/" className="header__brand" onClick={closeMenu}>
          <img src="/favicon.svg" alt="" className="header__logo" width="40" height="40" />
          <span className="header__brand-text">
            <span className="header__brand-tamil">{site.nameTamil}</span>
            <span className="header__brand-en">{site.nameEnglish}</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav
          id="primary-navigation"
          className={`header__nav ${menuOpen ? 'is-open' : ''}`}
          aria-label="Primary"
        >
          <ul className="header__links">
            {navLinks.map((link) =>
              // The Donate link is highlighted as a prominent button; the rest
              // render as normal text links.
              link.key === 'donate' ? (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className="btn btn--accent header__cta"
                    onClick={closeMenu}
                  >
                    {t('nav.donate')}
                  </NavLink>
                </li>
              ) : (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `header__link ${isActive ? 'is-active' : ''}`
                    }
                    onClick={closeMenu}
                    end={link.path === '/'}
                  >
                    {t(`nav.${link.key}`)}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        {/* Controls: language selector (always visible) + mobile menu toggle */}
        <div className="header__controls">
          <LanguageSelector />
          <button
            type="button"
            className="header__toggle"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">{t('common.toggleMenu')}</span>
            <span className={`header__bars ${menuOpen ? 'is-open' : ''}`} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}
