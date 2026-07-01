import { useContext } from 'react'
import { I18nContext } from './I18nContext'

/**
 * Access translations and the active language anywhere in the app:
 *
 *   const { t, tList, language, setLanguage } = useI18n()
 *   <h1>{t('home.featuredTitle')}</h1>
 *   {tList<string>('about.objectives').map(...)}
 */
export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used inside <I18nProvider>')
  }
  return context
}
