import { useState } from 'react'
import type { FormEvent } from 'react'
import PageHeader from '../components/ui/PageHeader'
import SocialLinks from '../components/ui/SocialLinks'
import { site } from '../data/site'
import { useI18n } from '../i18n/useI18n'
import './Contact.css'

export default function Contact() {
  const { t } = useI18n()
  // Track whether the form was submitted so we can show a thank-you message.
  // NOTE: there is no backend in Phase 1 — submitting just shows a confirmation.
  // To make it live, send the form data to an email service or API here.
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Briefly show a loading state, then the success message. There is no
    // backend in Phase 1 — replace this timeout with a real request later.
    setSubmitting(true)
    window.setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 700)
  }

  // Show a translated validation message when a field is invalid, and clear it
  // again as soon as the visitor edits the field (so it re-validates cleanly).
  const showValidation = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = event.currentTarget
    if (field.validity.valueMissing) {
      field.setCustomValidity(t('contact.validation.required'))
    } else if (field.validity.typeMismatch) {
      field.setCustomValidity(t('contact.validation.email'))
    } else {
      field.setCustomValidity('')
    }
  }
  const clearValidation = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => event.currentTarget.setCustomValidity('')

  return (
    <>
      <PageHeader title={t('contact.pageTitle')} subtitle={t('contact.pageSubtitle')} />

      <section className="section">
        <div className="container contact-grid">
          {/* Contact details */}
          <div className="contact-info reveal">
            <h2>{t('contact.infoTitle')}</h2>
            <p className="lead">{t('contact.infoLead')}</p>

            <ul className="contact-info__list">
              <li>
                <span className="contact-info__icon" aria-hidden="true">📍</span>
                <div>
                  <strong>{t('contact.labelAddress')}</strong>
                  <address>
                    {site.contact.addressLines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </address>
                </div>
              </li>
              <li>
                <span className="contact-info__icon" aria-hidden="true">📞</span>
                <div>
                  <strong>{t('contact.labelPhone')}</strong>
                  <a href={site.contact.phoneHref}>{site.contact.phone}</a>
                </div>
              </li>
              <li>
                <span className="contact-info__icon" aria-hidden="true">✉️</span>
                <div>
                  <strong>{t('contact.labelEmail')}</strong>
                  <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
                </div>
              </li>
            </ul>

            <div className="contact-info__social">
              <strong>{t('common.followUs')}</strong>
              <SocialLinks className="contact-info__social-links" />
            </div>
          </div>

          {/* Contact form */}
          <div className="card contact-form-card reveal">
            {submitted ? (
              <div className="contact-success" role="status">
                <span className="contact-success__icon" aria-hidden="true">✓</span>
                <h3>{t('contact.successTitle')}</h3>
                <p>{t('contact.successText')}</p>
                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={() => setSubmitted(false)}
                >
                  {t('contact.sendAnother')}
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate={false}>
                <div className="contact-form__row">
                  <label htmlFor="name">
                    {t('contact.formName')}{' '}
                    <span aria-label={t('contact.requiredField')}>*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    onInvalid={showValidation}
                    onInput={clearValidation}
                  />
                </div>
                <div className="contact-form__row">
                  <label htmlFor="email">
                    {t('contact.formEmail')}{' '}
                    <span aria-label={t('contact.requiredField')}>*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    onInvalid={showValidation}
                    onInput={clearValidation}
                  />
                </div>
                <div className="contact-form__row">
                  <label htmlFor="subject">{t('contact.formSubject')}</label>
                  <input id="subject" name="subject" type="text" />
                </div>
                <div className="contact-form__row">
                  <label htmlFor="message">
                    {t('contact.formMessage')}{' '}
                    <span aria-label={t('contact.requiredField')}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    onInvalid={showValidation}
                    onInput={clearValidation}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={submitting}
                  aria-busy={submitting}
                >
                  {submitting ? (
                    <>
                      <span className="btn-spinner" aria-hidden="true" />
                      <span className="sr-only">{t('contact.send')}</span>
                    </>
                  ) : (
                    t('contact.send')
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="contact-map">
        <h2 className="sr-only">{t('contact.mapTitle')}</h2>
        <iframe
          title={t('contact.mapIframeTitle')}
          src={site.contact.mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>
    </>
  )
}
