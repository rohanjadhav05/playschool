import React from 'react'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, Calendar, MapPin } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { buildWaUrl } from '../../utils/whatsapp'
import AdmissionStatusPill from './AdmissionStatusPill'

export default function BranchHeroSection({ branch }) {
  const { t } = useLanguage()
  const heroPhoto = branch.photos && branch.photos.length > 0 ? branch.photos[0] : null
  const addressLine = `${branch.address.line1}${branch.address.line2 ? ', ' + branch.address.line2 : ''}, ${branch.address.city}`

  return (
    <section className="relative pt-20 md:pt-28 pb-12 md:pb-16 overflow-hidden">
      {/* Photo or brand-yellow gradient fallback */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {heroPhoto ? (
          <>
            <img src={heroPhoto} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-light via-primary to-cta/40" />
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-body font-semibold text-sm ${heroPhoto ? 'bg-white/90 text-textPrimary' : 'bg-white text-cta'}`}>
              🏫 {branch.shortName}
            </span>
            <AdmissionStatusPill status={branch.admissionStatus} />
          </div>

          <h1 className={`font-display font-black text-4xl sm:text-5xl md:text-6xl leading-tight mb-3 ${heroPhoto ? 'text-white' : 'text-textPrimary'}`}>
            {branch.name}
          </h1>

          <p className={`font-body text-base md:text-lg flex items-start gap-2 mb-8 ${heroPhoto ? 'text-white/90' : 'text-textSecondary'}`}>
            <MapPin size={18} className="mt-1 shrink-0" />
            <span>{addressLine} — {branch.address.pin}</span>
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:+${branch.phone}`}
              data-branch={branch.slug}
              className="inline-flex items-center gap-2 bg-cta text-white font-body font-semibold text-base px-6 py-3 rounded-full hover:bg-cta-dark transition-colors shadow-cta"
            >
              <Phone size={16} />
              {t('branches.callThis')}
            </a>
            <a
              href={buildWaUrl(branch)}
              target="_blank"
              rel="noopener noreferrer"
              data-branch={branch.slug}
              className="inline-flex items-center gap-2 bg-whatsapp text-white font-body font-semibold text-base px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
            <a
              href={`/branches/${branch.slug}/contact`}
              data-branch={branch.slug}
              className={`inline-flex items-center gap-2 font-body font-semibold text-base px-6 py-3 rounded-full border-2 transition-colors ${
                heroPhoto
                  ? 'border-white text-white hover:bg-white hover:text-cta'
                  : 'border-cta text-cta hover:bg-cta hover:text-white'
              }`}
            >
              <Calendar size={16} />
              {t('branch.cta.bookVisit')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
