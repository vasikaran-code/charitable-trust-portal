/** Small formatting helpers shared across the app. */

/**
 * Turns an ISO date string (e.g. "2026-08-15") into a friendly, localised
 * label like "15 August 2026" (or its equivalent in the given locale).
 * `locale` is a BCP-47 tag such as "ta-IN"; it defaults to British English.
 * Falls back to the raw value if parsing fails.
 */
export function formatDate(iso: string, locale: string = 'en-GB'): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
