import React from 'react'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, Clock, Users, MapPin, ExternalLink } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { buildWaUrl } from '../../utils/whatsapp'

// A valid embed URL must come from the Google Maps "Embed a map" flow —
// it starts with google.com/maps/embed?pb=... Share links (maps.app.goo.gl)
// are not embeddable and fall back to the tap-to-open card.
const isValidEmbed = (url) =>
  !!url && url.includes('google.com/maps/embed') && !url.includes('PLACEHOLDER')

export default function BranchInfoBlock({ branch, showMap = true }) {
  const { t } = useLanguage()
  const waUrl = buildWaUrl(branch)
  const addressLine = `${branch.address.line1}${branch.address.line2 ? ', ' + branch.address.line2 : ''}, ${branch.address.city} — ${branch.address.pin}`
  const hasEmbed = showMap && isValidEmbed(branch.maps?.embedUrl)
  const hasShortUrl = !!branch.maps?.shortUrl

  return (
    <section className="py-12 md:py-16 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <span className="inline-block h-1.5 w-12 rounded-full bg-cta mb-2" />
          <h2 className="font-display font-bold text-2xl md:text-3xl text-textPrimary">
            {branch.shortName} branch info
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
            {branch.timing?.playschool && (
              <InfoRow icon={Clock} color="bg-cta-light text-cta" label="Playschool timing" value={branch.timing.playschool} />
            )}
            {branch.timing?.tuition && (
              <InfoRow icon={Clock} color="bg-secondary-light text-secondary" label="Tuition timing" value={branch.timing.tuition} />
            )}
            {branch.batchSize?.playschool && (
              <InfoRow icon={Users} color="bg-primary-light text-textPrimary" label="Playschool batch" value={`Up to ${branch.batchSize.playschool} students`} />
            )}
            {branch.batchSize?.tuition && (
              <InfoRow icon={Users} color="bg-accent-light text-accent-dark" label="Tuition batch" value={`Up to ${branch.batchSize.tuition} students`} />
            )}
            <InfoRow icon={Phone} color="bg-cta-light text-cta" label={t('contact.phone')} value={`+${branch.phone}`} href={`tel:+${branch.phone}`} dataBranch={branch.slug} />
            <InfoRow icon={MessageCircle} color="bg-green-100 text-whatsapp" label={t('contact.whatsapp')} value={`+${branch.whatsapp}`} href={waUrl} external dataBranch={branch.slug} />
            <InfoRow icon={MapPin} color="bg-secondary-light text-secondary" label={t('contact.address')} value={addressLine} href={branch.maps?.shortUrl} external full />
          </div>
        </motion.div>

        {showMap && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl overflow-hidden shadow-card"
          >
            {/* Mobile: lightweight tap-to-open card — no iframe weight on small screens */}
            <a
              href={branch.maps?.shortUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="md:hidden flex flex-col items-center justify-center gap-4 p-8 text-center min-h-[220px] bg-gradient-to-br from-secondary-light via-bg to-primary-light relative group"
              aria-label={`Open ${branch.name} in Google Maps`}
            >
              <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center shadow-card group-hover:scale-110 transition-transform">
                <MapPin size={26} className="text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-lg text-textPrimary mb-1">{t('maps.findHere')}</p>
                <p className="font-body text-textSecondary text-sm leading-snug">{addressLine}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 bg-secondary text-white font-body font-semibold text-sm px-4 py-2 rounded-full">
                {t('maps.openInGoogle')} <ExternalLink size={13} />
              </span>
            </a>

            {/* Desktop: full interactive iframe */}
            {hasEmbed ? (
              <iframe
                src={branch.maps.embedUrl}
                title={`${branch.name} location`}
                className="hidden md:block w-full border-0"
                style={{ height: '400px' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="hidden md:flex flex-col items-center justify-center gap-4 p-8 text-center min-h-[320px] bg-gradient-to-br from-secondary-light to-bg">
                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center">
                  <MapPin size={28} className="text-white" />
                </div>
                <p className="font-display font-bold text-xl text-textPrimary">{t('maps.findHere')}</p>
                <p className="font-body text-textSecondary text-sm">{addressLine}</p>
                {hasShortUrl && (
                  <a
                    href={branch.maps.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-secondary text-white font-body font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-secondary-dark transition-colors"
                  >
                    <MapPin size={15} />
                    {t('maps.openInGoogle')}
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}

function InfoRow({ icon: Icon, color, label, value, href, external, dataBranch, full }) {
  const inner = (
    <div className="flex items-start gap-3 bg-white rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-shadow">
      <div className={`${color} w-10 h-10 rounded-xl flex items-center justify-center shrink-0`}>
        <Icon size={16} />
      </div>
      <div className="min-w-0">
        <p className="font-body font-semibold text-[10px] text-textMuted uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p className="font-body text-textPrimary text-sm leading-snug break-words">{value}</p>
      </div>
    </div>
  )

  const className = full ? 'sm:col-span-2 block' : 'block'
  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        data-branch={dataBranch}
        className={className}
      >
        {inner}
      </a>
    )
  }
  return <div className={className}>{inner}</div>
}
