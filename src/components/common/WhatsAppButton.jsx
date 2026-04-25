import React from 'react'
import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { SCHOOL } from '../../../school.config.js'

export default function WhatsAppButton() {
  const { t } = useLanguage()
  const waUrl = `https://wa.me/${SCHOOL.whatsapp}?text=Hello%2C%20I%20am%20interested%20in%20admissions%20for%20my%20child.%20Please%20contact%20me.`

  return (
    <motion.a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      title={t('whatsapp.tooltip')}
      aria-label={t('whatsapp.tooltip')}
      className="hidden md:flex fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-whatsapp text-white items-center justify-center shadow-lg group"
      animate={{
        boxShadow: [
          '0 0 0 0 rgba(37,211,102,0.4)',
          '0 0 0 14px rgba(37,211,102,0)',
        ],
      }}
      transition={{ repeat: Infinity, duration: 2 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle size={26} />
      <span className="absolute right-16 bg-textPrimary text-white text-xs font-body px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {t('whatsapp.tooltip')}
      </span>
    </motion.a>
  )
}
