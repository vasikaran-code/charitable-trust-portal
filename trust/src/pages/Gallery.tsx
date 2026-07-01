import PageHeader from '../components/ui/PageHeader'
import PhotoGallery from '../components/ui/PhotoGallery'
import { galleryImages, galleryVideos } from '../data/gallery'
import { useI18n } from '../i18n/useI18n'
import './Gallery.css'

export default function Gallery() {
  const { t } = useI18n()

  // Build the translated photo list the presentational gallery expects.
  const images = galleryImages.map((image) => ({
    src: image.src,
    caption: t(`gallery.photos.${image.id}`),
  }))

  return (
    <>
      <PageHeader title={t('gallery.pageTitle')} subtitle={t('gallery.pageSubtitle')} />

      {/* Photos */}
      <section className="section">
        <div className="container">
          <div className="section__head reveal">
            <span className="section__eyebrow">{t('gallery.photosEyebrow')}</span>
            <h2 className="section__title">{t('gallery.photosTitle')}</h2>
            <p className="section__subtitle">{t('gallery.photosSubtitle')}</p>
          </div>
          <PhotoGallery
            images={images}
            labels={{
              close: t('gallery.close'),
              prev: t('gallery.prev'),
              next: t('gallery.next'),
            }}
          />
        </div>
      </section>

      {/* Videos */}
      <section className="section section--surface">
        <div className="container">
          <div className="section__head reveal">
            <span className="section__eyebrow">{t('gallery.videosEyebrow')}</span>
            <h2 className="section__title">{t('gallery.videosTitle')}</h2>
          </div>
          <div className="grid reveal" style={{ '--min': '320px' } as React.CSSProperties}>
            {galleryVideos.map((video) => {
              const title = t(`gallery.videos.${video.id}`)
              return (
                <div key={video.id} className="gallery-video card">
                  <div className="gallery-video__frame">
                    <iframe
                      src={video.embedUrl}
                      title={title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="gallery-video__title">{title}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
