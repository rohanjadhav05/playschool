import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, MapPin } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { buildWaUrl } from '../../utils/whatsapp'
import AdmissionStatusPill from './AdmissionStatusPill'

export default function BranchCard({ branch, eager = false }) {
  const { t } = useLanguage()
  const heroPhoto = branch.photos && branch.photos.length > 0 ? branch.photos[0] : null
  const waUrl = buildWaUrl(branch)
  const addressLine = `${branch.address.line1}${branch.address.line2 ? ', ' + branch.address.line2 : ''}`

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden flex flex-col"
      data-branch={branch.slug}
    >
      <Link to={`/branches/${branch.slug}`} className="block relative">
        <div className="aspect-[16/10] bg-gradient-to-br from-primary-light via-primary to-primary-dark relative overflow-hidden">
          {heroPhoto ? (
            <img
              src={heroPhoto}
              alt={`${branch.name} — front view`}
              loading={eager ? 'eager' : 'lazy'}
              decoding="async"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-6xl select-none" aria-hidden="true">
              🏫
            </div>
          )}
          <div className="absolute top-3 left-3">
            <AdmissionStatusPill status={branch.admissionStatus} />
          </div>
        </div>
      </Link>

      <div className="p-5 md:p-6 flex flex-col gap-4 flex-1">
        <div>
          <h3 className="font-display font-bold text-xl text-textPrimary leading-tight mb-1">
            <Link to={`/branches/${branch.slug}`} className="hover:text-cta transition-colors">
              {branch.name}
            </Link>
          </h3>
          <p className="font-body text-textSecondary text-sm flex items-start gap-1.5">
            <MapPin size={14} className="mt-0.5 shrink-0 text-textMuted" />
            <span>{addressLine}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 mt-auto">
          <a
            href={`tel:+${branch.phone}`}
            data-branch={branch.slug}
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-cta text-white font-body font-semibold text-sm px-3 py-2.5 rounded-full hover:bg-cta-dark transition-colors"
          >
            <Phone size={14} />
            {t('branches.callThis')}
          </a>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-branch={branch.slug}
            className="inline-flex items-center justify-center bg-whatsapp text-white p-2.5 rounded-full hover:opacity-90 transition-opacity min-w-[42px] min-h-[42px]"
            aria-label={`WhatsApp ${branch.shortName}`}
          >
            <MessageCircle size={16} />
          </a>
        </div>

        <Link
          to={`/branches/${branch.slug}`}
          className="font-body font-semibold text-sm text-secondary hover:underline"
        >
          {t('branches.viewBranch')}
        </Link>
      </div>
    </motion.article>
  )
}
