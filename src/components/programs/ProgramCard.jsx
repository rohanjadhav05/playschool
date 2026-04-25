import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Users, BookOpen, ChevronDown } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { SCHOOL } from '../../../school.config.js'
import CTAButton from '../common/CTAButton'

const PLAYSCHOOL_OFFERS = [
  '📚 Pre-literacy and pre-numeracy foundations',
  '🎨 Daily art, craft, and creative expression',
  '🎵 Music, rhymes, and dance',
  '🙏 Moral stories and value education',
  '🪔 Festival celebrations and cultural awareness',
  '🌿 Healthy habits and independence training',
  '🎤 Stage activities and confidence building',
]

const TUITION_SUBJECTS = {
  primary: 'All subjects — Maths, English, Marathi, Hindi, EVS',
  secondary: 'Maths, Science, English, Social Science, Hindi / Marathi',
}

const TUITION_STYLE = [
  '✅ Concept clarity over rote learning',
  '✅ Homework support and doubt clearing',
  '✅ Regular revision tests',
  '✅ Parent progress updates',
]

export default function ProgramCard({ type }) {
  const { t } = useLanguage()
  const [expanded, setExpanded] = useState(false)
  const isPlayschool = type === 'playschool'

  const theme = isPlayschool
    ? { gradient: 'from-primary via-[#FFB800] to-cta', iconBg: 'bg-primary-light', textAccent: 'text-cta' }
    : { gradient: 'from-secondary via-blue-500 to-indigo-600', iconBg: 'bg-secondary-light', textAccent: 'text-secondary' }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: isPlayschool ? 0 : 0.1 }}
      className="bg-white rounded-3xl shadow-card overflow-hidden flex flex-col"
    >
      {/* Card header */}
      <div className={`bg-gradient-to-r ${theme.gradient} px-6 py-8 text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10">
          <span className="text-4xl">{isPlayschool ? '🌟' : '📚'}</span>
          <h3 className="font-display font-black text-2xl mt-3 mb-1">
            {t(isPlayschool ? 'programs.playschool.name' : 'programs.tuition.name')}
          </h3>
          <p className="font-body text-white/85 text-sm italic">
            {t(isPlayschool ? 'programs.playschool.tagline' : 'programs.tuition.tagline')}
          </p>
          <span className="inline-block mt-3 bg-white/20 font-body font-medium text-xs px-3 py-1 rounded-full">
            {t(isPlayschool ? 'programs.playschool.age' : 'programs.tuition.age')}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-6 flex flex-col flex-1">
        {/* Overview */}
        <p className="font-body text-textSecondary text-sm leading-relaxed mb-5">
          {isPlayschool
            ? `Our playschool program is built on the belief that the first 5 years are the most critical for brain development. Every day is structured yet joyful — combining free play, cultural activities, and healthy habit formation.`
            : `Our tuition program provides personalized academic support to school-going children. Small batch sizes ensure every child gets individual attention and genuine understanding, not just marks.`}
        </p>

        {/* What's offered */}
        {isPlayschool ? (
          <>
            <p className="font-display font-bold text-xs uppercase tracking-wider text-textMuted mb-3">
              What We Offer
            </p>
            <ul className="space-y-2 mb-5">
              {(expanded ? PLAYSCHOOL_OFFERS : PLAYSCHOOL_OFFERS.slice(0, 4)).map((item) => (
                <li key={item} className="font-body text-textSecondary text-sm">{item}</li>
              ))}
            </ul>
            {PLAYSCHOOL_OFFERS.length > 4 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 font-body text-sm text-secondary mb-5 hover:underline"
              >
                {expanded ? 'Show less' : `+${PLAYSCHOOL_OFFERS.length - 4} more`}
                <ChevronDown size={14} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
              </button>
            )}
          </>
        ) : (
          <>
            <p className="font-display font-bold text-xs uppercase tracking-wider text-textMuted mb-3">
              Subjects
            </p>
            <div className="space-y-2 mb-4">
              <div className="bg-bg rounded-xl p-3">
                <p className="font-body font-semibold text-xs text-textMuted mb-1">Primary (1st–5th)</p>
                <p className="font-body text-textSecondary text-sm">{TUITION_SUBJECTS.primary}</p>
              </div>
              <div className="bg-bg rounded-xl p-3">
                <p className="font-body font-semibold text-xs text-textMuted mb-1">Secondary (6th–10th)</p>
                <p className="font-body text-textSecondary text-sm">{TUITION_SUBJECTS.secondary}</p>
              </div>
            </div>
            <ul className="space-y-1.5 mb-5">
              {TUITION_STYLE.map((item) => (
                <li key={item} className="font-body text-textSecondary text-sm">{item}</li>
              ))}
            </ul>
          </>
        )}

        {/* Structure info */}
        <div className="border-t border-border pt-5 mt-auto space-y-3">
          <div className="flex items-center gap-3 text-sm font-body text-textSecondary">
            <Clock size={15} className="text-textMuted shrink-0" />
            <span>
              {isPlayschool ? SCHOOL.timing.playschool : SCHOOL.timing.tuition}
              {isPlayschool && ' · Mon–Fri'}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm font-body text-textSecondary">
            <Users size={15} className="text-textMuted shrink-0" />
            <span>Max {isPlayschool ? SCHOOL.batchSize.playschool : SCHOOL.batchSize.tuition} students per batch</span>
          </div>
          <div className="flex items-center gap-3 text-sm font-body text-textSecondary">
            <BookOpen size={15} className="text-textMuted shrink-0" />
            <span>{SCHOOL.fees}</span>
          </div>
        </div>

        <CTAButton to="/contact" variant="primary" size="md" className="mt-6 w-full">
          {t('programs.admission.cta')}
        </CTAButton>
      </div>
    </motion.div>
  )
}
