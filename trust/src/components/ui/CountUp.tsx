import { useEffect, useMemo, useState } from 'react'
import { useInView } from '../../lib/useInView'

/**
 * Animates a number from 0 to its target once it scrolls into view.
 * Works with values like "25,000+", "120+", or "60" — it keeps any leading
 * text and trailing suffix (e.g. "+") and only animates the digits.
 * Honours `prefers-reduced-motion` by showing the final value immediately.
 */

function parse(value: string) {
  const match = value.match(/[\d,]+/)
  if (!match) return null
  const digits = match[0]
  return {
    target: Number(digits.replace(/,/g, '')),
    prefix: value.slice(0, match.index),
    suffix: value.slice(match.index! + digits.length),
  }
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function CountUp({
  value,
  duration = 1500,
}: {
  value: string
  duration?: number
}) {
  // Memoise so `parsed` keeps a stable identity across the re-renders the
  // animation triggers — otherwise the effect would restart every frame.
  const parsed = useMemo(() => parse(value), [value])
  const { ref, inView } = useInView<HTMLSpanElement>()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!parsed || !inView) return
    if (prefersReducedMotion()) {
      setCount(parsed.target)
      return
    }

    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // easeOutCubic — fast then gently settling, never bouncing.
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(parsed.target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, parsed, duration])

  // If the value has no number, just render it unchanged.
  if (!parsed) return <span ref={ref}>{value}</span>

  return (
    <span ref={ref}>
      {parsed.prefix}
      {count.toLocaleString('en-US')}
      {parsed.suffix}
    </span>
  )
}
