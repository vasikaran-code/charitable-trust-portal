/**
 * Generic, form-agnostic validation rules.
 *
 * Every rule returns an **i18n key** when the value is invalid, or an empty
 * string when it is valid. Returning a key (rather than English text) keeps
 * these helpers reusable across all six languages — the caller translates with
 * `t()` from src/i18n/useI18n.ts.
 *
 *   const error = isValidEmail(form.email)
 *   if (error) show(t(error))
 */

/** Field length caps. Also mirrored in the Google Sheet columns. */
export const MAX_LENGTH = {
  name: 100,
  email: 150,
  phone: 20,
  subject: 150,
  message: 2000,
} as const

// Deliberately permissive: catches obvious typos without rejecting valid
// addresses. Real verification only happens when someone replies.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Matches the `pattern` attribute on the phone input in Contact.tsx, so the
// browser's native validation and these utilities always agree.
const PHONE_PATTERN = /^[0-9+()\-\s]{7,}$/

/** Fails when the value is empty or only whitespace. */
export function isRequired(value: string): string {
  return value.trim() === '' ? 'forms.validation.required' : ''
}

/** Fails when a non-empty value is not a plausible email address. */
export function isValidEmail(value: string): string {
  const trimmed = value.trim()
  if (trimmed === '') return ''
  return EMAIL_PATTERN.test(trimmed) ? '' : 'forms.validation.email'
}

/** Fails when a non-empty value is not a plausible phone number. */
export function isValidPhone(value: string): string {
  const trimmed = value.trim()
  if (trimmed === '') return ''
  return PHONE_PATTERN.test(trimmed) ? '' : 'forms.validation.phone'
}

/** Fails when the value is longer than `max` characters. */
export function isWithinLength(value: string, max: number): string {
  return value.trim().length > max ? 'forms.validation.maxLength' : ''
}

/**
 * Run rules in order and return the first failure (or '' if all pass).
 * Reporting one message at a time keeps the UI calm.
 */
export function firstError(...results: string[]): string {
  return results.find((result) => result !== '') ?? ''
}

/** Trim every string field of a form object. */
export function trimAll<T extends Record<string, string>>(values: T): T {
  const trimmed = {} as T
  for (const key of Object.keys(values) as (keyof T)[]) {
    trimmed[key] = values[key].trim() as T[keyof T]
  }
  return trimmed
}
