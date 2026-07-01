import { Link } from 'react-router-dom'
import type { TrustEvent } from '../../data/events'
import { useI18n } from '../../i18n/useI18n'
import { localeFor } from '../../i18n/config'
import { formatDate } from '../../lib/format'
import './EventCard.css'

type Props = {
  event: TrustEvent
}

/** Card summarising an event, linking to its detail page. */
export default function EventCard({ event }: Props) {
  const { t, language } = useI18n()
  const base = `events.items.${event.slug}`

  return (
    <article className="card card--hover event-card">
      <div className="event-card__top">
        <span
          className={`badge ${event.status === 'upcoming' ? '' : 'badge--accent'}`}
        >
          {event.status === 'upcoming'
            ? t('news.statusUpcoming')
            : t('news.statusCompleted')}
        </span>
        <time className="event-card__date" dateTime={event.date}>
          {formatDate(event.date, localeFor(language))}
        </time>
      </div>

      <h3 className="event-card__title">{t(`${base}.title`)}</h3>
      <p className="event-card__location">📍 {t(`${base}.location`)}</p>
      <p className="event-card__summary">{t(`${base}.summary`)}</p>

      <Link to={`/news/${event.slug}`} className="event-card__link">
        {t('common.viewDetails')} →
      </Link>
    </article>
  )
}
