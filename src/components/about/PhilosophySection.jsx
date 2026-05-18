import React from 'react'
import { Sprout, Heart, Palette, Users, Globe, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import SectionHeader from '../common/SectionHeader'

const PILLARS = [
  { Icon: Sprout,     titleKey: 'philosophy.childled.title', descKey: 'philosophy.childled.desc', bg: 'bg-green-50',  iconColor: 'text-green-600'  },
  { Icon: Heart,      titleKey: 'philosophy.values.title',   descKey: 'philosophy.values.desc',   bg: 'bg-amber-50',  iconColor: 'text-amber-600'  },
  { Icon: Palette,    titleKey: 'philosophy.doing.title',    descKey: 'philosophy.doing.desc',    bg: 'bg-orange-50', iconColor: 'text-orange-600' },
  { Icon: Users,      titleKey: 'philosophy.parents.title',  descKey: 'philosophy.parents.desc',  bg: 'bg-blue-50',   iconColor: 'text-blue-600'   },
  { Icon: Globe,      titleKey: 'philosophy.culture.title',  descKey: 'philosophy.culture.desc',  bg: 'bg-indigo-50', iconColor: 'text-indigo-600' },
  { Icon: ShieldCheck,titleKey: 'philosophy.safe.title',     descKey: 'philosophy.safe.desc',     bg: 'bg-rose-50',   iconColor: 'text-rose-600'   },
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
          {PILLARS.map(({ Icon, titleKey, descKey, bg, iconColor }, i) => (
            <motion.div
              key={titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300"
            >
              <div className={`${bg} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                <Icon size={22} className={iconColor} />
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
