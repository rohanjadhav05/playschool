import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { SCHOOL } from '../../../school.config.js'
import { MEDIA } from '../../constants/media'

function TeacherAvatar({ src, name }) {
  const [hasError, setHasError] = useState(false)
  const isPlaceholder = !src || src === 'TEACHER_S3_URL' || src.includes('your-bucket')
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  if (isPlaceholder || hasError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-primary via-[#FFB800] to-cta flex items-center justify-center">
        <span className="font-display font-black text-6xl text-white select-none">{initials}</span>
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

export default function TeacherProfile() {
  const { t } = useLanguage()
  const { teacher } = SCHOOL

  return (
    <section className="py-16 md:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Portrait column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="flex flex-col items-center text-center"
          >
            {/* Circular portrait with decorative ring */}
            <div className="relative mb-6">
              <div className="w-52 h-52 lg:w-64 lg:h-64 rounded-full overflow-hidden ring-4 ring-primary ring-offset-4 shadow-card-hover">
                <TeacherAvatar src={MEDIA.about.teacher} name={teacher.name} />
              </div>
              {/* Decorative badge */}
              <div className="absolute -bottom-3 -right-3 bg-primary rounded-2xl px-3 py-2 shadow-md">
                <p className="font-display font-black text-sm text-textPrimary leading-none">
                  {teacher.experience}
                </p>
                <p className="font-body text-xs text-textPrimary/80">Experience</p>
              </div>
            </div>

            <h2 className="font-display font-black text-2xl text-textPrimary mb-1">
              {teacher.name}
            </h2>
            <p className="font-body text-textMuted text-sm mb-2">{t('about.teacher.title')}</p>
            <span className="bg-secondary-light text-secondary-dark font-body font-medium text-xs px-3 py-1 rounded-full">
              {teacher.qualifications}
            </span>
          </motion.div>

          {/* Content column */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <span className="inline-block h-1.5 w-12 rounded-full bg-secondary mb-4" />
            <div className="space-y-4 mb-8">
              {teacher.bio.map((para, i) => (
                <p key={i} className="font-body text-textSecondary text-base leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Pull quote */}
            <blockquote className="relative bg-primary-light/50 rounded-2xl px-6 py-5 border-l-4 border-primary">
              <span className="absolute top-2 left-4 font-display font-black text-4xl text-primary/40 leading-none select-none">
                "
              </span>
              <p className="font-body italic text-textPrimary text-base leading-relaxed mt-2">
                {teacher.quote}
              </p>
              <p className="font-body font-semibold text-textMuted text-sm mt-3">
                — {teacher.name}
              </p>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
