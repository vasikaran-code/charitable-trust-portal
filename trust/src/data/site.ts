/**
 * Site-wide configuration and contact details.
 *
 * This is the single source of truth for the trust's identity and contact
 * information. To rebrand the site, change the values here — they are used
 * across the header, footer, contact page, and page metadata.
 */

export const site = {
  // Trust name in Tamil and English. அறக்கட்டளை = "Trust / Foundation".
  nameTamil: 'நம்பிக்கை அறக்கட்டளை',
  nameEnglish: 'Nambikkai Charitable Trust',
  shortName: 'Nambikkai Trust',

  // The trust name and tagline shown to users are translated — see the locale
  // files (`hero.tagline`, `common.intro`). The names above are the brand
  // wordmark / legal identity and are intentionally not translated.

  // Legal / registration details (shown on the About page).
  registration: {
    registeredName: 'Nambikkai Charitable Trust',
    registrationNumber: 'TR/2015/0000123',
    panNumber: 'AAATN0000A',
    section80G: 'AAATN0000A / 80G / 2016-2017',
    registeredYear: 2015,
  },

  contact: {
    email: 'hello@nambikkaitrust.org',
    phone: '+91 98765 43210',
    phoneHref: 'tel:+919876543210',
    whatsapp: '+91 98765 43210',
    addressLines: [
      'Nambikkai Charitable Trust',
      '12, Gandhi Road, Anna Nagar',
      'Madurai, Tamil Nadu 625020',
      'India',
    ],
    // Google Maps embed URL (a generic Madurai location as a placeholder).
    mapEmbedUrl:
      'https://www.google.com/maps?q=Madurai,Tamil%20Nadu&output=embed',
  },

  social: [
    { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
    { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
    { label: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
    { label: 'X (Twitter)', href: 'https://x.com', icon: 'x' },
  ],
} as const

export type Social = (typeof site.social)[number]
