import { useCallback, useEffect, useState } from 'react'
import './PhotoGallery.css'

type GalleryItem = {
  src: string
  caption: string
}

type Props = {
  images: GalleryItem[]
  // Translated labels for the lightbox controls.
  labels: {
    close: string
    prev: string
    next: string
  }
}

/**
 * Responsive photo grid with a built-in lightbox.
 *
 * Clicking a photo opens a full-screen preview. The lightbox supports:
 *   - Escape to close
 *   - Left/Right arrow keys to move between photos
 *   - Previous / Next / Close buttons
 */
export default function PhotoGallery({ images, labels }: Props) {
  // The index of the open image, or null when the lightbox is closed.
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const close = useCallback(() => setActiveIndex(null), [])

  const show = useCallback(
    (next: number) => {
      // Wrap around so navigation never runs off the ends.
      setActiveIndex((current) => {
        if (current === null) return current
        const count = images.length
        return (next + count) % count
      })
    },
    [images.length],
  )

  // Keyboard controls while the lightbox is open.
  useEffect(() => {
    if (activeIndex === null) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowRight') show(activeIndex + 1)
      if (event.key === 'ArrowLeft') show(activeIndex - 1)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeIndex, show, close])

  const activeImage = activeIndex === null ? null : images[activeIndex]

  return (
    <>
      <ul className="gallery-grid reveal">
        {images.map((image, index) => (
          <li key={image.src}>
            <button
              type="button"
              className="gallery-grid__item"
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={image.src}
                alt={image.caption}
                loading="lazy"
                // Fade in on load. The ref covers cached images that finish
                // loading before React attaches onLoad (otherwise they'd stay
                // hidden) — check `complete` on mount and reveal immediately.
                ref={(node) => {
                  if (node?.complete) node.classList.add('is-loaded')
                }}
                onLoad={(e) => e.currentTarget.classList.add('is-loaded')}
              />
              <span className="gallery-grid__caption">{image.caption}</span>
            </button>
          </li>
        ))}
      </ul>

      {activeImage && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.caption}
          onClick={close}
        >
          {/* Stop clicks on the inner content from closing the lightbox. */}
          <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox__btn lightbox__close"
              onClick={close}
              aria-label={labels.close}
            >
              ✕
            </button>
            <button
              type="button"
              className="lightbox__btn lightbox__prev"
              onClick={() => show((activeIndex ?? 0) - 1)}
              aria-label={labels.prev}
            >
              ‹
            </button>

            <figure className="lightbox__figure">
              {/* Key on the index so switching photos remounts the image and
                  re-triggers the short cross-fade animation. */}
              <img
                key={activeIndex}
                className="lightbox__image"
                src={activeImage.src}
                alt={activeImage.caption}
              />
              <figcaption>{activeImage.caption}</figcaption>
            </figure>

            <button
              type="button"
              className="lightbox__btn lightbox__next"
              onClick={() => show((activeIndex ?? 0) + 1)}
              aria-label={labels.next}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </>
  )
}
