/**
 * Gallery photos and videos — non-translatable shape only.
 *
 * Captions live in the locale files under `gallery.photos.<id>`, and video
 * titles under `gallery.videos.<id>`. Images are static files in
 * `public/gallery/`; replace the placeholders with real photos when available.
 */

export type GalleryImage = {
  id: string
  src: string
}

export const galleryImages: GalleryImage[] = [
  { id: 'health-camp', src: '/gallery/photo-1.svg' },
  { id: 'scholarship-day', src: '/gallery/photo-2.svg' },
  { id: 'tree-plantation', src: '/gallery/photo-3.svg' },
  { id: 'skill-training', src: '/gallery/photo-4.svg' },
  { id: 'school-kits', src: '/gallery/photo-5.svg' },
  { id: 'digital-lab', src: '/gallery/photo-6.svg' },
  { id: 'elder-care', src: '/gallery/photo-7.svg' },
  { id: 'relief-drive', src: '/gallery/photo-8.svg' },
  { id: 'pond-restoration', src: '/gallery/photo-9.svg' },
]

export type GalleryVideo = {
  id: string
  // A YouTube embed URL. Replace with the trust's own videos.
  embedUrl: string
}

export const galleryVideos: GalleryVideo[] = [
  { id: 'journey', embedUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4' },
  { id: 'voices', embedUrl: 'https://www.youtube.com/embed/aqz-KE-bpKQ' },
]
