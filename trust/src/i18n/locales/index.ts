/**
 * Registry mapping each language code to its messages.
 *
 * To add a language: create `<code>.ts` next to this file (copy `en.ts` and
 * translate the values), import it here, and add it to `messagesByLanguage`.
 */

import type { LanguageCode } from '../config'
import { en, type Messages } from './en'
import { ta } from './ta'
import { te } from './te'
import { hi } from './hi'
import { ml } from './ml'
import { kn } from './kn'

export const messagesByLanguage: Record<LanguageCode, Messages> = {
  en,
  ta,
  te,
  hi,
  ml,
  kn,
}
