import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, MapPin, Clock, Facebook, Instagram, Youtube } from 'lucide-react'
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

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-textPrimary text-white pt-12 pb-28 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-display font-black text-xl mb-3">
              <span className="text-2xl">🌟</span>
              <span>{SCHOOL.name}</span>
            </div>
            <p className="font-body text-white/60 text-sm leading-relaxed">{t('footer.tagline')}</p>
          </div>

          {/* Quick links */}
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

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider mb-4 text-primary">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-3 mb-5">
              <li className="flex items-start gap-2.5 text-white/60 text-sm font-body">
                <Phone size={14} className="mt-0.5 shrink-0" />
                <a href={`tel:${SCHOOL.phone}`} className="hover:text-white transition-colors">
                  {SCHOOL.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-white/60 text-sm font-body">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                <span>
                  {SCHOOL.address.line1}, {SCHOOL.address.line2}, {SCHOOL.address.city}
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-white/60 text-sm font-body">
                <Clock size={14} className="mt-0.5 shrink-0" />
                <span>{SCHOOL.timing.officeHours}</span>
              </li>
            </ul>

            <div className="flex gap-4">
              {SCHOOL.social.facebook && (
                <a
                  href={SCHOOL.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
              )}
              {SCHOOL.social.instagram && (
                <a
                  href={SCHOOL.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
              )}
              {SCHOOL.social.youtube && (
                <a
                  href={SCHOOL.social.youtube}
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
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="font-body text-white/40 text-sm">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
