import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { SCHOOL } from '../../../school.config.js'
import { MEDIA } from '../../constants/media'
import SectionHeader from '../common/SectionHeader'

function TeacherAvatar({ src, name }) {
  const [hasError, setHasError] = useState(false)
  const isPlaceholder = !src || src.includes('S3_URL') || src.includes('your-bucket')
  const initials = name
    .replace(/^Adv\.\s*/i, '')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  if (isPlaceholder || hasError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-primary via-[#FFB800] to-cta flex items-center justify-center">
        <span className="font-display font-black text-5xl text-white select-none">{initials}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={name}
      className="w-full h-full object-cover"
      onError={() => setHasError(true)}
    />
  )
}

const RING_COLORS = [
  'ring-primary',
  'ring-secondary',
]

function TeacherCard({ person, photoSrc, roleLabel, delay, ringIdx }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      className="bg-white rounded-3xl shadow-card overflow-hidden flex flex-col"
    >
      {/* Top portrait strip */}
      <div className="flex flex-col items-center pt-10 pb-6 px-6 bg-gradient-to-b from-surface to-white">
        <div className={`relative w-36 h-36 rounded-full overflow-hidden ring-4 ${RING_COLORS[ringIdx % RING_COLORS.length]} ring-offset-4 shadow-card-hover mb-4`}>
          <TeacherAvatar src={photoSrc} name={person.name} />
        </div>
        <h3 className="font-display font-black text-xl text-textPrimary text-center leading-tight">
          {person.name}
        </h3>
        <p className="font-body text-sm text-textMuted mt-0.5">{roleLabel}</p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 justify-center mt-3">
          <span className="bg-primary-light text-textPrimary font-body font-medium text-xs px-3 py-1 rounded-full">
            {person.qualifications}
          </span>
          <span className="bg-secondary-light text-secondary-dark font-body font-medium text-xs px-3 py-1 rounded-full">
            {person.experience} Experience
          </span>
        </div>

        {person.specializations && (
          <p className="font-body text-xs text-textMuted text-center mt-2 leading-relaxed">
            {person.specializations}
          </p>
        )}
      </div>

      {/* Bio + quote */}
      <div className="px-6 pb-8 flex flex-col flex-1">
        <p className="font-body text-textSecondary text-sm leading-relaxed mb-5">
          {person.bio}
        </p>

        <blockquote className="relative bg-primary-light/50 rounded-2xl px-5 py-4 border-l-4 border-primary mt-auto">
          <span className="absolute top-1 left-3 font-display font-black text-3xl text-primary/30 leading-none select-none">
            "
          </span>
          <p className="font-body italic text-textPrimary text-sm leading-relaxed mt-1">
            {person.quote}
          </p>
          <p className="font-body font-semibold text-textMuted text-xs mt-2">— {person.name}</p>
        </blockquote>
      </div>
    </motion.div>
  )
}

export default function TeacherProfile() {
  const { t } = useLanguage()
  const { founder, principal } = SCHOOL

  return (
    <section className="py-16 md:py-20 bg-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={t('about.team.heading')}
          subtitle={t('about.team.subtitle')}
          align="center"
          accent="primary"
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TeacherCard
            person={founder}
            photoSrc={MEDIA.about.founder}
            roleLabel={t('about.founder.title')}
            delay={0}
            ringIdx={0}
          />
          <TeacherCard
            person={principal}
            photoSrc={MEDIA.about.teacher}
            roleLabel={t('about.principal.title')}
            delay={0.12}
            ringIdx={1}
          />
        </div>
      </div>
    </section>
  )
}
