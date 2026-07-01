import { Link } from 'react-router-dom'
import Hero from '../components/home/Hero'
import StatsBar from '../components/home/StatsBar'
import ProgramCard from '../components/ui/ProgramCard'
import CtaBanner from '../components/ui/CtaBanner'
import { programs } from '../data/programs'
import { announcements } from '../data/events'
import { useI18n } from '../i18n/useI18n'
import { localeFor } from '../i18n/config'
import { formatDate } from '../lib/format'
import './Home.css'

export default function Home() {
  const { t, language } = useI18n()
  // Feature the first three programs on the home page.
  const featured = programs.slice(0, 3)

  return (
    <>
      <Hero />

      {/* Brief introduction */}
      <section className="section">
        <div className="container home-intro reveal">
          <span className="section__eyebrow">{t('home.introEyebrow')}</span>
          <h2 className="section__title">{t('common.intro')}</h2>
          <p className="lead">{t('home.introLead')}</p>
          <Link to="/about" className="btn btn--outline">
            {t('common.learnMoreAbout')}
          </Link>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section section--surface">
        <div className="container grid reveal" style={{ '--min': '320px' } as React.CSSProperties}>
          <div className="card home-mv">
            <span className="home-mv__icon" aria-hidden="true">🎯</span>
            <h3>{t('common.missionTitle')}</h3>
            <p>{t('about.mission')}</p>
          </div>
          <div className="card home-mv">
            <span className="home-mv__icon" aria-hidden="true">🌍</span>
            <h3>{t('common.visionTitle')}</h3>
            <p>{t('about.vision')}</p>
          </div>
        </div>
      </section>

      {/* Impact statistics */}
      <StatsBar />

      {/* Featured programs */}
      <section className="section">
        <div className="container">
          <div className="section__head reveal">
            <span className="section__eyebrow">{t('home.featuredEyebrow')}</span>
            <h2 className="section__title">{t('home.featuredTitle')}</h2>
            <p className="section__subtitle">{t('home.featuredSubtitle')}</p>
          </div>
          <div className="grid reveal" style={{ '--min': '300px' } as React.CSSProperties}>
            {featured.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
          <div className="home-center">
            <Link to="/programs" className="btn btn--primary">
              {t('common.viewAllPrograms')}
            </Link>
          </div>
        </div>
      </section>

      {/* Recent updates */}
      <section className="section section--surface">
        <div className="container">
          <div className="section__head reveal">
            <span className="section__eyebrow">{t('home.updatesEyebrow')}</span>
            <h2 className="section__title">{t('home.updatesTitle')}</h2>
          </div>
          <ul className="home-updates reveal">
            {announcements.map((item) => (
              <li key={item.id} className="card home-update">
                <time className="home-update__date" dateTime={item.date}>
                  {formatDate(item.date, localeFor(language))}
                </time>
                <h3 className="home-update__title">
                  {t(`news.announcements.${item.id}.title`)}
                </h3>
                <p>{t(`news.announcements.${item.id}.text`)}</p>
              </li>
            ))}
          </ul>
          <div className="home-center">
            <Link to="/news" className="btn btn--outline">
              {t('common.seeNews')}
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner
        title={t('home.ctaTitle')}
        text={t('home.ctaText')}
        buttonLabel={t('common.getInTouch')}
        buttonTo="/contact"
      />
    </>
  )
}
