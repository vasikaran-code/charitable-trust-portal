import type { Program } from '../../data/programs'
import { useI18n } from '../../i18n/useI18n'
import './ProgramCard.css'

type Props = {
  program: Program
  // When true, show the full objectives list (used on the Programs page).
  detailed?: boolean
}

/** Card that displays a single program. Reused on Home and Programs pages. */
export default function ProgramCard({ program, detailed = false }: Props) {
  const { t, tList } = useI18n()
  const base = `programs.items.${program.id}`
  const objectives = tList<string>(`${base}.objectives`)

  return (
    <article className="card card--hover program-card">
      <div className="program-card__icon" aria-hidden="true">
        {program.icon}
      </div>
      <span className="badge">{t(`programs.categories.${program.category}`)}</span>
      <h3 className="program-card__title">{t(`${base}.title`)}</h3>
      <p className="program-card__summary">{t(`${base}.summary`)}</p>

      {detailed && (
        <>
          <h4 className="program-card__subhead">{t('programs.objectivesLabel')}</h4>
          <ul className="program-card__objectives">
            {objectives.map((obj) => (
              <li key={obj}>{obj}</li>
            ))}
          </ul>
        </>
      )}

      <p className="program-card__impact">
        <strong>{t('programs.impactLabel')}:</strong> {t(`${base}.impact`)}
      </p>
    </article>
  )
}
