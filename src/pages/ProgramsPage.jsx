import React from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function ProgramsPage() {
  const { t } = useLanguage()

  return (
    <div className="pt-16 md:pt-20 min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="text-center">
        <h1 className="font-display font-black text-4xl md:text-5xl text-textPrimary mb-4">
          {t('programs.title')}
        </h1>
        <p className="font-body text-textSecondary text-lg max-w-lg mx-auto mb-4">
          {t('programs.subtitle')}
        </p>
        <p className="font-body text-textMuted text-sm italic">Coming in Phase 4 →</p>
      </div>
    </div>
  )
}
