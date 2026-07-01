/**
 * Donation configuration — the SINGLE SOURCE OF TRUTH for how the trust
 * receives money. There is NO payment gateway: donors pay via UPI, by scanning
 * a QR code, or by direct bank transfer, and then confirm on the website.
 *
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  HOW TO UPDATE (no other file needs to change):                            │
 * │  • UPI ID .......... edit `upiId` (and `upiPayeeName`) below.              │
 * │  • QR code image ... replace public/donation/upi-qr.svg with the trust's   │
 * │                      real QR image (keep the same file name/path, or       │
 * │                      update `qrImage` to point at the new file).           │
 * │  • Bank details .... edit the `bank` object below.                         │
 * │  • Categories ...... edit `donationCategories` below, then add the         │
 * │                      matching text to every locale file under              │
 * │                      `donate.categories.items.<id>`.                       │
 * │  • Admin passcode .. edit `adminPasscode` below (see the security note).   │
 * └──────────────────────────────────────────────────────────────────────────┘
 *
 * Category / stat LABELS are translatable and live in the locale files
 * (`donate.categories.items.<id>`, `donate.transparency.items.<id>`), keeping
 * this file free of user-facing prose — the same pattern as programs.ts.
 */

export const donation = {
  /** UPI ID donors send money to (also encoded in the "Pay via UPI" button). */
  upiId: 'nambikkaitrust@upi',
  /** Name shown in the donor's UPI app when they pay. */
  upiPayeeName: 'Nambikkai Charitable Trust',

  /** QR code image shown and offered for download. Lives in `public/`. */
  qrImage: '/donation/upi-qr.svg',

  /** Bank account for direct transfers (NEFT / IMPS / RTGS). */
  bank: {
    accountName: 'Nambikkai Charitable Trust',
    accountNumber: '1234567890123',
    bankName: 'State Bank of India',
    branchName: 'Anna Nagar, Madurai',
    ifsc: 'SBIN0001234',
    accountType: 'Current',
  },

  /**
   * Passcode for the admin donation dashboard (/admin).
   *
   * SECURITY NOTE: this is a LIGHT client-side gate only — it keeps the admin
   * screen out of casual view but is NOT real protection, because this is a
   * static site with no backend (the same limitation the Contact form documents).
   * Before handling real donor data, move submissions to a real backend/API and
   * protect /admin with server-side authentication.
   */
  adminPasscode: 'trust-admin-2025',
} as const

/** A donation cause. `icon` is a lightweight emoji (no icon library needed). */
export type DonationCategory = {
  id: string
  icon: string
}

/**
 * Donation causes, in display order. The title + description for each `id`
 * live in the locale files under `donate.categories.items.<id>`.
 */
export const donationCategories: DonationCategory[] = [
  { id: 'education', icon: '📚' },
  { id: 'medical', icon: '🏥' },
  { id: 'food', icon: '🍲' },
  { id: 'elderly', icon: '🧓' },
  { id: 'women', icon: '💪' },
  { id: 'environment', icon: '🌱' },
  { id: 'general', icon: '🤝' },
]

/** Category ids as a plain list — handy for validating the confirmation form. */
export const donationCategoryIds = donationCategories.map((c) => c.id)

/** Payment methods a donor can choose in the confirmation form. */
export const paymentMethods = ['upi', 'qr', 'bank'] as const
export type PaymentMethod = (typeof paymentMethods)[number]

/**
 * Public transparency figures. Values are strings so we can add "+" / "₹"
 * (animated by <CountUp/> just like the Home page stats). Labels are
 * translatable — see `donate.transparency.items.<id>`.
 */
export type TransparencyStat = {
  id: string
  value: string
}

export const transparencyStats: TransparencyStat[] = [
  { id: 'donations', value: '₹42,00,000+' },
  { id: 'beneficiaries', value: '25,000+' },
  { id: 'programs', value: '12' },
]

/**
 * Build the standard UPI deep link (upi://pay?...). Mobile devices open the
 * user's UPI app with the payee pre-filled. Desktops usually have no handler,
 * so the button also shows the UPI ID for manual entry.
 */
export function buildUpiLink(): string {
  const params = new URLSearchParams({
    pa: donation.upiId, // payee address
    pn: donation.upiPayeeName, // payee name
    cu: 'INR', // currency
  })
  return `upi://pay?${params.toString()}`
}
