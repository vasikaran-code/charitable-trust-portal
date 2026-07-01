import PageHeader from '../components/ui/PageHeader'
import CtaBanner from '../components/ui/CtaBanner'
import { site } from '../data/site'
import { trustees } from '../data/about'
import { useI18n } from '../i18n/useI18n'
import './About.css'

type ValueItem = { title: string; description: string }
type HistoryItem = { year: string; text: string }

export default function About() {
  const { t, tList } = useI18n()
  const { registration } = site

  const values = tList<ValueItem>('about.values')
  const objectives = tList<string>('about.objectives')
  const history = tList<HistoryItem>('about.history')

  return (
    <>
      <PageHeader title={t('about.pageTitle')} subtitle={t('about.pageSubtitle')} />

      {/* Overview */}
      <section className="section">
        <div className="container about-overview reveal">
          <span className="section__eyebrow">{t('about.overviewEyebrow')}</span>
          <h2 className="section__title">{t('about.overviewTitle')}</h2>
          <p className="lead">{t('common.intro')}</p>
          <p>{t('about.overviewBody', { year: registration.registeredYear })}</p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section section--surface">
        <div className="container">
          <div className="grid reveal" style={{ '--min': '320px' } as React.CSSProperties}>
            <div className="card about-mv">
              <h3>{t('common.missionTitle')}</h3>
              <p>{t('about.mission')}</p>
            </div>
            <div className="card about-mv">
              <h3>{t('common.visionTitle')}</h3>
              <p>{t('about.vision')}</p>
            </div>
          </div>

          <h3 className="about-values__heading reveal">{t('about.valuesTitle')}</h3>
          <div className="grid reveal" style={{ '--min': '230px' } as React.CSSProperties}>
            {values.map((value) => (
              <div key={value.title} className="card card--hover about-value">
                <h4>{value.title}</h4>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="section">
        <div className="container">
          <div className="section__head reveal">
            <span className="section__eyebrow">{t('about.objectivesEyebrow')}</span>
            <h2 className="section__title">{t('about.objectivesTitle')}</h2>
          </div>
          <ul className="about-objectives reveal">
            {objectives.map((objective) => (
              <li key={objective}>{objective}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* History timeline */}
      <section className="section section--surface">
        <div className="container">
          <div className="section__head reveal">
            <span className="section__eyebrow">{t('about.historyEyebrow')}</span>
            <h2 className="section__title">{t('about.historyTitle')}</h2>
          </div>
          <ol className="about-timeline reveal">
            {history.map((item) => (
              <li key={item.year} className="about-timeline__item">
                <span className="about-timeline__year">{item.year}</span>
                <p className="about-timeline__text">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Trustees */}
      <section className="section">
        <div className="container">
          <div className="section__head reveal">
            <span className="section__eyebrow">{t('about.trusteesEyebrow')}</span>
            <h2 className="section__title">{t('about.trusteesTitle')}</h2>
          </div>
          <div className="grid reveal" style={{ '--min': '260px' } as React.CSSProperties}>
            {trustees.map((person) => (
              <div key={person.id} className="card card--hover about-trustee">
                <span className="about-trustee__avatar" aria-hidden="true">
                  {person.initials}
                </span>
                <h3 className="about-trustee__name">{person.name}</h3>
                <p className="about-trustee__role">
                  {t(`about.trustees.${person.id}.role`)}
                </p>
                <p className="about-trustee__bio">
                  {t(`about.trustees.${person.id}.bio`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration & legal */}
      <section className="section section--surface">
        <div className="container">
          <div className="section__head reveal">
            <span className="section__eyebrow">{t('about.legalEyebrow')}</span>
            <h2 className="section__title">{t('about.legalTitle')}</h2>
          </div>
          <dl className="about-legal card reveal">
            <div>
              <dt>{t('about.legalLabels.registeredName')}</dt>
              <dd>{registration.registeredName}</dd>
            </div>
            <div>
              <dt>{t('about.legalLabels.registrationNumber')}</dt>
              <dd>{registration.registrationNumber}</dd>
            </div>
            <div>
              <dt>{t('about.legalLabels.pan')}</dt>
              <dd>{registration.panNumber}</dd>
            </div>
            <div>
              <dt>{t('about.legalLabels.section80G')}</dt>
              <dd>{registration.section80G}</dd>
            </div>
            <div>
              <dt>{t('about.legalLabels.registeredSince')}</dt>
              <dd>{registration.registeredYear}</dd>
            </div>
          </dl>
          <p className="about-legal__note">{t('about.legalNote')}</p>
        </div>
      </section>

      <CtaBanner
        title={t('about.ctaTitle')}
        text={t('about.ctaText')}
        buttonLabel={t('common.contactUs')}
        buttonTo="/contact"
      />
    </>
  )
}
