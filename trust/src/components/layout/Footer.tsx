import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { navLinks } from '../../data/navigation'
import { site } from '../../data/site'
import { useI18n } from '../../i18n/useI18n'
import SocialLinks from '../ui/SocialLinks'
import './Footer.css'

/** Site footer with quick links, contact details, and social media. */
export default function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__grid">
        {/* About column */}
        <div className="footer__about reveal reveal--up">
          <p className="footer__name">{site.nameEnglish}</p>
          <p className="footer__intro">{t('hero.tagline')}</p>
          <SocialLinks className="footer__social" />
        </div>

        {/* Quick links */}
        <nav
          className="footer__col reveal reveal--up"
          style={{ '--reveal-delay': '90ms' } as CSSProperties}
          aria-label="Footer"
        >
          <h3 className="footer__heading">{t('footer.quickLinks')}</h3>
          <ul>
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path}>{t(`nav.${link.key}`)}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div
          className="footer__col reveal reveal--up"
          style={{ '--reveal-delay': '180ms' } as CSSProperties}
        >
          <h3 className="footer__heading">{t('footer.getInTouch')}</h3>
          <ul className="footer__contact">
            <li className="footer__contact-item">
              <svg
                className="footer__contact-icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 4.4-8 12-8 12s-8-7.6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="2.6" />
              </svg>
              <address className="footer__address">
                {site.contact.addressLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </li>
            <li className="footer__contact-item">
              <svg
                className="footer__contact-icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6.5 3.5H4A1.5 1.5 0 0 0 2.5 5.2C3 14 10 21 18.8 21.5a1.5 1.5 0 0 0 1.7-1.5v-2.5a1.5 1.5 0 0 0-1.2-1.5l-2.7-.5a1.5 1.5 0 0 0-1.5.6l-.7.9a12 12 0 0 1-5.4-5.4l.9-.7a1.5 1.5 0 0 0 .6-1.5l-.5-2.7A1.5 1.5 0 0 0 6.5 3.5Z" />
              </svg>
              <a href={site.contact.phoneHref}>{site.contact.phone}</a>
            </li>
            <li className="footer__contact-item">
              <svg
                className="footer__contact-icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m4 7 8 5.5L20 7" />
              </svg>
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bar">
        <div className="container footer__bar-inner">
          <p>{t('footer.rights', { year, name: site.nameEnglish })}</p>
          <p>{t('footer.regNo', { number: site.registration.registrationNumber })}</p>
        </div>
      </div>
    </footer>
  )
}
