/**
 * About page — non-translatable data only.
 *
 * Mission, vision, values, objectives, history, trustee roles/bios, and legal
 * labels all live in the locale files under the `about` namespace. Only the
 * trustees' names and avatar initials (proper nouns) stay here; their role and
 * bio are translated and keyed by `id` under `about.trustees.<id>`.
 */

export type Trustee = {
  id: string
  name: string
  // Initials shown in the placeholder avatar.
  initials: string
}

export const trustees: Trustee[] = [
  { id: 'founder', name: 'Dr. Anitha Raman', initials: 'AR' },
  { id: 'programs', name: 'Mr. Suresh Kumar', initials: 'SK' },
  { id: 'operations', name: 'Mrs. Lakshmi Devi', initials: 'LD' },
]
