/**
 * Pure translation helpers used by the i18n provider.
 *
 * Messages are plain nested objects. A key is a dot-path into that object,
 * e.g. t('nav.home') reads messages.nav.home. Keeping this logic dependency-free
 * and separate from React makes it simple to read and reason about.
 */

import type { Messages } from './locales/en'

// A message value can be a string, a list, or a nested group of messages.
type MessageNode = string | string[] | readonly unknown[] | { [key: string]: MessageNode }

/** Read a dot-path (e.g. "footer.rights") out of a messages object. */
function getByPath(messages: Messages, key: string): unknown {
  return key
    .split('.')
    .reduce<unknown>((node, part) => {
      if (node && typeof node === 'object') {
        return (node as Record<string, MessageNode>)[part]
      }
      return undefined
    }, messages)
}

/** Replace {placeholders} in a string with values from `vars`. */
function interpolate(text: string, vars?: Record<string, string | number>): string {
  if (!vars) return text
  return text.replace(/\{(\w+)\}/g, (match, name) =>
    name in vars ? String(vars[name]) : match,
  )
}

export type Translator = {
  /** Translate a key to a string (with optional {placeholder} values). */
  t: (key: string, vars?: Record<string, string | number>) => string
  /** Translate a key whose value is a list (string[] or object[]). */
  tList: <T = string>(key: string) => T[]
}

/**
 * Build a translator for the active language. `fallback` (English) is used
 * whenever a key is missing from the active language, so the UI never shows
 * a blank — it degrades gracefully to English.
 */
export function createTranslator(active: Messages, fallback: Messages): Translator {
  const lookup = (key: string): unknown => {
    const value = getByPath(active, key)
    if (value !== undefined) return value
    const fallbackValue = getByPath(fallback, key)
    if (fallbackValue !== undefined) {
      if (import.meta.env.DEV) {
        console.warn(`[i18n] Missing translation for "${key}" — using English.`)
      }
      return fallbackValue
    }
    if (import.meta.env.DEV) {
      console.warn(`[i18n] Unknown translation key "${key}".`)
    }
    return undefined
  }

  return {
    t(key, vars) {
      const value = lookup(key)
      // If the key is missing entirely, show the key itself as a last resort.
      if (typeof value !== 'string') return key
      return interpolate(value, vars)
    },
    tList<T>(key: string): T[] {
      const value = lookup(key)
      return Array.isArray(value) ? (value as T[]) : []
    },
  }
}
