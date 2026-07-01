import { donation } from '../../data/donation'
import { useI18n } from '../../i18n/useI18n'
import CopyButton from '../ui/CopyButton'

/**
 * Bank transfer section: shows the full account details with copy buttons for
 * the account number, the IFSC code, and all details at once.
 * (Styles live in src/pages/Donate.css.)
 */
export default function BankSection() {
  const { t } = useI18n()
  const { bank } = donation

  // The rows to display, in order. `label` is a translation key suffix.
  const rows = [
    { key: 'accountName', value: bank.accountName },
    { key: 'accountNumber', value: bank.accountNumber },
    { key: 'bankName', value: bank.bankName },
    { key: 'branchName', value: bank.branchName },
    { key: 'ifsc', value: bank.ifsc },
    { key: 'accountType', value: bank.accountType },
  ]

  // Plain-text block used by the "Copy all details" button.
  const allDetails = rows
    .map((row) => `${t(`donate.bank.${row.key}`)}: ${row.value}`)
    .join('\n')

  return (
    <div className="card donate-method">
      <p className="section__eyebrow">{t('donate.bank.eyebrow')}</p>
      <h3 className="donate-method__title">{t('donate.bank.title')}</h3>
      <p className="donate-method__subtitle">{t('donate.bank.subtitle')}</p>

      <dl className="donate-bank">
        {rows.map((row) => (
          <div key={row.key} className="donate-bank__row">
            <dt>{t(`donate.bank.${row.key}`)}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="donate-method__actions">
        <CopyButton value={bank.accountNumber} label={t('donate.bank.copyAccount')} />
        <CopyButton value={bank.ifsc} label={t('donate.bank.copyIfsc')} />
        <CopyButton value={allDetails} label={t('donate.bank.copyAll')} />
      </div>
    </div>
  )
}
