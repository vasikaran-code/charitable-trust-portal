/**
 * Contact form submission.
 *
 * The transport lives in googleSheetsService.ts and is shared by every form;
 * this file only shapes the contact form's payload. A new form follows the
 * same two-step pattern: build its values, then hand them to
 * `submitToGoogleSheet` with its own form type.
 */

import type { ContactForm } from '../types/contact'
import type { FormValues, SubmitResult } from '../types/form'
import { submitToGoogleSheet } from './googleSheetsService'

/**
 * Build the payload, trimming every field. The Apps Script stamps the date and
 * time itself, so rows carry server time rather than the visitor's clock.
 * Sheet columns: Date & Time | Name | Email | Phone | Subject | Message
 */
export function buildContactPayload(form: ContactForm): FormValues {
  return {
    name: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    subject: form.subject.trim(),
    message: form.message.trim(),
  }
}

/** Send a contact enquiry to the Google Sheet. */
export function submitContactForm(form: ContactForm): Promise<SubmitResult> {
  return submitToGoogleSheet('contact', buildContactPayload(form))
}


