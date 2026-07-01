import { transparencyStats } from '../../data/donation'
import { useI18n } from '../../i18n/useI18n'
import CountUp from '../ui/CountUp'

/**
 * Public transparency section: total donations, beneficiaries helped, and
 * active programs. Numbers live in `transparencyStats` (src/data/donation.ts);
 * no individual donor information is ever shown here.
 * (Styles live in src/pages/Donate.css.)
 */
export default function TransparencySection() {
  const { t } = useI18n()

  return (
    <section className="section">
      <div className="container">
        <div className="section__head reveal">
          <p className="section__eyebrow">{t('donate.transparency.eyebrow')}</p>
          <h2 className="section__title">{t('donate.transparency.title')}</h2>
          <p className="section__subtitle">{t('donate.transparency.subtitle')}</p>
        </div>

        <ul className="donate-transparency reveal">
          {transparencyStats.map((stat) => (
            <li key={stat.id} className="donate-transparency__item">
              <span className="donate-transparency__value">
                <CountUp value={stat.value} />
              </span>
              <span className="donate-transparency__label">
                {t(`donate.transparency.items.${stat.id}`)}
              </span>
            </li>
          ))}
        </ul>

        <p className="donate-transparency__note reveal">
          {t('donate.transparency.note')}
        </p>
      </div>
    </section>
  )
}
