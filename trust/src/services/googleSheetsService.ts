/**
 * Sends form submissions to the Google Apps Script Web App, which appends each
 * one as a row in the private Google Sheet.
 *
 * This is the only place in the app that performs the request. Every form goes
 * through it — `formType` selects which sheet tab the row lands in. See
 * docs/CONTACT_FORM_INTEGRATION.md.
 */

import { googleAppsScript } from '../config/googleAppsScript'
import type { FormApiResponse, FormType, FormValues, SubmitResult } from '../types/form'
import { networkError, toFormError, unknownError } from '../utils/errors'

/** Submit one form's values to the sheet. */
export async function submitToGoogleSheet(
  formType: FormType,
  values: FormValues,
): Promise<SubmitResult> {
  if (!googleAppsScript.isConfigured()) {
    // A deployment problem, not something the visitor can fix — tell the
    // developer in the console and show the generic message on screen.
    console.error(
      '[forms] VITE_GOOGLE_SCRIPT_URL is not set. ' +
        'See docs/CONTACT_FORM_INTEGRATION.md.',
    )
    return { ok: false, error: unknownError() }
  }

  try {
    const response = await fetch(googleAppsScript.webAppUrl, {
      method: 'POST',
      // The body is JSON, but it is sent as text/plain so the request stays
      // "simple" and the browser skips the CORS preflight — Apps Script cannot
      // answer OPTIONS. The script parses the body as JSON on its side.
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ formType, ...values }),
      // Apps Script redirects /exec to its content host; follow it.
      redirect: 'follow',
      signal: AbortSignal.timeout(googleAppsScript.requestTimeoutMs),
    })

    if (!response.ok) {
      return { ok: false, error: networkError() }
    }

    // A non-JSON body means the deployment is misconfigured (Apps Script
    // returns an HTML error page); the throw is caught below.
    const result = (await response.json()) as FormApiResponse
    if (!result.success) {
      console.error(`[forms] Endpoint rejected "${formType}":`, result.message)
      return { ok: false, error: unknownError() }
    }

    return { ok: true }
  } catch (cause) {
    return { ok: false, error: toFormError(cause) }
  }
}
