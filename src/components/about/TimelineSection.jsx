import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { SCHOOL } from '../../../school.config.js'
import SectionHeader from '../common/SectionHeader'

const DOT_COLORS = ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-cta']

export default function TimelineSection() {
  const { t } = useLanguage()

  return (
    <section className="py-16 md:py-20 bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={t('about.timeline.title')}
          align="left"
          accent="secondary"
          className="mb-10"
        />

        <div className="relative pl-10">
          {/* Vertical gradient line */}
          <div className="absolute left-3.5 top-3 bottom-3 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

          {SCHOOL.milestones.map(({ year, label }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="relative mb-10 last:mb-0"
            >
              {/* Dot */}
              <div
                className={`absolute -left-10 w-7 h-7 rounded-full ${DOT_COLORS[i % DOT_COLORS.length]} border-2 border-white shadow-md flex items-center justify-center`}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-white/60" />
              </div>

              {/* Content */}
              <div className="bg-white rounded-2xl p-5 shadow-card">
                <span
                  className={`inline-block font-display font-bold text-xs px-2.5 py-1 rounded-full mb-2 ${
                    year === 'Today'
                      ? 'bg-accent-light text-accent-dark'
                      : 'bg-primary-light text-textPrimary'
                  }`}
                >
                  {year}
                </span>
                <p className="font-body text-textSecondary text-sm leading-relaxed">{label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
