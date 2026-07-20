/**
 * Shared types for every form that submits to the Google Sheet.
 *
 * One Apps Script Web App serves all of them; `FormType` selects which sheet
 * tab a submission lands in. To add a form, add its name here and a matching
 * entry to FORMS in google-apps-script/Code.gs.
 */

export type FormType =
  | 'contact'
  | 'volunteer'
  | 'donationEnquiry'
  | 'sponsorship'
  | 'generalEnquiry'
  | 'eventRegistration'

/** A form's values, ready to send. Every field is a plain string. */
export type FormValues = Record<string, string>

/** Per-field validation messages, keyed by field name. */
export type FormFieldErrors = Record<string, string>

/** The JSON shape the Apps Script Web App returns. */
export type FormApiResponse = {
  success: boolean
  message?: string
}

export type FormErrorKind = 'network' | 'validation' | 'unknown'

/** A failed submission, in a shape the UI can render directly. */
export type FormError = {
  kind: FormErrorKind
  /** i18n key for the message to show the visitor (translate with `t()`). */
  messageKey: string
  /** Only set when `kind` is 'validation'. */
  fieldErrors?: FormFieldErrors
}

/** The outcome of a submission, in a shape a page can switch on. */
export type SubmitResult = { ok: true } | { ok: false; error: FormError }
