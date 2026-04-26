import React from 'react'
import { useLanguage } from '../../context/LanguageContext'

export default function MobileLangPill() {
  const { lang, setLang } = useLanguage()

  return (
    <div className="fixed bottom-[72px] right-3 z-40 flex md:hidden">
      <div className="flex rounded-full border border-border bg-white shadow-md overflow-hidden text-xs font-body font-semibold">
        <button
          onClick={() => setLang('en')}
          className={`px-3 py-1.5 transition-colors ${
            lang === 'en' ? 'bg-secondary text-white' : 'text-textSecondary hover:bg-bg'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLang('mr')}
          className={`px-3 py-1.5 transition-colors font-devanagari ${
            lang === 'mr' ? 'bg-secondary text-white' : 'text-textSecondary hover:bg-bg'
          }`}
        >
          म
        </button>
      </div>
    </div>
  )
}
