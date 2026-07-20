import { useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import PageHeader from '../components/ui/PageHeader'
import SocialLinks from '../components/ui/SocialLinks'
import { site } from '../data/site'
import { useI18n } from '../i18n/useI18n'
import { submitContactForm } from '../services/contactService'
import { EMPTY_CONTACT_FORM } from '../types/contact'
import type { ContactForm } from '../types/contact'
import type { FormError } from '../types/form'
import { isContactFormValid, validateContactForm } from '../utils/contactValidation'
import { validationError } from '../utils/errors'
import './Contact.css'

export default function Contact() {
  const { t } = useI18n()
  // Controlled fields, so the submit handler always has the current values
  // (and so we can clear the form after a successful send).
  const [form, setForm] = useState<ContactForm>(EMPTY_CONTACT_FORM)
  // True once the enquiry has been stored, so we swap in the thank-you panel.
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  // Set when a submission fails, cleared when the visitor tries again.
  const [error, setError] = useState<FormError | null>(null)
  // Guards against a second submit slipping through before `submitting` has
  // re-rendered the disabled button (e.g. a fast double click or Enter twice).
  const sending = useRef(false)

  const update =
    (field: keyof ContactForm) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.currentTarget
      setForm((current) => ({ ...current, [field]: value }))
    }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (sending.current) return

    // Re-check on our side too: the browser's native validation runs first, but
    // this also enforces the length caps and trims away whitespace-only input.
    const fieldErrors = validateContactForm(form)
    if (!isContactFormValid(fieldErrors)) {
      setError(validationError(fieldErrors))
      return
    }

    sending.current = true
    setError(null)
    setSubmitting(true)

    const result = await submitContactForm(form)

    sending.current = false
    setSubmitting(false)

    if (result.ok) {
      setSubmitted(true)
      setForm(EMPTY_CONTACT_FORM)
    } else {
      setError(result.error)
    }
  }

  // Show a translated validation message when a field is invalid, and clear it
  // again as soon as the visitor edits the field (so it re-validates cleanly).
  const showValidation = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = event.currentTarget
    if (field.validity.valueMissing) {
      field.setCustomValidity(t('forms.validation.required'))
    } else if (field.validity.typeMismatch) {
      field.setCustomValidity(t('forms.validation.email'))
    } else if (field.validity.patternMismatch) {
      field.setCustomValidity(t('forms.validation.phone'))
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
          <div className="contact-info reveal reveal--left">
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
          <div className="card contact-form-card reveal reveal--right">
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
                    value={form.name}
                    onChange={update('name')}
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
                    value={form.email}
                    onChange={update('email')}
                    onInvalid={showValidation}
                    onInput={clearValidation}
                  />
                </div>
                <div className="contact-form__row">
                  <label htmlFor="phone">
                    {t('contact.formPhone')}{' '}
                    <span aria-label={t('contact.requiredField')}>*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    pattern="[0-9+()\-\s]{7,}"
                    value={form.phone}
                    onChange={update('phone')}
                    onInvalid={showValidation}
                    onInput={clearValidation}
                  />
                </div>
                <div className="contact-form__row">
                  <label htmlFor="subject">{t('contact.formSubject')}</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={update('subject')}
                  />
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
                    value={form.message}
                    onChange={update('message')}
                    onInvalid={showValidation}
                    onInput={clearValidation}
                  />
                </div>
                {/* Only rendered when a submission fails (never in Phase 1). */}
                {error && (
                  <p className="contact-form__error" role="alert">
                    {t(error.messageKey)}
                  </p>
                )}
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
