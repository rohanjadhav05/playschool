import React from 'react'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, MapPin, Clock } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { SCHOOL } from '../../../school.config.js'

const waUrl = `https://wa.me/${SCHOOL.whatsapp}?text=Hello%2C%20I%20am%20interested%20in%20admissions.%20Please%20contact%20me.`

const INFO_ITEMS = [
  {
    icon: Phone,
    labelKey: 'contact.phone',
    value: SCHOOL.phone,
    href: `tel:${SCHOOL.phone}`,
    color: 'bg-cta-light text-cta',
  },
  {
    icon: MessageCircle,
    labelKey: 'contact.whatsapp',
    value: SCHOOL.whatsapp,
    href: waUrl,
    color: 'bg-green-100 text-whatsapp',
    external: true,
  },
  {
    icon: MapPin,
    labelKey: 'contact.address',
    value: `${SCHOOL.address.line1}, ${SCHOOL.address.line2}, ${SCHOOL.address.city} — ${SCHOOL.address.pin}`,
    href: SCHOOL.maps.shortUrl,
    color: 'bg-secondary-light text-secondary',
    external: true,
  },
  {
    icon: Clock,
    labelKey: 'contact.hours',
    value: SCHOOL.timing.officeHours,
    href: null,
    color: 'bg-accent-light text-accent-dark',
  },
]

export default function ContactInfo() {
  const { t } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <span className="inline-block h-1.5 w-12 rounded-full bg-cta mb-4" />
      <h2 className="font-display font-bold text-2xl md:text-3xl text-textPrimary mb-2">
        {t('contact.title')}
      </h2>
      <p className="font-body text-textSecondary mb-8">{t('contact.subtitle')}</p>

      <div className="space-y-4">
        {INFO_ITEMS.map(({ icon: Icon, labelKey, value, href, color, external }) => {
          const content = (
            <div className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-shadow duration-200">
              <div className={`${color} w-11 h-11 rounded-xl flex items-center justify-center shrink-0`}>
                <Icon size={18} />
              </div>
              <div>
                <p className="font-body font-semibold text-xs text-textMuted uppercase tracking-wider mb-1">
                  {t(labelKey)}
                </p>
                <p className="font-body text-textPrimary text-sm leading-relaxed">{value}</p>
              </div>
            </div>
          )

          if (href) {
            return (
              <a
                key={labelKey}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="block"
              >
                {content}
              </a>
            )
          }

          return <div key={labelKey}>{content}</div>
        })}
      </div>
    </motion.div>
  )
}
