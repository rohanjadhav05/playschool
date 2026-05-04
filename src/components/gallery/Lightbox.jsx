import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import VideoPlayer from './VideoPlayer'

const PLACEHOLDER_GRADIENTS = {
  activities: 'from-orange-200 to-amber-100',
  playschool: 'from-yellow-200 to-lime-100',
  festivals:  'from-orange-200 to-red-100',
  events:     'from-purple-200 to-pink-100',
  tuition:    'from-blue-200 to-indigo-100',
}

export default function Lightbox({ items, currentIndex, onClose, onPrev, onNext }) {
  const touchStartX = useRef(null)
  const item = items[currentIndex]

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(delta) > 50) {
      delta < 0 ? onNext() : onPrev()
    }
  }

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center"
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Prev */}
        {items.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            className="absolute left-3 md:left-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {/* Next */}
        {items.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onNext() }}
            className="absolute right-3 md:right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={22} />
          </button>
        )}

        {/* Image / content */}
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.2 }}
          className="relative flex flex-col items-center max-w-4xl w-full mx-14 md:mx-20"
          onClick={(e) => e.stopPropagation()}
        >
          {item.type === 'video' ? (
            <VideoPlayer
              src={item.src}
              className="max-h-[75vh] max-w-full w-auto rounded-2xl shadow-2xl"
            />
          ) : item.src ? (
            <img
              src={item.src}
              alt={item.caption}
              className="max-h-[75vh] max-w-full w-auto rounded-2xl object-contain shadow-2xl"
            />
          ) : (
            <div className={`w-full aspect-video rounded-2xl bg-gradient-to-br ${PLACEHOLDER_GRADIENTS[item.category] ?? 'from-gray-200 to-gray-100'} flex items-center justify-center`}>
              <span className="text-8xl opacity-40">
                {{ activities: '🎨', playschool: '🌟', festivals: '🪔', events: '🏆', tuition: '📚' }[item.category]}
              </span>
            </div>
          )}

          {/* Caption + counter */}
          <div className="mt-4 text-center">
            <p className="font-body text-white/90 text-sm">{item.caption}</p>
            <p className="font-body text-white/40 text-xs mt-1">
              {currentIndex + 1} / {items.length}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}
