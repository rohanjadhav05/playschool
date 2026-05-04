import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { SCHOOL } from '../../../school.config.js'
import SectionHeader from '../common/SectionHeader'

const CARD_STYLES = [
  { bg: 'from-primary/10 to-primary/5', border: 'border-primary/30', dot: 'bg-primary', year: 'bg-primary text-white' },
  { bg: 'from-secondary/10 to-secondary/5', border: 'border-secondary/30', dot: 'bg-secondary', year: 'bg-secondary text-white' },
  { bg: 'from-accent/10 to-accent/5', border: 'border-accent/30', dot: 'bg-accent', year: 'bg-accent text-white' },
  { bg: 'from-cta/10 to-cta/5', border: 'border-cta/30', dot: 'bg-cta', year: 'bg-cta text-white' },
  { bg: 'from-violet-100 to-purple-50', border: 'border-violet-300', dot: 'bg-violet-500', year: 'bg-violet-500 text-white' },
]

export default function TimelineSection() {
  const { t } = useLanguage()

  return (
    <section className="py-16 md:py-24 bg-surface overflow-hidden">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={t('about.timeline.title')}
          align="center"
          accent="secondary"
          className="mb-14"
        />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary via-accent to-violet-400 opacity-30" />

          {SCHOOL.milestones.map(({ year, emoji, label, desc }, i) => {
            const style = CARD_STYLES[i % CARD_STYLES.length]
            const isLeft = i % 2 === 0

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
                className="relative flex items-center mb-10 last:mb-0"
              >
                {/* Center dot */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                  <div className={`w-11 h-11 rounded-full ${style.dot} shadow-lg flex items-center justify-center text-lg border-4 border-white`}>
                    {emoji}
                  </div>
                </div>

                {/* Card — alternates left/right on md+, stacked on mobile */}
                <div className={`w-full md:w-[44%] ${isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'} pl-0`}>
                  <div className={`bg-gradient-to-br ${style.bg} border ${style.border} rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`font-display font-bold text-xs px-3 py-1 rounded-full ${style.year}`}>
                        {year}
                      </span>
                    </div>
                    <p className="font-display font-semibold text-textPrimary text-base leading-snug mb-1.5">
                      {label}
                    </p>
                    {desc && (
                      <p className="font-body text-textSecondary text-sm leading-relaxed">
                        {desc}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
