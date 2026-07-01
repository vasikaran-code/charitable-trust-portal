/**
 * The React context object shared by the provider and the `useI18n` hook.
 * Kept in its own file so the provider component can stay in a JSX file and
 * the hook can import the context without circular dependencies.
 */

import { createContext } from 'react'
import type { LanguageCode } from './config'
import type { Translator } from './translate'

export type I18nContextValue = Translator & {
  /** The currently active language code (e.g. "en", "ta"). */
  language: LanguageCode
  /** Switch language. Persists the choice and updates instantly (no reload). */
  setLanguage: (code: LanguageCode) => void
}

export const I18nContext = createContext<I18nContextValue | null>(null)
