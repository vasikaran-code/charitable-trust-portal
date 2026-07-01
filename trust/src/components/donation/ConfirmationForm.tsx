import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import {
  donationCategories,
  paymentMethods,
} from '../../data/donation'
import {
  addDonation,
  MAX_SCREENSHOT_BYTES,
  type DonationInput,
} from '../../lib/donations'
import { useI18n } from '../../i18n/useI18n'

/** Today's date as yyyy-mm-dd, used as the default "Donation Date". */
function today(): string {
  return new Date().toISOString().slice(0, 10)
}

const EMPTY = {
  name: '',
  mobile: '',
  email: '',
  amount: '',
  category: '',
  method: '',
  transactionRef: '',
  date: today(),
  notes: '',
}

/**
 * Confirmation form a donor fills in AFTER paying. On submit it validates the
 * inputs, stores the confirmation (see src/lib/donations.ts), and shows the
 * generated reference number.
 *
 * Spam prevention: a hidden "honeypot" field (`website`) that real users never
 * see — if it's filled, a bot submitted the form and we silently ignore it.
 * (Styles live in src/pages/Donate.css.)
 */
export default function ConfirmationForm() {
  const { t } = useI18n()
  const [form, setForm] = useState(EMPTY)
  const [honeypot, setHoneypot] = useState('')
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [fileError, setFileError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [reference, setReference] = useState<string | null>(null)

  const update = (field: keyof typeof EMPTY) => (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    // Clear any custom validity message so the field re-validates cleanly
    // (covers <select>, which does not reliably fire onInput).
    event.target.setCustomValidity('')
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  // Read the chosen screenshot into a data URL after validating type & size.
  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    setFileError('')
    const file = event.target.files?.[0]
    if (!file) {
      setScreenshot(null)
      return
    }
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      setFileError(t('donate.form.validation.fileType'))
      event.target.value = ''
      return
    }
    if (file.size > MAX_SCREENSHOT_BYTES) {
      setFileError(t('donate.form.validation.fileSize'))
      event.target.value = ''
      return
    }
    const reader = new FileReader()
    reader.onload = () => setScreenshot(reader.result as string)
    reader.readAsDataURL(file)
  }

  const removeScreenshot = () => {
    setScreenshot(null)
    setFileError('')
  }

  // Translated messages for the browser's built-in field validation.
  const showValidation = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const field = event.currentTarget
    if (field.validity.valueMissing) {
      field.setCustomValidity(t('donate.form.validation.required'))
    } else if (field.validity.typeMismatch && field.type === 'email') {
      field.setCustomValidity(t('donate.form.validation.email'))
    } else if (field.validity.patternMismatch && field.name === 'mobile') {
      field.setCustomValidity(t('donate.form.validation.mobile'))
    } else if (field.validity.rangeUnderflow && field.name === 'amount') {
      field.setCustomValidity(t('donate.form.validation.amount'))
    } else {
      field.setCustomValidity('')
    }
  }
  const clearValidation = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>,
  ) => event.currentTarget.setCustomValidity('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Honeypot filled → treated as spam. Show success but store nothing.
    if (honeypot.trim() !== '') {
      setReference('SPAM-IGNORED')
      return
    }
    setSubmitting(true)

    // Trim text inputs so stray whitespace isn't stored.
    const input: DonationInput = {
      name: form.name.trim(),
      mobile: form.mobile.trim(),
      email: form.email.trim(),
      amount: form.amount.trim(),
      category: form.category,
      method: form.method as DonationInput['method'],
      transactionRef: form.transactionRef.trim(),
      date: form.date,
      notes: form.notes.trim(),
      screenshot,
    }

    // Brief delay so the pending state is visible (there is no backend yet).
    window.setTimeout(() => {
      const saved = addDonation(input)
      setSubmitting(false)
      setReference(saved.reference)
    }, 500)
  }

  const resetForm = () => {
    setForm({ ...EMPTY, date: today() })
    setScreenshot(null)
    setFileError('')
    setReference(null)
  }

  // Success screen (also shown for silently-ignored spam so bots get no signal).
  if (reference) {
    return (
      <div className="card donate-form-card">
        <div className="donate-success" role="status">
          <span className="donate-success__icon" aria-hidden="true">✓</span>
          <h3>{t('donate.form.successTitle')}</h3>
          <p>{t('donate.form.successText')}</p>
          {reference !== 'SPAM-IGNORED' && (
            <p className="donate-success__ref">
              {t('donate.form.referenceLabel')}
              <strong>{reference}</strong>
            </p>
          )}
          <button type="button" className="btn btn--outline" onClick={resetForm}>
            {t('donate.form.submitAnother')}
          </button>
        </div>
      </div>
    )
  }

  const req = <span aria-label={t('donate.form.required')}>*</span>

  return (
    <div className="card donate-form-card">
      <form className="donate-form" onSubmit={handleSubmit}>
        {/* Honeypot: hidden from users, catches bots. Not shown to screen
            readers and never focusable. */}
        <div className="donate-form__honeypot" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div className="donate-form__row">
          <label htmlFor="d-name">{t('donate.form.name')} {req}</label>
          <input
            id="d-name" name="name" type="text" required autoComplete="name"
            value={form.name} onChange={update('name')}
            onInvalid={showValidation} onInput={clearValidation}
          />
        </div>

        <div className="donate-form__grid">
          <div className="donate-form__row">
            <label htmlFor="d-mobile">{t('donate.form.mobile')} {req}</label>
            <input
              id="d-mobile" name="mobile" type="tel" required
              pattern="[0-9]{10}" inputMode="numeric" autoComplete="tel"
              value={form.mobile} onChange={update('mobile')}
              onInvalid={showValidation} onInput={clearValidation}
            />
          </div>
          <div className="donate-form__row">
            <label htmlFor="d-email">{t('donate.form.email')} {req}</label>
            <input
              id="d-email" name="email" type="email" required autoComplete="email"
              value={form.email} onChange={update('email')}
              onInvalid={showValidation} onInput={clearValidation}
            />
          </div>
        </div>

        <div className="donate-form__grid">
          <div className="donate-form__row">
            <label htmlFor="d-amount">{t('donate.form.amount')} {req}</label>
            <input
              id="d-amount" name="amount" type="number" required min={1} step="1"
              value={form.amount} onChange={update('amount')}
              onInvalid={showValidation} onInput={clearValidation}
            />
          </div>
          <div className="donate-form__row">
            <label htmlFor="d-date">{t('donate.form.date')} {req}</label>
            <input
              id="d-date" name="date" type="date" required max={today()}
              value={form.date} onChange={update('date')}
              onInvalid={showValidation} onInput={clearValidation}
            />
          </div>
        </div>

        <div className="donate-form__grid">
          <div className="donate-form__row">
            <label htmlFor="d-category">{t('donate.form.category')} {req}</label>
            <select
              id="d-category" name="category" required
              value={form.category} onChange={update('category')}
              onInvalid={showValidation} onInput={clearValidation}
            >
              <option value="" disabled>{t('donate.form.chooseCategory')}</option>
              {donationCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {t(`donate.categories.items.${category.id}.title`)}
                </option>
              ))}
            </select>
          </div>
          <div className="donate-form__row">
            <label htmlFor="d-method">{t('donate.form.method')} {req}</label>
            <select
              id="d-method" name="method" required
              value={form.method} onChange={update('method')}
              onInvalid={showValidation} onInput={clearValidation}
            >
              <option value="" disabled>{t('donate.form.chooseMethod')}</option>
              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {t(`donate.methods.${method}`)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="donate-form__row">
          <label htmlFor="d-ref">{t('donate.form.transactionRef')} {req}</label>
          <input
            id="d-ref" name="transactionRef" type="text" required
            value={form.transactionRef} onChange={update('transactionRef')}
            onInvalid={showValidation} onInput={clearValidation}
          />
          <p className="donate-form__hint">{t('donate.form.transactionRefHint')}</p>
        </div>

        <div className="donate-form__row">
          <label htmlFor="d-notes">
            {t('donate.form.notes')}{' '}
            <span className="donate-form__optional">({t('donate.form.notesOptional')})</span>
          </label>
          <textarea
            id="d-notes" name="notes" rows={3}
            placeholder={t('donate.form.notesPlaceholder')}
            value={form.notes} onChange={update('notes')}
          />
        </div>

        <div className="donate-form__row">
          <label htmlFor="d-screenshot">
            {t('donate.form.screenshot')}{' '}
            <span className="donate-form__optional">({t('donate.form.notesOptional')})</span>
          </label>
          <input
            id="d-screenshot" name="screenshot" type="file"
            accept="image/png, image/jpeg" onChange={handleFile}
          />
          <p className="donate-form__hint">{t('donate.form.screenshotHint')}</p>
          {fileError && <p className="donate-form__error" role="alert">{fileError}</p>}
          {screenshot && (
            <div className="donate-form__preview">
              <img src={screenshot} alt="" />
              <button type="button" className="copy-btn" onClick={removeScreenshot}>
                {t('donate.form.removeScreenshot')}
              </button>
            </div>
          )}
        </div>

        <button
          type="submit" className="btn btn--primary"
          disabled={submitting} aria-busy={submitting}
        >
          {submitting ? (
            <>
              <span className="btn-spinner" aria-hidden="true" />
              <span className="sr-only">{t('donate.form.submitting')}</span>
            </>
          ) : (
            t('donate.form.submit')
          )}
        </button>
      </form>
    </div>
  )
}
