/**
 * Google Apps Script Web App configuration.
 *
 * The contact form will POST submissions to a Google Apps Script Web App, which
 * appends them as rows to a private Google Sheet. This file is the single source
 * of truth for that endpoint — never hardcode the URL anywhere else.
 *
 * The URL comes from the VITE_GOOGLE_SCRIPT_URL environment variable (see
 * .env.example). Phase 1 ships with it empty; `isConfigured()` lets the Phase 2
 * service fail fast with a clear message instead of a confusing network error.
 */

export const googleAppsScript = {
  /** Deployed Web App URL, e.g. https://script.google.com/macros/s/…/exec */
  webAppUrl: import.meta.env.VITE_GOOGLE_SCRIPT_URL ?? '',

  /** Give up on a submission after this long so the UI never hangs. */
  requestTimeoutMs: 10_000,

  /** True once a Web App URL has actually been configured. */
  isConfigured(): boolean {
    return this.webAppUrl.trim().length > 0
  },
} as const
