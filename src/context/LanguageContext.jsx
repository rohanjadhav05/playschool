import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import en from '../locales/en.json'
import mr from '../locales/mr.json'

const translations = { en, mr }

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem('lang') || 'en')

  const setLang = useCallback((newLang) => {
    setLangState(newLang)
    localStorage.setItem('lang', newLang)
    document.documentElement.lang = newLang
    const count = parseInt(localStorage.getItem('toggleClicks') || '0', 10)
    localStorage.setItem('toggleClicks', String(count + 1))
  }, [])

  const t = useCallback(
    (key) => translations[lang]?.[key] ?? translations['en']?.[key] ?? key,
    [lang]
  )

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
