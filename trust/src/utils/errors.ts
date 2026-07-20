/**
 * Builders for the three ways a form submission can fail.
 *
 * Each returns a `FormError` carrying an i18n key, so the UI can render it with
 * `t(error.messageKey)` in whichever language is active. Shared by every form.
 */

import type { FormError, FormFieldErrors } from '../types/form'

/** The request never reached the server (offline, timeout, DNS, CORS). */
export function networkError(): FormError {
  return { kind: 'network', messageKey: 'forms.errors.network' }
}

/** The visitor's input did not pass validation. */
export function validationError(fieldErrors: FormFieldErrors): FormError {
  return { kind: 'validation', messageKey: 'forms.errors.validation', fieldErrors }
}

/** Anything we did not anticipate. */
export function unknownError(): FormError {
  return { kind: 'unknown', messageKey: 'forms.errors.unknown' }
}

/**
 * Turn a thrown value into a FormError.
 *
 * Used by the service's `catch` block, where `cause` can be anything: a fetch
 * TypeError (offline), an AbortError (timeout), or a SyntaxError (the endpoint
 * replied with something that is not JSON).
 */
export function toFormError(cause: unknown): FormError {
  if (cause instanceof DOMException && cause.name === 'AbortError') {
    return networkError()
  }
  if (cause instanceof TypeError) {
    // `fetch` rejects with a TypeError when the network itself fails.
    return networkError()
  }
  return unknownError()
}
