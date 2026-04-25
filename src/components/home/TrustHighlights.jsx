import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import SectionHeader from '../common/SectionHeader'

const HIGHLIGHTS = [
  {
    icon: '🛡️',
    titleKey: 'highlights.safe.title',
    descKey: 'highlights.safe.desc',
    iconBg: 'bg-blue-100',
  },
  {
    icon: '👩‍🏫',
    titleKey: 'highlights.teacher.title',
    descKey: 'highlights.teacher.desc',
    iconBg: 'bg-yellow-100',
  },
  {
    icon: '🎨',
    titleKey: 'highlights.activity.title',
    descKey: 'highlights.activity.desc',
    iconBg: 'bg-orange-100',
  },
  {
    icon: '🙏',
    titleKey: 'highlights.culture.title',
    descKey: 'highlights.culture.desc',
    iconBg: 'bg-green-100',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
}

export default function TrustHighlights() {
  const { t } = useLanguage()

  return (
    <section className="py-16 md:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={t('highlights.title')}
          subtitle={t('highlights.subtitle')}
          className="mb-12"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HIGHLIGHTS.map(({ icon, titleKey, descKey, iconBg }, i) => (
            <motion.div
              key={titleKey}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ y: -4, boxShadow: '0 8px 40px rgba(0,0,0,0.14)' }}
              className="bg-white rounded-2xl p-6 shadow-card cursor-default"
            >
              <div className={`${iconBg} w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4`}>
                {icon}
              </div>
              <h3 className="font-display font-bold text-lg text-textPrimary mb-2">
                {t(titleKey)}
              </h3>
              <p className="font-body text-textSecondary text-sm leading-relaxed">
                {t(descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
