import React from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="pt-16 md:pt-20">
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light via-bg to-bg px-4">
        <div className="text-center max-w-2xl">
          <h1 className="font-display font-black text-5xl md:text-7xl text-textPrimary leading-tight mb-4">
            {t('hero.headline1')}
            <br />
            {t('hero.headline2')}
          </h1>
          <p className="font-body text-textSecondary text-lg md:text-xl mb-6 max-w-lg mx-auto">
            {t('hero.subheadline')}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[t('hero.badge1'), t('hero.badge2'), t('hero.badge3')].map((badge) => (
              <span
                key={badge}
                className="bg-white border border-border text-textPrimary font-body font-medium text-sm px-4 py-2 rounded-full shadow-card"
              >
                {badge}
              </span>
            ))}
          </div>
          <p className="font-body text-textMuted text-sm italic">
            Full home page coming in Phase 2 →
          </p>
        </div>
      </section>
    </div>
  )
}
