import { stats } from '../../data/stats'
import { useI18n } from '../../i18n/useI18n'
import CountUp from '../ui/CountUp'
import './StatsBar.css'

/** Band of key impact statistics shown on the Home page. */
export default function StatsBar() {
  const { t } = useI18n()

  return (
    <section className="stats-bar">
      <div className="container">
        <ul className="stats-bar__grid">
          {stats.map((stat) => (
            <li key={stat.id} className="stats-bar__item">
              <span className="stats-bar__value">
                <CountUp value={stat.value} />
              </span>
              <span className="stats-bar__label">{t(`stats.items.${stat.id}`)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
