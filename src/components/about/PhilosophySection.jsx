import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import SectionHeader from '../common/SectionHeader'

const PILLARS = [
  { icon: '🌱', titleKey: 'philosophy.childled.title', descKey: 'philosophy.childled.desc', bg: 'bg-green-100' },
  { icon: '🙏', titleKey: 'philosophy.values.title', descKey: 'philosophy.values.desc', bg: 'bg-amber-100' },
  { icon: '🎨', titleKey: 'philosophy.doing.title', descKey: 'philosophy.doing.desc', bg: 'bg-orange-100' },
  { icon: '🤝', titleKey: 'philosophy.parents.title', descKey: 'philosophy.parents.desc', bg: 'bg-blue-100' },
  { icon: '🌍', titleKey: 'philosophy.culture.title', descKey: 'philosophy.culture.desc', bg: 'bg-indigo-100' },
  { icon: '❤️', titleKey: 'philosophy.safe.title', descKey: 'philosophy.safe.desc', bg: 'bg-pink-100' },
]

export default function PhilosophySection() {
  const { t } = useLanguage()

  return (
    <section className="py-16 md:py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={t('about.philosophy.title')}
          subtitle={t('about.philosophy.subtitle')}
          className="mb-12"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map(({ icon, titleKey, descKey, bg }, i) => (
            <motion.div
              key={titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300"
            >
              <div className={`${bg} w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4`}>
                {icon}
              </div>
              <h3 className="font-display font-bold text-base text-textPrimary mb-2">
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
