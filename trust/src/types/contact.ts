/**
 * Types for the contact form specifically. Anything shared with other forms
 * lives in ./form.ts.
 */

/** The five fields on the contact form. Mirrors the inputs in Contact.tsx. */
export type ContactForm = {
  name: string
  email: string
  phone: string
  /** Optional in the UI — an empty string when the visitor leaves it blank. */
  subject: string
  message: string
}

/** An empty form, used for the initial state and to reset after a send. */
export const EMPTY_CONTACT_FORM: ContactForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}
