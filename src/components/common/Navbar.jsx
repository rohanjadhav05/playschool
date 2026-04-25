import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { SCHOOL } from '../../../school.config.js'

const NAV_LINKS = [
  { to: '/', key: 'nav.home' },
  { to: '/activities', key: 'nav.activities' },
  { to: '/programs', key: 'nav.programs' },
  { to: '/about', key: 'nav.about' },
  { to: '/gallery', key: 'nav.gallery' },
  { to: '/contact', key: 'nav.contact' },
]

export default function Navbar() {
  const { t, lang, setLang } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close drawer on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [])

  const toggleLang = () => setLang(lang === 'en' ? 'mr' : 'en')

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 font-display font-black text-xl text-textPrimary"
            >
              <span className="text-2xl">🌟</span>
              <span className="hidden sm:inline">{SCHOOL.name}</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {NAV_LINKS.map(({ to, key }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `font-body font-medium text-sm transition-colors ${
                      isActive ? 'text-cta' : 'text-textSecondary hover:text-textPrimary'
                    }`
                  }
                >
                  {t(key)}
                </NavLink>
              ))}
            </nav>

            {/* Desktop actions */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={toggleLang}
                className="min-w-[44px] min-h-[44px] px-4 py-2 rounded-full border-2 border-secondary text-secondary font-body font-semibold text-sm hover:bg-secondary hover:text-white transition-all duration-200"
              >
                {t('nav.langToggle')}
              </button>
              <a
                href={`tel:${SCHOOL.phone}`}
                className="flex items-center gap-2 bg-cta text-white px-4 py-2.5 rounded-full font-body font-semibold text-sm hover:bg-cta-dark transition-colors"
              >
                <Phone size={15} />
                {t('nav.callNow')}
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 text-textPrimary min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white flex flex-col pt-16"
          >
            <nav className="flex flex-col px-6 py-6 gap-1 flex-1">
              {NAV_LINKS.map(({ to, key }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `font-display font-bold text-2xl py-4 border-b border-border transition-colors ${
                      isActive ? 'text-cta' : 'text-textPrimary'
                    }`
                  }
                >
                  {t(key)}
                </NavLink>
              ))}
            </nav>

            <div className="px-6 pb-8 flex flex-col gap-3">
              <button
                onClick={() => {
                  toggleLang()
                  setMenuOpen(false)
                }}
                className="w-full py-3.5 rounded-full border-2 border-secondary text-secondary font-body font-semibold text-base hover:bg-secondary hover:text-white transition-all"
              >
                {t('nav.langToggle')}
              </button>
              <a
                href={`tel:${SCHOOL.phone}`}
                onClick={() => setMenuOpen(false)}
                className="w-full py-3.5 rounded-full bg-cta text-white font-body font-semibold text-base text-center hover:bg-cta-dark transition-colors"
              >
                📞 {t('nav.callNow')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
