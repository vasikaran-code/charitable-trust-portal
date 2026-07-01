/**
 * Primary navigation links, shared by the header and footer.
 * `key` points at a label in the locale files (`nav.<key>`); `path` is the
 * route. Add or reorder pages here and both menus update automatically.
 */

export type NavLink = {
  key: 'home' | 'about' | 'programs' | 'gallery' | 'news' | 'contact' | 'donate'
  path: string
}

export const navLinks: NavLink[] = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/about' },
  { key: 'programs', path: '/programs' },
  { key: 'gallery', path: '/gallery' },
  { key: 'news', path: '/news' },
  { key: 'contact', path: '/contact' },
  { key: 'donate', path: '/donate' },
]
