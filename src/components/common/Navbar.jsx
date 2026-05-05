import React, { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Phone, MapPin, ChevronDown, Check } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { useBranch } from '../../hooks/useBranch'
import { BRAND } from '../../../school.config.js'

const NAV_LINKS = [
  { to: '/',           labelKey: 'nav.home'      },
  { to: '/activities', labelKey: 'nav.activities'},
  { to: '/programs',   labelKey: 'nav.programs'  },
  { to: '/about',      labelKey: 'nav.about'     },
  { to: '/branches',   labelKey: 'nav.branches', matchPrefix: '/branches' },
  { to: '/gallery',    labelKey: 'nav.gallery'   },
  { to: '/contact',    labelKey: 'nav.contact'   },
]

const STATUS_DOT = {
  open:     'bg-green-500',
  waitlist: 'bg-amber-400',
  closed:   'bg-red-400',
}

function BranchPill({ selectedBranch, branches, setBranch }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) return
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const esc   = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', esc) }
  }, [open])

  const dotClass = STATUS_DOT[selectedBranch.admissionStatus] ?? 'bg-gray-400'

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 font-body font-medium text-sm text-textPrimary hover:border-secondary hover:bg-secondary/5 transition-all duration-150"
      >
        <MapPin size={13} className="text-cta shrink-0" />
        <span className="max-w-[80px] truncate">{selectedBranch.slug}</span>
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotClass}`} />
        <ChevronDown size={13} className={`text-textMuted transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-2 w-60 bg-white rounded-2xl shadow-card-hover border border-border overflow-hidden z-50"
        >
          {branches.map((b) => {
            const dot  = STATUS_DOT[b.admissionStatus] ?? 'bg-gray-400'
            const active = b.slug === selectedBranch.slug
            return (
              <button
                key={b.slug}
                role="option"
                aria-selected={active}
                onClick={() => { setBranch(b.slug); setOpen(false); navigate(`/branches/${b.slug}`) }}
                className={`w-full flex items-center justify-between px-4 py-3 font-body text-sm text-left transition-colors ${
                  active ? 'bg-cta/10 text-cta font-semibold' : 'text-textPrimary hover:bg-bg'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
                  {b.shortName}
                </span>
                {active && <Check size={14} />}
              </button>
            )
          })}
          <Link
            to="/branches"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 border-t border-border font-body font-medium text-sm text-secondary hover:bg-bg transition-colors"
          >
            See all branches →
          </Link>
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const { t, lang, setLang } = useLanguage()
  const { selectedBranch, branches, setBranch } = useBranch()
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const toggleLang = () => setLang(lang === 'en' ? 'mr' : 'en')
  const callHref   = selectedBranch ? `tel:+${selectedBranch.phone}` : '#'

  const isLinkActive = (link) =>
    link.matchPrefix
      ? location.pathname === link.matchPrefix || location.pathname.startsWith(link.matchPrefix + '/')
      : undefined

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border/60'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-2 shrink-0 min-w-0">
              <span className="text-2xl leading-none select-none">🌟</span>
              <span className="hidden sm:block font-display font-black text-lg text-textPrimary whitespace-nowrap leading-tight">
                {BRAND.name}
              </span>
            </Link>

            {/* ── Desktop nav ── */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-6 mx-6">
              {NAV_LINKS.map((link) => {
                const explicit = isLinkActive(link)
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) => {
                      const active = explicit ?? isActive
                      return [
                        'relative pb-0.5 font-body font-medium text-sm whitespace-nowrap transition-colors border-b-2',
                        active
                          ? 'text-cta border-cta'
                          : 'text-textSecondary border-transparent hover:text-textPrimary hover:border-border',
                      ].join(' ')
                    }}
                  >
                    {t(link.labelKey)}
                  </NavLink>
                )
              })}
            </nav>

            {/* ── Desktop actions ── */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              {/* Language — subtle, lowest visual weight */}
              <button
                onClick={toggleLang}
                className="px-2.5 py-1.5 rounded-full font-body font-medium text-xs text-textMuted border border-border hover:border-secondary hover:text-secondary transition-all duration-150"
              >
                {lang === 'en' ? 'मराठी' : 'EN'}
              </button>

              {/* Branch selector */}
              {selectedBranch && (
                <BranchPill
                  selectedBranch={selectedBranch}
                  branches={branches}
                  setBranch={setBranch}
                />
              )}

              {/* Call CTA — highest visual weight */}
              <a
                href={callHref}
                data-branch={selectedBranch?.slug}
                className="flex items-center gap-1.5 bg-cta text-white px-4 py-2 rounded-full font-body font-semibold text-sm shadow-cta hover:bg-cta-dark active:scale-95 transition-all duration-150"
              >
                <Phone size={14} />
                {t('nav.callNow')}
              </a>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              className="lg:hidden p-2 text-textPrimary min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-white flex flex-col pt-16 overflow-y-auto"
          >
            {/* Nav links */}
            <nav className="flex flex-col px-6 py-4 gap-0.5">
              {NAV_LINKS.map((link) => {
                const explicit = isLinkActive(link)
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) => {
                      const active = explicit ?? isActive
                      return `font-display font-bold text-2xl py-3.5 border-b border-border/60 transition-colors ${
                        active ? 'text-cta' : 'text-textPrimary'
                      }`
                    }}
                  >
                    {t(link.labelKey)}
                  </NavLink>
                )
              })}
            </nav>

            {/* Branch picker */}
            {selectedBranch && branches.length > 1 && (
              <div className="px-6 pt-5 pb-2">
                <p className="font-body font-semibold text-xs uppercase tracking-wider text-textMuted mb-2.5">
                  {t('branches.selectBranch')}
                </p>
                <div className="flex flex-col gap-1.5">
                  {branches.map((b) => {
                    const dot  = STATUS_DOT[b.admissionStatus] ?? 'bg-gray-400'
                    const active = b.slug === selectedBranch.slug
                    return (
                      <button
                        key={b.slug}
                        onClick={() => { setBranch(b.slug); setMenuOpen(false); navigate(`/branches/${b.slug}`) }}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 font-body text-base transition-colors ${
                          active ? 'bg-cta/10 text-cta font-semibold' : 'bg-surface text-textPrimary hover:bg-bg'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
                          {b.shortName}
                        </span>
                        {active && <Check size={16} />}
                      </button>
                    )
                  })}
                  <Link
                    to="/branches"
                    onClick={() => setMenuOpen(false)}
                    className="font-body font-medium text-sm text-secondary mt-1 hover:underline"
                  >
                    {t('branches.seeAll')}
                  </Link>
                </div>
              </div>
            )}

            {/* Bottom actions */}
            <div className="px-6 pb-8 mt-auto flex flex-col gap-3 pt-6">
              <button
                onClick={() => { toggleLang(); setMenuOpen(false) }}
                className="w-full py-3.5 rounded-full border-2 border-secondary text-secondary font-body font-semibold text-base hover:bg-secondary hover:text-white transition-all"
              >
                {lang === 'en' ? 'मराठीत पहा' : 'View in English'}
              </button>
              <a
                href={callHref}
                data-branch={selectedBranch?.slug}
                onClick={() => setMenuOpen(false)}
                className="w-full py-3.5 rounded-full bg-cta text-white font-body font-semibold text-base text-center shadow-cta hover:bg-cta-dark transition-colors"
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
