/**
 * Key impact statistics — numbers only.
 * Labels live in the locale files under `stats.items.<id>`.
 * `value` is a string so we can include "+" or "K" suffixes.
 */

export type Stat = {
  id: string
  value: string
}

export const stats: Stat[] = [
  { id: 'lives', value: '25,000+' },
  { id: 'projects', value: '120+' },
  { id: 'volunteers', value: '450' },
  { id: 'villages', value: '60' },
]
