import { Link, useParams } from 'react-router-dom'
import { events } from '../data/events'
import { useI18n } from '../i18n/useI18n'
import { localeFor } from '../i18n/config'
import { formatDate } from '../lib/format'
import NotFound from './NotFound'
import './EventDetail.css'

export default function EventDetail() {
  const { t, tList, language } = useI18n()
  // The :slug part of the URL (/news/:slug) identifies the event.
  const { slug } = useParams()
  const event = events.find((item) => item.slug === slug)

  // Unknown slug → show the 404 page.
  if (!event) return <NotFound />

  const base = `events.items.${event.slug}`
  const details = tList<string>(`${base}.details`)

  return (
    <article className="event-detail">
      <header className="event-detail__header">
        <div className="container">
          <Link to="/news" className="event-detail__back">
            ← {t('common.backToNews')}
          </Link>
          <span
            className={`badge ${event.status === 'upcoming' ? '' : 'badge--accent'}`}
          >
            {event.status === 'upcoming'
              ? t('news.statusUpcoming')
              : t('news.statusCompleted')}
          </span>
          <h1 className="event-detail__title">{t(`${base}.title`)}</h1>
          <ul className="event-detail__meta">
            <li>
              📅{' '}
              <time dateTime={event.date}>
                {formatDate(event.date, localeFor(language))}
              </time>
            </li>
            <li>📍 {t(`${base}.location`)}</li>
          </ul>
        </div>
      </header>

      <div className="container event-detail__body reveal">
        {details.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        <div className="event-detail__cta card">
          <p>
            {event.status === 'upcoming'
              ? t('eventDetail.attendUpcoming')
              : t('eventDetail.attendCompleted')}
          </p>
          <Link to="/contact" className="btn btn--primary">
            {t('common.contactUs')}
          </Link>
        </div>
      </div>
    </article>
  )
}
