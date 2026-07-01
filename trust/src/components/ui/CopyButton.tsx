import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../../i18n/useI18n'
import './CopyButton.css'

type Props = {
  /** The text placed on the clipboard when clicked. */
  value: string
  /** Button label (e.g. "Copy UPI ID"). */
  label: string
  /** Optional extra class names. */
  className?: string
}

/**
 * A small button that copies `value` to the clipboard and briefly shows a
 * "Copied!" confirmation. Reused by the UPI and bank-transfer sections.
 *
 * Uses the async Clipboard API with a legacy fallback so it also works on
 * older browsers and non-HTTPS origins.
 */
export default function CopyButton({ value, label, className = '' }: Props) {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  // Clear the pending "reset" timeout if the component unmounts.
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value)
      } else {
        // Fallback for older browsers: copy via a hidden textarea.
        const textarea = document.createElement('textarea')
        textarea.value = value
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // If copying fails, do nothing — the value is still visible on screen.
    }
  }

  return (
    <button
      type="button"
      className={`copy-btn ${copied ? 'is-copied' : ''} ${className}`}
      onClick={copy}
      aria-live="polite"
    >
      <span aria-hidden="true">{copied ? '✓' : '⧉'}</span>
      {copied ? t('common.copied') : label}
    </button>
  )
}
