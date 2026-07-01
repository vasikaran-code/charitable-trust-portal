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
        <div className="footer__about">
          <p className="footer__name">{site.nameTamil}</p>
          <p className="footer__name-en">{site.nameEnglish}</p>
          <p className="footer__intro">{t('hero.tagline')}</p>
          <SocialLinks className="footer__social" />
        </div>

        {/* Quick links */}
        <nav className="footer__col" aria-label="Footer">
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
        <div className="footer__col">
          <h3 className="footer__heading">{t('footer.getInTouch')}</h3>
          <address className="footer__address">
            {site.contact.addressLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>
          <p>
            <a href={site.contact.phoneHref}>{site.contact.phone}</a>
          </p>
          <p>
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </p>
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
