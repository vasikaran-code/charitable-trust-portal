import { Link } from 'react-router-dom'
import './CtaBanner.css'

type Props = {
  title: string
  text: string
  buttonLabel: string
  buttonTo: string
}

/** Reusable call-to-action banner used at the end of several pages. */
export default function CtaBanner({ title, text, buttonLabel, buttonTo }: Props) {
  return (
    <section className="cta-banner">
      <div className="container cta-banner__inner reveal">
        <div>
          <h2 className="cta-banner__title">{title}</h2>
          <p className="cta-banner__text">{text}</p>
        </div>
        <Link to={buttonTo} className="btn btn--accent">
          {buttonLabel}
        </Link>
      </div>
    </section>
  )
}
