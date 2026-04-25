import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { TESTIMONIALS } from '../../data/testimonials'
import SectionHeader from '../common/SectionHeader'

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5 mb-3" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`text-base ${i < count ? 'text-primary' : 'text-border'}`}>
          ★
        </span>
      ))}
    </div>
  )
}

function TestimonialCard({ quote, parentName, childInfo, rating, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex-shrink-0 w-[85vw] sm:w-72 md:w-auto bg-white rounded-2xl shadow-card p-6 flex flex-col snap-start"
    >
      {/* Decorative quote mark */}
      <span className="font-display font-black text-5xl text-primary leading-none mb-2 select-none">
        "
      </span>

      <Stars count={rating} />

      <p className="font-body text-textSecondary text-sm leading-relaxed italic flex-1 mb-4">
        {quote}
      </p>

      <div className="border-t border-border pt-4">
        <p className="font-body font-semibold text-textPrimary text-sm">{parentName}</p>
        <p className="font-body text-textMuted text-xs mt-0.5">{childInfo}</p>
      </div>
    </motion.div>
  )
}

export default function TestimonialsSnippet() {
  const { t } = useLanguage()

  return (
    <section className="py-16 md:py-20 bg-primary-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={t('testimonials.title')}
          subtitle={t('testimonials.subtitle')}
          className="mb-10"
        />

        {/* Scroll carousel on mobile, 3-col grid on desktop */}
        <div className="flex md:grid md:grid-cols-3 gap-5 overflow-x-auto md:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x md:snap-none -mx-4 px-4 md:mx-0 md:px-0 pb-2 md:pb-0">
          {TESTIMONIALS.map((t_, i) => (
            <TestimonialCard
              key={t_.id}
              quote={t_.quote}
              parentName={t_.parentName}
              childInfo={t_.childInfo}
              rating={t_.rating}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
