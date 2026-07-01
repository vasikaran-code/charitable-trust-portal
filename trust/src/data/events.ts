/**
 * News & events — non-translatable shape only.
 *
 * Event text (title, summary, location, details) lives in the locale files
 * under `events.items.<slug>`. Announcement text lives under
 * `news.announcements.<id>`. Dates are ISO strings (YYYY-MM-DD) so they sort
 * and format reliably; they are localised at display time.
 */

export type EventStatus = 'upcoming' | 'completed'

export type TrustEvent = {
  slug: string
  status: EventStatus
  date: string
}

export const events: TrustEvent[] = [
  { slug: 'annual-scholarship-day-2026', status: 'upcoming', date: '2026-08-15' },
  { slug: 'free-eye-camp-2026', status: 'upcoming', date: '2026-07-20' },
  { slug: 'tree-plantation-drive-2026', status: 'completed', date: '2026-06-05' },
  { slug: 'women-skill-graduation-2026', status: 'completed', date: '2026-05-18' },
]

export type Announcement = {
  id: string
  date: string
}

export const announcements: Announcement[] = [
  { id: 'relief', date: '2026-06-10' },
  { id: 'lab', date: '2026-05-30' },
  { id: 'volunteers', date: '2026-05-12' },
]
