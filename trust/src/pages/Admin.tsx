import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import PageHeader from '../components/ui/PageHeader'
import { donation, donationCategories, paymentMethods } from '../data/donation'
import {
  getDonations,
  updateStatus,
  type Donation,
  type DonationStatus,
} from '../lib/donations'
import { formatDate } from '../lib/format'
import { useI18n } from '../i18n/useI18n'
import './Admin.css'

/** Remembers a successful sign-in for the current tab only. */
const SESSION_KEY = 'trust-admin-authed'

const STATUSES: DonationStatus[] = ['pending', 'verified', 'rejected']

/**
 * Admin dashboard for managing donation confirmations: search, filter, view
 * the payment screenshot, and update the verification status.
 *
 * The passcode gate is a LIGHT client-side check only — see the security note
 * in src/data/donation.ts. Real protection requires a backend.
 */
export default function Admin() {
  const { t, language } = useI18n()
  const locale = language === 'en' ? 'en-GB' : `${language}-IN`

  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === 'yes',
  )

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />
  }

  return <AdminDashboard t={t} locale={locale} onLogout={() => setAuthed(false)} />
}

/* -------------------------------------------------------------------------- */
/* Sign-in gate                                                               */
/* -------------------------------------------------------------------------- */

function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const { t } = useI18n()
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (passcode === donation.adminPasscode) {
      sessionStorage.setItem(SESSION_KEY, 'yes')
      onSuccess()
    } else {
      setError(true)
    }
  }

  return (
    <>
      <PageHeader title={t('admin.pageTitle')} subtitle={t('admin.pageSubtitle')} />
      <section className="section">
        <div className="container admin-login">
          <div className="card admin-login__card">
            <h2>{t('admin.login.title')}</h2>
            <p className="lead">{t('admin.login.intro')}</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="passcode">{t('admin.login.passcode')}</label>
              <input
                id="passcode"
                type="password"
                autoComplete="current-password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value)
                  setError(false)
                }}
              />
              {error && (
                <p className="donate-form__error" role="alert">
                  {t('admin.login.error')}
                </p>
              )}
              <button type="submit" className="btn btn--primary">
                {t('admin.login.submit')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/* Dashboard                                                                  */
/* -------------------------------------------------------------------------- */

type DashboardProps = {
  t: (key: string, vars?: Record<string, string | number>) => string
  locale: string
  onLogout: () => void
}

function AdminDashboard({ t, locale, onLogout }: DashboardProps) {
  // Load once on mount; re-render after a status change by bumping `version`.
  const [version, setVersion] = useState(0)
  const donations = useMemo(() => getDonations(), [version])

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<DonationStatus | 'all'>('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [methodFilter, setMethodFilter] = useState('all')
  const [proof, setProof] = useState<string | null>(null)

  const setStatus = (id: string, status: DonationStatus) => {
    updateStatus(id, status)
    setVersion((v) => v + 1)
  }

  const query = search.trim().toLowerCase()
  const visible = donations.filter((d) => {
    const matchesSearch =
      !query ||
      d.name.toLowerCase().includes(query) ||
      d.reference.toLowerCase().includes(query) ||
      d.mobile.toLowerCase().includes(query) ||
      d.transactionRef.toLowerCase().includes(query)
    const matchesStatus = statusFilter === 'all' || d.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || d.category === categoryFilter
    const matchesMethod = methodFilter === 'all' || d.method === methodFilter
    return matchesSearch && matchesStatus && matchesCategory && matchesMethod
  })

  const counts = {
    total: donations.length,
    pending: donations.filter((d) => d.status === 'pending').length,
    verified: donations.filter((d) => d.status === 'verified').length,
    rejected: donations.filter((d) => d.status === 'rejected').length,
  }

  const categoryLabel = (id: string) =>
    t(`donate.categories.items.${id}.title`)

  return (
    <>
      <PageHeader title={t('admin.pageTitle')} subtitle={t('admin.pageSubtitle')} />

      <section className="section">
        <div className="container">
          {/* Top bar: summary counts + sign out */}
          <div className="admin-topbar">
            <ul className="admin-summary">
              <li><strong>{counts.total}</strong> {t('admin.summary.total')}</li>
              <li><strong>{counts.pending}</strong> {t('admin.summary.pending')}</li>
              <li><strong>{counts.verified}</strong> {t('admin.summary.verified')}</li>
              <li><strong>{counts.rejected}</strong> {t('admin.summary.rejected')}</li>
            </ul>
            <button type="button" className="btn btn--outline" onClick={onLogout}>
              {t('admin.logout')}
            </button>
          </div>

          {/* Filters */}
          <div className="admin-filters">
            <input
              type="search"
              className="admin-filters__search"
              placeholder={t('admin.search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as DonationStatus | 'all')}>
              <option value="all">{t('admin.filterStatus')}: {t('admin.all')}</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{t(`admin.status.${s}`)}</option>
              ))}
            </select>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="all">{t('admin.filterCategory')}: {t('admin.all')}</option>
              {donationCategories.map((c) => (
                <option key={c.id} value={c.id}>{categoryLabel(c.id)}</option>
              ))}
            </select>
            <select value={methodFilter} onChange={(e) => setMethodFilter(e.target.value)}>
              <option value="all">{t('admin.filterMethod')}: {t('admin.all')}</option>
              {paymentMethods.map((m) => (
                <option key={m} value={m}>{t(`donate.methods.${m}`)}</option>
              ))}
            </select>
          </div>

          <p className="admin-count">{t('admin.count', { count: visible.length })}</p>

          {donations.length === 0 ? (
            <p className="admin-empty">{t('admin.empty')}</p>
          ) : visible.length === 0 ? (
            <p className="admin-empty">{t('admin.emptyFiltered')}</p>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>{t('admin.table.donor')}</th>
                    <th>{t('admin.table.contact')}</th>
                    <th>{t('admin.table.amount')}</th>
                    <th>{t('admin.table.category')}</th>
                    <th>{t('admin.table.method')}</th>
                    <th>{t('admin.table.reference')}</th>
                    <th>{t('admin.table.date')}</th>
                    <th>{t('admin.table.proof')}</th>
                    <th>{t('admin.table.status')}</th>
                    <th>{t('admin.table.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((d) => (
                    <DonationRow
                      key={d.id}
                      record={d}
                      t={t}
                      locale={locale}
                      categoryLabel={categoryLabel}
                      onSetStatus={setStatus}
                      onViewProof={setProof}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Screenshot preview modal */}
      {proof && (
        <div
          className="admin-modal"
          role="dialog"
          aria-modal="true"
          aria-label={t('admin.viewProof')}
          onClick={() => setProof(null)}
        >
          <div className="admin-modal__inner" onClick={(e) => e.stopPropagation()}>
            <img src={proof} alt={t('admin.viewProof')} />
            <button type="button" className="btn btn--outline" onClick={() => setProof(null)}>
              {t('admin.closeProof')}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

/* -------------------------------------------------------------------------- */
/* One table row                                                              */
/* -------------------------------------------------------------------------- */

type RowProps = {
  record: Donation
  t: DashboardProps['t']
  locale: string
  categoryLabel: (id: string) => string
  onSetStatus: (id: string, status: DonationStatus) => void
  onViewProof: (src: string) => void
}

function DonationRow({
  record: d,
  t,
  locale,
  categoryLabel,
  onSetStatus,
  onViewProof,
}: RowProps) {
  return (
    <tr>
      <td data-label={t('admin.table.donor')}>{d.name}</td>
      <td data-label={t('admin.table.contact')}>
        <span>{d.mobile}</span>
        <br />
        <span className="admin-muted">{d.email}</span>
      </td>
      <td data-label={t('admin.table.amount')}>₹{d.amount}</td>
      <td data-label={t('admin.table.category')}>{categoryLabel(d.category)}</td>
      <td data-label={t('admin.table.method')}>{t(`donate.methods.${d.method}`)}</td>
      <td data-label={t('admin.table.reference')}>
        <code>{d.reference}</code>
        <br />
        <span className="admin-muted">{d.transactionRef}</span>
      </td>
      <td data-label={t('admin.table.date')}>{formatDate(d.date, locale)}</td>
      <td data-label={t('admin.table.proof')}>
        {d.screenshot ? (
          <button
            type="button"
            className="admin-link"
            onClick={() => onViewProof(d.screenshot as string)}
          >
            {t('admin.viewProof')}
          </button>
        ) : (
          <span className="admin-muted">{t('admin.noProof')}</span>
        )}
      </td>
      <td data-label={t('admin.table.status')}>
        <span className={`admin-status admin-status--${d.status}`}>
          {t(`admin.status.${d.status}`)}
        </span>
      </td>
      <td data-label={t('admin.table.actions')}>
        <div className="admin-actions">
          <button
            type="button"
            className="admin-action admin-action--verify"
            disabled={d.status === 'verified'}
            onClick={() => onSetStatus(d.id, 'verified')}
          >
            {t('admin.markVerified')}
          </button>
          <button
            type="button"
            className="admin-action admin-action--reject"
            disabled={d.status === 'rejected'}
            onClick={() => onSetStatus(d.id, 'rejected')}
          >
            {t('admin.markRejected')}
          </button>
          <button
            type="button"
            className="admin-action"
            disabled={d.status === 'pending'}
            onClick={() => onSetStatus(d.id, 'pending')}
          >
            {t('admin.markPending')}
          </button>
        </div>
      </td>
    </tr>
  )
}
