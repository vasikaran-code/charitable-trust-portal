import { useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import ProgramCard from '../components/ui/ProgramCard'
import CtaBanner from '../components/ui/CtaBanner'
import { programs, programCategories } from '../data/programs'
import type { ProgramCategory } from '../data/programs'
import { useI18n } from '../i18n/useI18n'
import './Programs.css'

type Filter = ProgramCategory | 'all'

export default function Programs() {
  const { t } = useI18n()
  const [filter, setFilter] = useState<Filter>('all')

  const filters: Filter[] = ['all', ...programCategories]
  const label = (f: Filter) =>
    f === 'all' ? t('programs.filterAll') : t(`programs.categories.${f}`)

  const visible =
    filter === 'all'
      ? programs
      : programs.filter((program) => program.category === filter)

  return (
    <>
      <PageHeader title={t('programs.pageTitle')} subtitle={t('programs.pageSubtitle')} />

      <section className="section">
        <div className="container">
          {/* Filter buttons */}
          <div className="programs-filter reveal" role="group" aria-label={t('programs.filterLabel')}>
            {filters.map((category) => (
              <button
                key={category}
                type="button"
                className={`programs-filter__btn ${filter === category ? 'is-active' : ''}`}
                aria-pressed={filter === category}
                onClick={() => setFilter(category)}
              >
                {label(category)}
              </button>
            ))}
          </div>

          {/* Program grid */}
          <div className="grid reveal" style={{ '--min': '300px' } as React.CSSProperties}>
            {visible.map((program) => (
              <ProgramCard key={program.id} program={program} detailed />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title={t('programs.ctaTitle')}
        text={t('programs.ctaText')}
        buttonLabel={t('common.joinUs')}
        buttonTo="/contact"
      />
    </>
  )
}
