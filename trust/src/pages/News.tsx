import PageHeader from '../components/ui/PageHeader'
import EventCard from '../components/ui/EventCard'
import { events, announcements } from '../data/events'
import { useI18n } from '../i18n/useI18n'
import { localeFor } from '../i18n/config'
import { formatDate } from '../lib/format'
import './News.css'

export default function News() {
  const { t, language } = useI18n()

  // Split events by status and sort by date.
  const byDate = (a: { date: string }, b: { date: string }) =>
    a.date.localeCompare(b.date)

  const upcoming = events
    .filter((event) => event.status === 'upcoming')
    .sort(byDate)
  const completed = events
    .filter((event) => event.status === 'completed')
    .sort((a, b) => byDate(b, a)) // most recent first

  return (
    <>
      <PageHeader title={t('news.pageTitle')} subtitle={t('news.pageSubtitle')} />

      {/* Upcoming events */}
      <section className="section">
        <div className="container">
          <div className="section__head reveal">
            <span className="section__eyebrow">{t('news.upcomingEyebrow')}</span>
            <h2 className="section__title">{t('news.upcomingTitle')}</h2>
          </div>
          {upcoming.length > 0 ? (
            <div className="grid reveal" style={{ '--min': '300px' } as React.CSSProperties}>
              {upcoming.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          ) : (
            <p className="news-empty">{t('news.emptyUpcoming')}</p>
          )}
        </div>
      </section>

      {/* Announcements */}
      <section className="section section--surface">
        <div className="container">
          <div className="section__head reveal">
            <span className="section__eyebrow">{t('news.announcementsEyebrow')}</span>
            <h2 className="section__title">{t('news.announcementsTitle')}</h2>
          </div>
          <ul className="news-announcements reveal">
            {announcements.map((item) => (
              <li key={item.id} className="card news-announcement">
                <time className="news-announcement__date" dateTime={item.date}>
                  {formatDate(item.date, localeFor(language))}
                </time>
                <div>
                  <h3 className="news-announcement__title">
                    {t(`news.announcements.${item.id}.title`)}
                  </h3>
                  <p>{t(`news.announcements.${item.id}.text`)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Completed events */}
      <section className="section">
        <div className="container">
          <div className="section__head reveal">
            <span className="section__eyebrow">{t('news.completedEyebrow')}</span>
            <h2 className="section__title">{t('news.completedTitle')}</h2>
          </div>
          <div className="grid" style={{ '--min': '300px' } as React.CSSProperties}>
            {completed.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
