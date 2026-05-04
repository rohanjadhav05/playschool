import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { ACTIVITIES } from '../../data/activities'
import { MEDIA } from '../../constants/media'
import SectionHeader from '../common/SectionHeader'

// First image for each activity card (falls back to gradient)
const ACTIVITY_PHOTO = {
  earlylearning: MEDIA.activities.earlylearning1,
  festival:      MEDIA.activities.festival1,
  fieldvisits:   MEDIA.activities.fieldvisits1,
  confidence:    MEDIA.activities.confidence1,
  art:           MEDIA.activities.art1,
  tiffin:        MEDIA.activities.habits1,
}

const CARD_GRADIENTS = [
  'from-blue-400 to-violet-400',
  'from-amber-400 to-yellow-400',
  'from-teal-400 to-green-400',
  'from-indigo-400 to-blue-500',
  'from-orange-400 to-red-400',
  'from-green-400 to-emerald-400',
]


function ActivityCard({ activity, gradient, index }) {
  const { t, lang } = useLanguage()
  const [imgError, setImgError] = useState(false)
  const photo = ACTIVITY_PHOTO[activity.id]
  const hasPhoto = photo && !photo.includes('activities/') && !imgError

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="flex-shrink-0 w-[72vw] sm:w-56 md:w-auto"
    >
      <Link to="/activities" className="block group">
        <div className="relative rounded-2xl overflow-hidden aspect-square">
          {hasPhoto ? (
            <>
              <img
                src={photo}
                alt={t(activity.titleKey)}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={() => setImgError(true)}
              />
              {/* Dark gradient overlay so text is readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </>
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
              <span className="text-5xl drop-shadow-sm">{activity.icon}</span>
            </div>
          )}

          {/* Emoji badge top-left */}
          <span className="absolute top-2.5 left-2.5 text-2xl drop-shadow">{activity.icon}</span>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
        </div>

        <p className="font-body font-semibold text-textPrimary text-sm mt-2.5 px-0.5 group-hover:text-cta transition-colors leading-snug">
          {t(activity.titleKey)}
        </p>
      </Link>
    </motion.div>
  )
}

export default function ActivityPreview() {
  const { t } = useLanguage()

  return (
    <section className="py-16 md:py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <SectionHeader
            title={t('activities.preview.title')}
            subtitle={t('activities.preview.subtitle')}
            align="left"
          />
          <Link
            to="/activities"
            className="hidden sm:flex items-center gap-1.5 font-body font-semibold text-cta hover:underline underline-offset-2 shrink-0"
          >
            {t('activities.preview.cta')}
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Activity photo cards — horizontal scroll on mobile, 3-col grid on md+ */}
        <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 md:mx-0 md:px-0 pb-2 md:pb-0">
          {ACTIVITIES.map((activity, i) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              gradient={CARD_GRADIENTS[i]}
              index={i}
            />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-6 sm:hidden text-center">
          <Link
            to="/activities"
            className="inline-flex items-center gap-1.5 font-body font-semibold text-cta hover:underline underline-offset-2"
          >
            {t('activities.preview.cta')}
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  )
}
