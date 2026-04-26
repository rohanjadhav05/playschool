import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, MessageCircle, MapPin, Facebook, Instagram, Youtube } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { useBranch } from '../../hooks/useBranch'
import { BRAND } from '../../../school.config.js'

const NAV_LINKS = [
  { to: '/', key: 'nav.home' },
  { to: '/activities', key: 'nav.activities' },
  { to: '/programs', key: 'nav.programs' },
  { to: '/about', key: 'nav.about' },
  { to: '/branches', key: 'nav.branches' },
  { to: '/gallery', key: 'nav.gallery' },
  { to: '/contact', key: 'nav.contact' },
]

export default function Footer() {
  const { t } = useLanguage()
  const { branches, selectedBranch } = useBranch()

  return (
    <footer className="bg-textPrimary text-white pt-12 pb-28 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: brand + quick links */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 font-display font-black text-xl mb-3">
              <span className="text-2xl">🌟</span>
              <span>{BRAND.name}</span>
            </div>
            <p className="font-body text-white/60 text-sm leading-relaxed mb-4 max-w-md">
              {t('footer.tagline')}
            </p>
            <p className="font-body text-white/40 text-xs mb-5">
              {BRAND.officeHours}
            </p>
            <div className="flex gap-4">
              {BRAND.social.facebook && (
                <a
                  href={BRAND.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
              )}
              {BRAND.social.instagram && (
                <a
                  href={BRAND.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
              )}
              {BRAND.social.youtube && (
                <a
                  href={BRAND.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={20} />
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider mb-4 text-primary">
              {t('footer.quicklinks')}
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ to, key }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="font-body text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Branch directory */}
        <h3 className="font-display font-bold text-sm uppercase tracking-wider mb-4 text-primary">
          {t('footer.branches')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-10 border-b border-white/10">
          {branches.map((b) => {
            const isSelected = selectedBranch?.slug === b.slug
            const waUrl = `https://wa.me/${b.whatsapp}?text=${encodeURIComponent(
              `Hi, I'm interested in Atharva Playschool (${b.shortName} branch). Please contact me.`,
            )}`
            return (
              <div
                key={b.slug}
                data-branch={b.slug}
                className={`rounded-2xl p-5 transition-colors ${
                  isSelected ? 'bg-white/10 ring-1 ring-primary/40' : 'bg-white/5'
                }`}
              >
                <Link
                  to={`/branches/${b.slug}`}
                  className="font-display font-bold text-base hover:text-primary transition-colors flex items-center gap-2"
                >
                  {b.shortName}
                  {isSelected && (
                    <span className="text-[10px] uppercase tracking-wider font-body font-semibold bg-primary text-textPrimary px-1.5 py-0.5 rounded-full">
                      Selected
                    </span>
                  )}
                </Link>
                <p className="font-body text-white/60 text-xs mt-2 mb-3 leading-relaxed">
                  {b.address.line1}
                  {b.address.line2 && <><br />{b.address.line2}</>}
                  <br />
                  {b.address.city} — {b.address.pin}
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <a
                    href={`tel:+${b.phone}`}
                    data-branch={b.slug}
                    className="inline-flex items-center gap-1 text-white/80 hover:text-white transition-colors"
                  >
                    <Phone size={12} /> +{b.phone}
                  </a>
                  <span className="text-white/30">·</span>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-branch={b.slug}
                    className="inline-flex items-center gap-1 text-whatsapp hover:opacity-80 transition-opacity"
                  >
                    <MessageCircle size={12} /> WhatsApp
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        <div className="pt-6 text-center">
          <p className="font-body text-white/40 text-sm">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
