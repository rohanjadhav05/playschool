import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { MEDIA } from '../../constants/media'
import GalleryCard from './GalleryCard'
import Lightbox from './Lightbox'

const FILTERS = [
  { key: 'all',        labelKey: 'gallery.filter.all' },
  { key: 'playschool', labelKey: 'gallery.filter.playschool' },
  { key: 'activities', labelKey: 'gallery.filter.activities' },
  { key: 'festivals',  labelKey: 'gallery.filter.festivals' },
  { key: 'events',     labelKey: 'gallery.filter.events' },
  { key: 'tuition',    labelKey: 'gallery.filter.tuition' },
]

export default function GalleryGrid() {
  const { t } = useLanguage()
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const allItems = MEDIA.gallery.items
  const filtered = activeFilter === 'all'
    ? allItems
    : allItems.filter((item) => item.category === activeFilter)

  const openLightbox = useCallback((index) => setLightboxIndex(index), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i <= 0 ? filtered.length - 1 : i - 1))
  }, [filtered.length])

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i >= filtered.length - 1 ? 0 : i + 1))
  }, [filtered.length])

  return (
    <section className="py-12 md:py-16 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter tabs */}
        <div className="overflow-x-auto pb-2 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex gap-2 min-w-max sm:flex-wrap sm:min-w-0 sm:justify-center">
            {FILTERS.map(({ key, labelKey }) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`px-4 py-2 rounded-full font-body font-semibold text-sm whitespace-nowrap transition-all duration-200 ${
                  activeFilter === key
                    ? 'bg-secondary text-white shadow-sm'
                    : 'bg-white text-textSecondary border border-border hover:border-secondary hover:text-secondary'
                }`}
              >
                {t(labelKey)}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry grid */}
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="columns-2 sm:columns-3 lg:columns-4 gap-3 md:gap-4"
        >
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <p className="font-body text-textMuted text-sm">No photos in this category yet. Check back soon!</p>
            </div>
          ) : (
            filtered.map((item, index) => (
              <GalleryCard
                key={item.id}
                item={item}
                onClick={() => openLightbox(index)}
              />
            ))
          )}
        </motion.div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={filtered}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </section>
  )
}
