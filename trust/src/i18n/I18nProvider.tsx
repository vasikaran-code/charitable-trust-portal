import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  DEFAULT_LANGUAGE,
  STORAGE_KEY,
  isLanguageCode,
  type LanguageCode,
} from './config'
import { messagesByLanguage } from './locales'
import { createTranslator } from './translate'
import { I18nContext } from './I18nContext'

/** Read the saved language from localStorage, or fall back to the default. */
function getInitialLanguage(): LanguageCode {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE
  const saved = window.localStorage.getItem(STORAGE_KEY)
  return isLanguageCode(saved) ? saved : DEFAULT_LANGUAGE
}

/**
 * Provides the active language and translation functions to the whole app.
 * Wrap the application once (see src/main.tsx).
 */
export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(getInitialLanguage)

  // Keep the document's <html lang="…"> in sync for accessibility and SEO.
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const setLanguage = useCallback((code: LanguageCode) => {
    setLanguageState(code)
    window.localStorage.setItem(STORAGE_KEY, code)
  }, [])

  // Build the translator for the active language, English as the fallback.
  const value = useMemo(() => {
    const translator = createTranslator(
      messagesByLanguage[language],
      messagesByLanguage[DEFAULT_LANGUAGE],
    )
    return { ...translator, language, setLanguage }
  }, [language, setLanguage])

  return <I18nContext value={value}>{children}</I18nContext>
}
