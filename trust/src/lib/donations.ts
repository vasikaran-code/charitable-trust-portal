/**
 * Donation submissions storage.
 *
 * This is a static site with no backend (Phase 1), so donor confirmations are
 * kept in the browser's `localStorage` — the same place we already store the
 * language choice. This keeps the whole flow simple and dependency-free.
 *
 * WHEN YOU ADD A BACKEND: replace the read/write helpers below with API calls.
 * The rest of the app only talks to these functions, so nothing else changes.
 *
 * Data flows like this:
 *   Donate page  → addDonation()      → localStorage
 *   Admin page   → getDonations()     ← localStorage
 *   Admin page   → updateStatus()     → localStorage
 */

import type { PaymentMethod } from '../data/donation'

/** Where a submission sits in the verification workflow. */
export type DonationStatus = 'pending' | 'verified' | 'rejected'

/** One donation confirmation submitted by a donor. */
export type Donation = {
  id: string
  reference: string
  name: string
  mobile: string
  email: string
  amount: string
  category: string
  method: PaymentMethod
  transactionRef: string
  date: string // ISO date (yyyy-mm-dd) the donor made the payment
  notes: string
  /** Optional payment screenshot, stored as a data URL (see MAX_SCREENSHOT_BYTES). */
  screenshot: string | null
  status: DonationStatus
  submittedAt: string // ISO timestamp of when the form was submitted
}

/** The details a donor fills in — everything except the server-set fields. */
export type DonationInput = Omit<
  Donation,
  'id' | 'reference' | 'status' | 'submittedAt'
>

const STORAGE_KEY = 'trust-donations'

/** Max screenshot size we keep (localStorage is small; ~1 MB is plenty). */
export const MAX_SCREENSHOT_BYTES = 1024 * 1024

/** Read every stored donation (newest first). Returns [] on any error. */
export function getDonations(): Donation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const list = JSON.parse(raw) as Donation[]
    return Array.isArray(list) ? list : []
  } catch {
    // Corrupt or unavailable storage — fail safe with an empty list.
    return []
  }
}

/** Overwrite the whole list. Internal helper used by the functions below. */
function saveAll(list: Donation[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

/**
 * Generate a human-friendly tracking reference, e.g. "TRUST-20260701-4821".
 * Donors quote this when they contact the trust about their donation.
 */
export function generateReference(): string {
  const now = new Date()
  const ymd =
    String(now.getFullYear()) +
    String(now.getMonth() + 1).padStart(2, '0') +
    String(now.getDate()).padStart(2, '0')
  const random = Math.floor(1000 + Math.random() * 9000) // 4 digits
  return `TRUST-${ymd}-${random}`
}

/**
 * Save a new donation confirmation and return the stored record (which now
 * carries its generated reference and "pending" status). Newest is kept first.
 */
export function addDonation(input: DonationInput): Donation {
  const donation: Donation = {
    ...input,
    id: `${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`,
    reference: generateReference(),
    status: 'pending',
    submittedAt: new Date().toISOString(),
  }
  saveAll([donation, ...getDonations()])
  return donation
}

/** Change one donation's verification status. */
export function updateStatus(id: string, status: DonationStatus): void {
  const list = getDonations().map((d) => (d.id === id ? { ...d, status } : d))
  saveAll(list)
}
