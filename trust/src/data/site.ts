/**
 * Site-wide configuration and contact details.
 *
 * This is the single source of truth for the trust's identity and contact
 * information. To rebrand the site, change the values here — they are used
 * across the header, footer, contact page, and page metadata.
 */

export const site = {
  // Trust name (the English wordmark from the poster). This is the brand /
  // legal identity — shown in the header, hero, and footer, and used in the
  // footer copyright line — and is intentionally not translated per-language.
  nameEnglish: 'AMMA A J BALA BRIDGE OF HOPE WELFARE TRUST',
  shortName: 'Bridge of Hope Trust',

  // The tagline and intro shown to users are translated — see the locale
  // files (`hero.tagline`, `common.intro`).

  // Legal / registration details (shown on the About page).
  registration: {
    registeredName: 'AMMA A J BALA BRIDGE OF HOPE WELFARE TRUST',
    registrationNumber: '6/2026',
    // PAN was not on the poster — this is a placeholder to replace with the
    // trust's real PAN.
    panNumber: 'AAATN0000A',
    // The trust holds 12A registration and 80G tax exemption (see the poster).
    section80G: 'Available',
    registeredYear: 2026,
  },

  contact: {
    email: 'antojoe262@gmail.com',
    phone: '7904028081',
    phoneHref: 'tel:+917904028081',
    whatsapp: '7904028081',
    addressLines: [
      '11-A, Andhoniyar Kovil Street,',
      'Beemanagar,',
      'Marsingpettai Main Road,',
      'Trichy – 620001,',
      'Tamil Nadu, India.',
    ],
    // Google Maps embed URL for the trust's locality in Trichy.
    mapEmbedUrl:
      'https://www.google.com/maps?q=Beemanagar%2C%20Tiruchirappalli%2C%20Tamil%20Nadu%20620001&output=embed',
  },

  social: [
    { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
    { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
    { label: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
    { label: 'X (Twitter)', href: 'https://x.com', icon: 'x' },
  ],
} as const

export type Social = (typeof site.social)[number]
