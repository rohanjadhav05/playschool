import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, ExternalLink } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { SCHOOL } from '../../../school.config.js'

const isPlaceholder = (url) => !url || url.includes('PLACEHOLDER') || url.length < 20

export default function MapEmbed() {
  const { t } = useLanguage()
  const { maps, address } = SCHOOL

  return (
    <section className="py-16 md:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl overflow-hidden shadow-card"
        >
          {isPlaceholder(maps.embedUrl) ? (
            /* Placeholder map card — replace embedUrl in school.config.js to show real map */
            <div className="bg-gradient-to-br from-secondary-light to-bg min-h-[320px] flex flex-col items-center justify-center gap-4 p-8 text-center">
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center">
                <MapPin size={28} className="text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-xl text-textPrimary mb-1">Find Us Here</p>
                <p className="font-body text-textSecondary text-sm">
                  {address.line1}, {address.line2}
                  <br />
                  {address.city} — {address.pin}
                </p>
              </div>
              <a
                href={maps.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-secondary text-white font-body font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-secondary-dark transition-colors"
              >
                <MapPin size={15} />
                Open in Google Maps
                <ExternalLink size={13} />
              </a>
              <p className="font-body text-textMuted text-xs mt-1">
                Add your Google Maps embed URL in <code className="bg-border px-1 rounded">school.config.js</code> to show the map here.
              </p>
            </div>
          ) : (
            <iframe
              src={maps.embedUrl}
              title={`${SCHOOL.name} location`}
              className="w-full border-0"
              style={{ height: '400px' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          )}
        </motion.div>
      </div>
    </section>
  )
}
