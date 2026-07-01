import DonationHero from '../components/donation/DonationHero'
import DonationCategories from '../components/donation/DonationCategories'
import UpiSection from '../components/donation/UpiSection'
import QrSection from '../components/donation/QrSection'
import BankSection from '../components/donation/BankSection'
import ConfirmationForm from '../components/donation/ConfirmationForm'
import TransparencySection from '../components/donation/TransparencySection'
import { useI18n } from '../i18n/useI18n'
import './Donate.css'

/**
 * Donation page. Each section is its own small component in
 * src/components/donation/ so this file just describes the page's structure:
 *
 *   Hero → Causes → Ways to give (UPI / QR / Bank) → Confirmation form →
 *   Public transparency figures.
 */
export default function Donate() {
  const { t } = useI18n()

  return (
    <>
      <DonationHero />
      <DonationCategories />

      {/* Ways to give */}
      <section id="donate-methods" className="section">
        <div className="container">
          <div className="section__head reveal">
            <p className="section__eyebrow">{t('donate.upi.eyebrow')}</p>
            <h2 className="section__title">{t('donate.pageTitle')}</h2>
          </div>
          <div
            className="grid donate-methods reveal"
            style={{ '--min': '340px' } as React.CSSProperties}
          >
            <UpiSection />
            <QrSection />
            <BankSection />
          </div>
        </div>
      </section>

      {/* Confirmation form */}
      <section id="confirm-form" className="section section--surface">
        <div className="container donate-confirm">
          <div className="section__head reveal">
            <p className="section__eyebrow">{t('donate.form.eyebrow')}</p>
            <h2 className="section__title">{t('donate.form.title')}</h2>
            <p className="section__subtitle">{t('donate.form.subtitle')}</p>
          </div>
          <div className="reveal">
            <ConfirmationForm />
          </div>
        </div>
      </section>

      <TransparencySection />
    </>
  )
}
