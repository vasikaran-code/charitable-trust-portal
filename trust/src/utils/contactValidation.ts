/**
 * Contact-form validation, composed from the generic rules in validators.ts.
 *
 * Keeping the contact-specific rules here means validators.ts stays reusable
 * for any future form (e.g. the donation form).
 */

import type { ContactForm } from '../types/contact'
import type { FormFieldErrors } from '../types/form'
import {
  MAX_LENGTH,
  firstError,
  isRequired,
  isValidEmail,
  isValidPhone,
  isWithinLength,
} from './validators'

/**
 * Validate a whole contact form.
 *
 * Returns a map of field → i18n key. An empty object means the form is valid.
 * `subject` is optional, so it is only length-checked.
 */
export function validateContactForm(form: ContactForm): FormFieldErrors {
  const errors: FormFieldErrors = {}

  const name = firstError(isRequired(form.name), isWithinLength(form.name, MAX_LENGTH.name))
  if (name) errors.name = name

  const email = firstError(
    isRequired(form.email),
    isValidEmail(form.email),
    isWithinLength(form.email, MAX_LENGTH.email),
  )
  if (email) errors.email = email

  const phone = firstError(
    isRequired(form.phone),
    isValidPhone(form.phone),
    isWithinLength(form.phone, MAX_LENGTH.phone),
  )
  if (phone) errors.phone = phone

  const subject = isWithinLength(form.subject, MAX_LENGTH.subject)
  if (subject) errors.subject = subject

  const message = firstError(
    isRequired(form.message),
    isWithinLength(form.message, MAX_LENGTH.message),
  )
  if (message) errors.message = message

  return errors
}

/** True when `validateContactForm` found nothing to complain about. */
export function isContactFormValid(errors: FormFieldErrors): boolean {
  return Object.keys(errors).length === 0
}
