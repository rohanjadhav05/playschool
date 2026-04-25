import React from 'react'
import { Phone, MessageCircle } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { SCHOOL } from '../../../school.config.js'

export default function StickyBottomBar() {
  const { t } = useLanguage()
  const waUrl = `https://wa.me/${SCHOOL.whatsapp}?text=Hello%2C%20I%20am%20interested%20in%20admissions%20for%20my%20child.%20Please%20contact%20me.`

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden border-t border-border bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <a
        href={`tel:${SCHOOL.phone}`}
        className="flex-1 flex items-center justify-center gap-2 py-4 bg-cta text-white font-body font-semibold text-sm min-h-[60px]"
      >
        <Phone size={18} />
        {t('sticky.call')}
      </a>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 py-4 bg-whatsapp text-white font-body font-semibold text-sm min-h-[60px]"
      >
        <MessageCircle size={18} />
        {t('sticky.whatsapp')}
      </a>
    </div>
  )
}
