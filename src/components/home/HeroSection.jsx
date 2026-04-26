import React from 'react'
import { Phone, MessageCircle, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { useBranch } from '../../hooks/useBranch'
import CTAButton from '../common/CTAButton'

const ACTIVITY_TILES = [
  { emoji: '🎨', gradient: 'from-orange-200 to-red-200' },
  { emoji: '🎵', gradient: 'from-purple-200 to-blue-200' },
  { emoji: '📖', gradient: 'from-yellow-200 to-orange-200' },
  { emoji: '🪔', gradient: 'from-amber-200 to-yellow-300' },
  { emoji: '🥗', gradient: 'from-green-200 to-emerald-200' },
  { emoji: '🎤', gradient: 'from-blue-200 to-indigo-200' },
]

function HeroIllustration({ batchSize }) {
  return (
    <div className="relative w-full max-w-[360px] mx-auto lg:mx-0">
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white rounded-3xl shadow-card-hover p-5"
      >
        <p className="font-display font-bold text-sm text-textSecondary mb-3 flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-accent" />
          Daily Activities
        </p>

        <div className="grid grid-cols-3 gap-2.5">
          {ACTIVITY_TILES.map(({ emoji, gradient }) => (
            <div
              key={emoji}
              className={`bg-gradient-to-br ${gradient} rounded-2xl aspect-square flex items-center justify-center text-3xl`}
            >
              {emoji}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-around mt-4 pt-4 border-t border-border">
          <div className="text-center">
            <p className="font-display font-black text-xl text-textPrimary">
              {batchSize}
            </p>
            <p className="font-body text-xs text-textMuted">Max Batch</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <p className="font-display font-black text-xl text-textPrimary">6+</p>
            <p className="font-body text-xs text-textMuted">Activities</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <p className="font-display font-black text-xl text-textPrimary">100%</p>
            <p className="font-body text-xs text-textMuted">In-person</p>
          </div>
        </div>
      </motion.div>

      {/* Floating badge — top right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
        className="absolute -top-4 -right-3 bg-primary rounded-2xl px-3 py-2 shadow-lg"
      >
        <p className="font-body font-bold text-xs text-textPrimary leading-snug">🏆 Trusted</p>
        <p className="font-body font-bold text-xs text-textPrimary leading-snug">by Parents</p>
      </motion.div>

      {/* Floating badge — bottom left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
        className="absolute -bottom-4 -left-3 bg-whatsapp rounded-2xl px-3 py-2 shadow-lg"
      >
        <p className="font-body font-bold text-xs text-white leading-snug">🙏 Indian</p>
        <p className="font-body font-bold text-xs text-white leading-snug">Values</p>
      </motion.div>
    </div>
  )
}

function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute top-28 right-[6%] w-14 h-14 rounded-full bg-primary/30"
        animate={{ y: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 left-[2%] w-9 h-9 rounded-full bg-secondary/20"
        animate={{ y: [8, -8, 8] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-[10%] w-7 h-7 rounded-full bg-cta/20"
        animate={{ y: [-6, 6, -6] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-20 left-[18%] text-2xl select-none"
        animate={{ y: [-8, 8, -8], rotate: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
      >
        ⭐
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 left-[6%] text-xl select-none"
        animate={{ y: [6, -6, 6], rotate: [5, -5, 5] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
      >
        🌸
      </motion.div>
      <motion.div
        className="absolute top-1/2 right-[3%] text-lg select-none"
        animate={{ y: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut' }}
      >
        ✨
      </motion.div>
    </div>
  )
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const fadeLeft = { hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0, transition: { duration: 0.5 } } }

export default function HeroSection() {
  const { t } = useLanguage()
  const { selectedBranch, branches } = useBranch()
  const isHub = branches.length > 1
  const callHref = selectedBranch ? `tel:+${selectedBranch.phone}` : '#'
  const waUrl = selectedBranch
    ? `https://wa.me/${selectedBranch.whatsapp}?text=${encodeURIComponent(
        `Hi, I'm interested in Atharva Playschool (${selectedBranch.shortName} branch). Please contact me.`,
      )}`
    : '#'

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-light via-bg to-bg pt-16 md:pt-20">
      <FloatingShapes />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="order-2 lg:order-1"
          >
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-5">
              {[t('hero.badge1'), t('hero.badge2'), t('hero.badge3')].map((badge) => (
                <span
                  key={badge}
                  className="bg-white/80 border border-border font-body font-medium text-sm px-3.5 py-1.5 rounded-full shadow-sm text-textPrimary"
                >
                  {badge}
                </span>
              ))}
            </motion.div>

            <motion.h1
              variants={fadeLeft}
              className="font-display font-black text-5xl sm:text-6xl lg:text-[4.25rem] leading-[1.1] text-textPrimary mb-5"
            >
              {t('hero.headline1')}
              <br />
              <span className="text-cta">{t('hero.headline2')}</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-body text-textSecondary text-lg md:text-xl leading-relaxed mb-8 max-w-md"
            >
              {t(isHub ? 'hero.subheadline.hub' : 'hero.subheadline')}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <CTAButton
                href={callHref}
                variant="primary"
                size="lg"
                data-branch={selectedBranch?.slug}
              >
                <Phone size={18} />
                {t(isHub ? 'hero.cta.callNearest' : 'hero.cta.call')}
              </CTAButton>
              <CTAButton
                href={waUrl}
                variant="whatsapp"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
                data-branch={selectedBranch?.slug}
              >
                <MessageCircle size={18} />
                {t('hero.cta.whatsapp')}
              </CTAButton>
              <CTAButton to="/contact" variant="outline" size="lg">
                <Calendar size={18} />
                {t('hero.cta.visit')}
              </CTAButton>
            </motion.div>
          </motion.div>

          {/* Illustration */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end pb-8 lg:pb-0">
            <HeroIllustration batchSize={selectedBranch?.batchSize?.playschool ?? 50} />
          </div>
        </div>
      </div>
    </section>
  )
}
