import { useI18n } from '../../i18n/useI18n'

/**
 * Donation page hero: the appeal, the tax-exemption note, and two calls to
 * action that scroll to the payment methods and the confirmation form.
 * (Styles live in src/pages/Donate.css.)
 */
export default function DonationHero() {
  const { t } = useI18n()

  return (
    <section className="donate-hero">
      <div className="container donate-hero__inner reveal">
        <p className="section__eyebrow">{t('donate.hero.eyebrow')}</p>
        <h1 className="donate-hero__title">{t('donate.hero.title')}</h1>
        <p className="donate-hero__text">{t('donate.hero.text')}</p>
        <p className="donate-hero__note">
          <span aria-hidden="true">🧾</span> {t('donate.hero.impactNote')}
        </p>
        <div className="donate-hero__actions">
          <a href="#donate-methods" className="btn btn--primary">
            {t('donate.hero.ctaDonate')}
          </a>
          <a href="#confirm-form" className="btn btn--outline">
            {t('donate.hero.ctaConfirm')}
          </a>
        </div>
      </div>
    </section>
  )
}
