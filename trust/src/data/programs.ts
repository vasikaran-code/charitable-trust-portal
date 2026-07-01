/**
 * Programs & activities — non-translatable shape only.
 *
 * All text (title, summary, objectives, impact, category label) lives in the
 * locale files under `programs.items.<id>` and `programs.categories.<category>`.
 * To add a program: add an entry here, then add its text to every locale file.
 */

export type ProgramCategory =
  | 'education'
  | 'healthcare'
  | 'environment'
  | 'livelihood'

export type Program = {
  id: string
  category: ProgramCategory
  // A short emoji used as a lightweight, dependency-free icon.
  icon: string
}

/** Category keys in display order (labels come from translations). */
export const programCategories: ProgramCategory[] = [
  'education',
  'healthcare',
  'environment',
  'livelihood',
]

export const programs: Program[] = [
  { id: 'school-support', category: 'education', icon: '📚' },
  { id: 'mobile-health', category: 'healthcare', icon: '🩺' },
  { id: 'green-villages', category: 'environment', icon: '🌱' },
  { id: 'skill-training', category: 'livelihood', icon: '🧵' },
  { id: 'digital-literacy', category: 'education', icon: '💻' },
  { id: 'elder-care', category: 'healthcare', icon: '🤝' },
]
