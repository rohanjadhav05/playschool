import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, ShieldCheck } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { MEDIA } from '../../constants/media'

const GRADIENTS = {
  earlylearning: 'from-blue-300 to-violet-300',
  festival: 'from-amber-300 to-yellow-400',
  fieldvisits: 'from-teal-300 to-green-300',
  confidence: 'from-indigo-300 to-blue-400',
  art: 'from-orange-300 to-red-300',
  tiffin: 'from-green-300 to-emerald-300',
}

function MediaItem({ src, alt, icon, gradient, aspectClass = 'aspect-square' }) {
  const [hasError, setHasError] = useState(false)
  const isPlaceholder = !src || src.startsWith('ACTIVITY_') || src === 'null'

  if (isPlaceholder || hasError) {
    return (
      <div
        className={`bg-gradient-to-br ${gradient} rounded-2xl ${aspectClass} flex items-center justify-center`}
        aria-hidden="true"
      >
        <span className="text-5xl drop-shadow-sm">{icon}</span>
      </div>
    )
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden ${aspectClass}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={() => setHasError(true)}
      />
    </div>
  )
}

function MediaGrid({ activity }) {
  const { id, icon, imageKeys, videoKey } = activity
  const gradient = GRADIENTS[id] ?? 'from-yellow-300 to-orange-300'
  const mediaKeys = imageKeys ?? []
  const count = mediaKeys.length

  if (count === 0) {
    return (
      <MediaItem
        src={null}
        alt={`${id} activity`}
        icon={icon}
        gradient={gradient}
        aspectClass="aspect-video"
      />
    )
  }

  if (count === 1) {
    return (
      <MediaItem
        src={MEDIA.activities[mediaKeys[0]]}
        alt={`${id} activity`}
        icon={icon}
        gradient={gradient}
        aspectClass="aspect-video"
      />
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {mediaKeys.map((key, i) => (
        <MediaItem
          key={key}
          src={MEDIA.activities[key]}
          alt={`${id} activity ${i + 1}`}
          icon={icon}
          gradient={gradient}
          aspectClass="aspect-square"
        />
      ))}
    </div>
  )
}

function LearnsList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <CheckCircle2
            size={18}
            className="text-accent shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <span className="font-body text-textSecondary text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  )
}

// Picks the right language string/array, falls back to English
function loc(field, lang) {
  if (!field) return field
  if (typeof field === 'string' || Array.isArray(field)) return field
  return field[lang] ?? field.en ?? field
}

export default function ActivitySection({ activity, index }) {
  const { t, lang } = useLanguage()
  const { id, icon, titleKey } = activity
  const tagline    = loc(activity.tagline, lang)
  const description = loc(activity.description, lang)
  const learns     = loc(activity.learns, lang)
  const howWeDoIt  = loc(activity.howWeDoIt, lang)
  const parentNote = loc(activity.parentNote, lang)

  // Even index: image LEFT, text RIGHT. Odd: text LEFT, image RIGHT.
  const imageOrder = index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'
  const textOrder = index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'
  const bg = index % 2 === 0 ? 'bg-surface' : 'bg-bg'

  return (
    <section className={`${bg} py-16 md:py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Text — first in DOM so it appears on top on mobile */}
          <motion.div
            className={`${textOrder}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? 24 : -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            {/* Icon + title */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl" aria-hidden="true">{icon}</span>
              <div>
                <h2 className="font-display font-black text-2xl md:text-3xl text-textPrimary leading-tight">
                  {t(titleKey)}
                </h2>
                <p className="font-body italic text-textMuted text-sm mt-0.5">{tagline}</p>
              </div>
            </div>

            {/* Description */}
            <p className="font-body text-textSecondary text-base leading-relaxed mb-6 mt-4">
              {description}
            </p>

            {/* How we do it */}
            {howWeDoIt?.length > 0 && (
              <div className="mb-6">
                <p className="font-display font-bold text-sm text-textPrimary uppercase tracking-wider mb-3">
                  How a session works
                </p>
                <ol className="space-y-3">
                  {howWeDoIt.map((step, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-secondary text-white text-xs font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <p className="font-body text-textSecondary text-sm leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* What your child learns */}
            <div className="bg-accent-light/30 rounded-2xl p-5">
              <p className="font-display font-bold text-sm text-accent-dark uppercase tracking-wider mb-4">
                {t('activities.learns')}
              </p>
              <LearnsList items={learns} />
            </div>

            {/* Parent trust note */}
            {parentNote && (
              <div className="mt-4 flex items-start gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                <ShieldCheck size={16} className="text-green-600 shrink-0 mt-0.5" aria-hidden="true" />
                <p className="font-body text-green-800 text-sm leading-relaxed">{parentNote}</p>
              </div>
            )}
          </motion.div>

          {/* Media */}
          <motion.div
            className={`${imageOrder}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <MediaGrid activity={activity} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
