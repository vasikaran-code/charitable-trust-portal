import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/useI18n'
import './NotFound.css'

export default function NotFound() {
  const { t } = useI18n()

  return (
    <section className="not-found">
      <div className="container">
        <p className="not-found__code">404</p>
        <h1 className="not-found__title">{t('notFound.title')}</h1>
        <p className="not-found__text">{t('notFound.text')}</p>
        <Link to="/" className="btn btn--primary">
          {t('common.backToHome')}
        </Link>
      </div>
    </section>
  )
}
