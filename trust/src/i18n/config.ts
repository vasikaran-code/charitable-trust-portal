/**
 * Internationalisation (i18n) configuration.
 *
 * To add a new language:
 *   1. Create a locale file in `src/i18n/locales/<code>.ts` (copy `en.ts`
 *      and translate the values — keep the keys identical).
 *   2. Register it in `src/i18n/locales/index.ts`.
 *   3. Add an entry to the `languages` array below.
 * Nothing else needs to change — the selector and the rest of the app update
 * automatically. See `src/i18n/README.md` for full instructions.
 */

export type LanguageCode = 'en' | 'ta' | 'te' | 'hi' | 'ml' | 'kn'

/** The language used before the visitor has chosen one. */
export const DEFAULT_LANGUAGE: LanguageCode = 'en'

/** localStorage key used to remember the visitor's choice between visits. */
export const STORAGE_KEY = 'preferred-language'

export type LanguageOption = {
  code: LanguageCode
  /** The language's own name (endonym), shown in the selector. */
  label: string
  /** BCP-47 locale tag used for date/number formatting. */
  locale: string
}

export const languages: LanguageOption[] = [
  { code: 'en', label: 'English', locale: 'en-GB' },
  { code: 'ta', label: 'தமிழ்', locale: 'ta-IN' },
  { code: 'te', label: 'తెలుగు', locale: 'te-IN' },
  { code: 'hi', label: 'हिन्दी', locale: 'hi-IN' },
  { code: 'ml', label: 'മലയാളം', locale: 'ml-IN' },
  { code: 'kn', label: 'ಕನ್ನಡ', locale: 'kn-IN' },
]

/** Look up the locale tag (e.g. "ta-IN") for a language code. */
export function localeFor(code: LanguageCode): string {
  return languages.find((l) => l.code === code)?.locale ?? 'en-GB'
}

/** Type guard: is this string one of our supported language codes? */
export function isLanguageCode(value: string | null): value is LanguageCode {
  return !!value && languages.some((l) => l.code === value)
}
