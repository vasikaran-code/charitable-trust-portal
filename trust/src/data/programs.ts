/**
 * Programs & activities — non-translatable shape only.
 *
 * All text (title, summary, objectives, impact, category label) lives in the
 * locale files under `programs.items.<id>` and `programs.categories.<category>`.
 * To add a program: add an entry here, then add its text to every locale file.
 */

export type ProgramCategory =
  | 'welfare'
  | 'education'
  | 'healthcare'
  | 'community'

export type Program = {
  id: string
  category: ProgramCategory
  // A short emoji used as a lightweight, dependency-free icon.
  icon: string
}

/** Category keys in display order (labels come from translations). */
export const programCategories: ProgramCategory[] = [
  'welfare',
  'education',
  'healthcare',
  'community',
]

export const programs: Program[] = [
  { id: 'poor-needy', category: 'welfare', icon: '🤲' },
  { id: 'education-support', category: 'education', icon: '📚' },
  { id: 'medical-assistance', category: 'healthcare', icon: '🏥' },
  { id: 'differently-abled', category: 'welfare', icon: '♿' },
  { id: 'women-children', category: 'welfare', icon: '👩‍👧' },
  { id: 'community-development', category: 'community', icon: '🌱' },
]
