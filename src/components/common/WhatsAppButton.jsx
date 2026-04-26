import React from 'react'
import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { useBranch } from '../../hooks/useBranch'

export default function WhatsAppButton() {
  const { t } = useLanguage()
  const { selectedBranch } = useBranch()
  if (!selectedBranch) return null

  const waUrl = `https://wa.me/${selectedBranch.whatsapp}?text=${encodeURIComponent(
    `Hi, I'm interested in Atharva Playschool (${selectedBranch.shortName} branch). Please contact me.`,
  )}`

  return (
    <motion.a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-branch={selectedBranch.slug}
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
        {selectedBranch.shortName} · {t('whatsapp.tooltip')}
      </span>
    </motion.a>
  )
}
