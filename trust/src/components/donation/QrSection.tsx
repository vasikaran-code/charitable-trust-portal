import { donation } from '../../data/donation'
import { useI18n } from '../../i18n/useI18n'

/**
 * QR code donation section: a large, responsive QR image with a download link
 * and step-by-step instructions. To change the code, replace the image file
 * referenced by `donation.qrImage` (see src/data/donation.ts).
 * (Styles live in src/pages/Donate.css.)
 */
export default function QrSection() {
  const { t, tList } = useI18n()

  return (
    <div className="card donate-method">
      <p className="section__eyebrow">{t('donate.qr.eyebrow')}</p>
      <h3 className="donate-method__title">{t('donate.qr.title')}</h3>
      <p className="donate-method__subtitle">{t('donate.qr.subtitle')}</p>

      <div className="donate-qr">
        <img
          className="donate-qr__image"
          src={donation.qrImage}
          alt={t('donate.qr.alt')}
          width={512}
          height={512}
        />
      </div>

      <div className="donate-method__actions">
        {/* `download` prompts a save instead of navigating to the image. */}
        <a href={donation.qrImage} download className="btn btn--outline">
          {t('donate.qr.download')}
        </a>
      </div>

      <ol className="donate-method__steps">
        {tList<string>('donate.qr.instructions').map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  )
}
