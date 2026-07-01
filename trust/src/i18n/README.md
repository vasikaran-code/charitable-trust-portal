# Internationalisation (i18n)

This folder contains the app's translation system. It is intentionally small and
dependency-free — just React Context plus one message file per language.

## How it works

```
src/i18n/
├── config.ts          # Supported languages, default, storage key
├── translate.ts       # Pure t()/tList() lookup logic (no React)
├── I18nContext.ts      # The React context object
├── I18nProvider.tsx    # Provider: holds active language, persistence, <html lang>
├── useI18n.ts          # The hook components use
└── locales/
    ├── en.ts          # SOURCE OF TRUTH — defines every key + the Messages type
    ├── ta.ts          # Tamil
    ├── te.ts          # Telugu
    ├── hi.ts          # Hindi
    ├── ml.ts          # Malayalam
    ├── kn.ts          # Kannada
    └── index.ts       # Registry: code → messages
```

- The active language is stored in **localStorage** (`preferred-language`) and
  restored automatically on the next visit.
- Switching language updates the UI **instantly** (React state) — no page reload.
- `en.ts` is the source of truth. Its inferred type, `Messages`, is applied to
  every other locale, so **TypeScript fails the build if a key is missing** in
  any language.
- If a key is ever missing at runtime, it falls back to English (and warns in
  the dev console), so the UI never shows a blank.

## Using translations in a component

```tsx
import { useI18n } from '../i18n/useI18n'

function Example() {
  const { t, tList, language, setLanguage } = useI18n()

  return (
    <>
      <h1>{t('home.featuredTitle')}</h1>

      {/* Values with placeholders */}
      <p>{t('hero.badge', { year: 2015 })}</p>

      {/* A list value (string[] or object[]) */}
      <ul>
        {tList<string>('about.objectives').map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  )
}
```

**Rule:** never hard-code user-facing text in a component. Add a key to `en.ts`
(and every other locale) and read it with `t()` / `tList()`.

## Adding a new translation entry

1. Add the key + English text to `locales/en.ts`.
2. Add the same key with a translated value to **every** other locale file.
3. Use it via `t('your.new.key')`. The build will fail until all locales have it.

Content that belongs to a data record (a program, event, photo…) is keyed by
that record's stable `id`/`slug` — e.g. `programs.items.school-support.title`.
The data files in `src/data/` hold only non-translatable fields (ids, dates,
images, contact info).

## Adding a new language

Example — adding French (`fr`):

1. **Create the locale file** `locales/fr.ts` — copy `en.ts`, then:
   - replace the first lines with `import { type Messages } from './en'`
   - rename the export to `export const fr: Messages = { … }`
   - translate every value (keep the keys identical).
2. **Register it** in `locales/index.ts`:
   ```ts
   import { fr } from './fr'
   export const messagesByLanguage = { en, ta, te, hi, ml, kn, fr }
   ```
3. **List it** in `config.ts`:
   ```ts
   { code: 'fr', label: 'Français', locale: 'fr-FR' },
   ```
   and add `'fr'` to the `LanguageCode` union.

That's it — the language selector, persistence, and `<html lang>` all pick it
up automatically.

## Notes

- `config.ts` maps each language to a BCP-47 `locale` (e.g. `ta-IN`) used to
  format dates in the local script (see `src/lib/format.ts`).
- The brand wordmark (Tamil + English name in the header) is the trust's fixed
  visual identity and is intentionally **not** translated.
