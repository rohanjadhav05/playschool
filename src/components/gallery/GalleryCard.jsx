import React from 'react'

const ASPECT = {
  video:    'aspect-video',
  square:   'aspect-square',
  portrait: 'aspect-[4/5]',
}

const PLACEHOLDER = {
  activities: { gradient: 'from-orange-200 to-amber-100',  emoji: '🎨' },
  playschool: { gradient: 'from-yellow-200 to-lime-100',   emoji: '🌟' },
  festivals:  { gradient: 'from-orange-200 to-red-100',    emoji: '🪔' },
  events:     { gradient: 'from-purple-200 to-pink-100',   emoji: '🏆' },
  tuition:    { gradient: 'from-blue-200 to-indigo-100',   emoji: '📚' },
}

export default function GalleryCard({ item, onClick }) {
  const aspectClass = ASPECT[item.aspect] ?? 'aspect-video'
  const ph = PLACEHOLDER[item.category] ?? PLACEHOLDER.activities

  return (
    <div className="break-inside-avoid mb-3 md:mb-4">
      <button
        onClick={onClick}
        className="group relative w-full overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 block"
        aria-label={`View photo: ${item.caption}`}
      >
        <div className={`${aspectClass} w-full relative overflow-hidden`}>
          {(item.type === 'image' && item.src) || (item.type === 'video' && item.poster) ? (
            <img
              src={item.type === 'video' ? item.poster : item.src}
              alt={item.caption}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${ph.gradient} flex items-center justify-center`}>
              <span className="text-5xl select-none opacity-60">{ph.emoji}</span>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
            <p className="text-white font-body text-xs font-medium leading-tight line-clamp-2">
              {item.caption}
            </p>
          </div>

          {/* Video play indicator */}
          {item.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-textPrimary ml-1" />
              </div>
            </div>
          )}
        </div>
      </button>
    </div>
  )
}
