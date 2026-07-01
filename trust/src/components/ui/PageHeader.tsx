import './PageHeader.css'

type Props = {
  title: string
  subtitle?: string
}

/** A simple banner shown at the top of inner pages. */
export default function PageHeader({ title, subtitle }: Props) {
  return (
    <div className="page-header">
      <div className="container">
        <h1 className="page-header__title">{title}</h1>
        {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
      </div>
    </div>
  )
}
