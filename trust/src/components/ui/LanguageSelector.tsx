import { useI18n } from '../../i18n/useI18n'
import { languages, isLanguageCode } from '../../i18n/config'
import './LanguageSelector.css'

/**
 * Language picker for the header.
 *
 * Uses a native <select> on purpose: it is fully keyboard-accessible and
 * announced correctly by screen readers out of the box, and works reliably on
 * mobile. A globe icon and `aria-label` make its purpose clear.
 */
export default function LanguageSelector() {
  const { language, setLanguage, t } = useI18n()

  return (
    <div className="lang-selector">
      <span className="lang-selector__icon" aria-hidden="true">
        {/* Globe icon */}
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 0c2.5 2.3 3.8 5.6 3.8 9s-1.3 6.7-3.8 9c-2.5-2.3-3.8-5.6-3.8-9S9.5 5.3 12 3zM3.2 12h17.6"
          />
        </svg>
      </span>
      <select
        className="lang-selector__select"
        aria-label={t('language.select')}
        value={language}
        onChange={(e) => {
          if (isLanguageCode(e.target.value)) setLanguage(e.target.value)
        }}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  )
}
