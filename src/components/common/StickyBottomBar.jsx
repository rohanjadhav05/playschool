import React from 'react'
import { Phone, MessageCircle } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { useBranch } from '../../hooks/useBranch'

export default function StickyBottomBar() {
  const { t } = useLanguage()
  const { selectedBranch } = useBranch()
  if (!selectedBranch) return null

  const waUrl = `https://wa.me/${selectedBranch.whatsapp}?text=${encodeURIComponent(
    `Hi, I'm interested in Atharva Playschool (${selectedBranch.shortName} branch). Please contact me.`,
  )}`

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden border-t border-border bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <a
        href={`tel:+${selectedBranch.phone}`}
        data-branch={selectedBranch.slug}
        className="flex-1 flex items-center justify-center gap-2 py-4 bg-cta text-white font-body font-semibold text-sm min-h-[60px]"
      >
        <Phone size={18} />
        {t('sticky.call')}
      </a>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-branch={selectedBranch.slug}
        className="flex-1 flex items-center justify-center gap-2 py-4 bg-whatsapp text-white font-body font-semibold text-sm min-h-[60px]"
      >
        <MessageCircle size={18} />
        {t('sticky.whatsapp')}
      </a>
    </div>
  )
}
