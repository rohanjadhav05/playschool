import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { ACTIVITIES } from '../../data/activities'
import SectionHeader from '../common/SectionHeader'

const CARD_GRADIENTS = [
  'from-orange-300 to-red-300',
  'from-blue-300 to-purple-300',
  'from-purple-300 to-pink-300',
  'from-amber-300 to-yellow-300',
  'from-green-300 to-emerald-300',
  'from-indigo-300 to-blue-400',
]

export default function ActivityPreview() {
  const { t } = useLanguage()

  return (
    <section className="py-16 md:py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Horizontal scroll on mobile, 3-col grid on desktop */}
        <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 md:mx-0 md:px-0 pb-2 md:pb-0">
          {ACTIVITIES.map(({ id, icon, titleKey }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex-shrink-0 w-[72vw] sm:w-56 md:w-auto"
            >
              <Link to="/activities" className="block group">
                <div
                  className={`bg-gradient-to-br ${CARD_GRADIENTS[i]} rounded-2xl aspect-square flex items-center justify-center text-5xl relative overflow-hidden`}
                >
                  <span className="drop-shadow-sm">{icon}</span>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 rounded-2xl" />
                </div>
                <p className="font-body font-semibold text-textPrimary text-sm mt-2.5 px-0.5 group-hover:text-cta transition-colors">
                  {t(titleKey)}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA — mobile only */}
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
