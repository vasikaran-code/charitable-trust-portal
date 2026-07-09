import { Link } from 'react-router-dom'
import { site } from '../../data/site'
import { useI18n } from '../../i18n/useI18n'
import './Hero.css'

/** Home page hero with the trust name, tagline, and calls to action. */
export default function Hero() {
  const { t } = useI18n()

  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__text">
          <span className="badge hero__badge">
            {t('hero.badge', { year: site.registration.registeredYear })}
          </span>
          <h1 className="hero__title">
            <span className="hero__title-tamil">{site.nameEnglish}</span>
          </h1>
          <p className="hero__tagline">{t('hero.tagline')}</p>
          <div className="hero__actions">
            <Link to="/programs" className="btn btn--accent">
              {t('hero.ctaPrograms')}
            </Link>
            <Link to="/contact" className="btn btn--outline hero__outline">
              {t('hero.ctaInvolved')}
            </Link>
          </div>
        </div>

        <div className="hero__media">
          <img
            src="/ajbala.png"
            alt="AMMA A J BALA Bridge of Hope Welfare Trust logo"
            width="527"
            height="398"
          />
        </div>
      </div>
    </section>
  )
}
