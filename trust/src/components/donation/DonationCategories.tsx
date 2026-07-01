import { donationCategories } from '../../data/donation'
import { useI18n } from '../../i18n/useI18n'

/**
 * Grid of donation causes (Education, Medical, Food…). Content-driven: to add
 * a cause, edit `donationCategories` in src/data/donation.ts and add its text
 * to the locale files under `donate.categories.items.<id>`.
 * (Styles live in src/pages/Donate.css.)
 */
export default function DonationCategories() {
  const { t } = useI18n()

  return (
    <section className="section section--surface">
      <div className="container">
        <div className="section__head reveal">
          <p className="section__eyebrow">{t('donate.categories.eyebrow')}</p>
          <h2 className="section__title">{t('donate.categories.title')}</h2>
          <p className="section__subtitle">{t('donate.categories.subtitle')}</p>
        </div>

        <div className="grid reveal" style={{ '--min': '260px' } as React.CSSProperties}>
          {donationCategories.map((category) => (
            <div key={category.id} className="card donate-cause">
              <span className="donate-cause__icon" aria-hidden="true">
                {category.icon}
              </span>
              <h3 className="donate-cause__title">
                {t(`donate.categories.items.${category.id}.title`)}
              </h3>
              <p className="donate-cause__text">
                {t(`donate.categories.items.${category.id}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
