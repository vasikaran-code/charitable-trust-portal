import { donation, buildUpiLink } from '../../data/donation'
import { useI18n } from '../../i18n/useI18n'
import CopyButton from '../ui/CopyButton'

/**
 * UPI donation section: shows the UPI ID with a copy button and a "Pay via UPI
 * app" link (a upi:// deep link that opens the donor's UPI app on mobile).
 * (Styles live in src/pages/Donate.css.)
 */
export default function UpiSection() {
  const { t, tList } = useI18n()

  return (
    <div className="card donate-method">
      <p className="section__eyebrow">{t('donate.upi.eyebrow')}</p>
      <h3 className="donate-method__title">{t('donate.upi.title')}</h3>
      <p className="donate-method__subtitle">{t('donate.upi.subtitle')}</p>

      <div className="donate-detail">
        <span className="donate-detail__label">{t('donate.upi.idLabel')}</span>
        <span className="donate-detail__value">{donation.upiId}</span>
      </div>

      <div className="donate-method__actions">
        <CopyButton value={donation.upiId} label={t('donate.upi.copyId')} />
        <a href={buildUpiLink()} className="btn btn--primary donate-method__pay">
          {t('donate.upi.payViaUpi')}
        </a>
      </div>
      <p className="donate-method__hint">{t('donate.upi.appNote')}</p>

      <h4 className="donate-method__how">{t('donate.upi.instructionsTitle')}</h4>
      <ol className="donate-method__steps">
        {tList<string>('donate.upi.instructions').map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  )
}
