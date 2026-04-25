import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'

export default function ActivityPageHero() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cta via-[#FF8C42] to-primary pt-16 md:pt-20">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-5xl mb-4 select-none"
          >
            🎉
          </motion.div>
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white mb-4 leading-tight">
            {t('activities.page.title')}
          </h1>
          <p className="font-body text-white/85 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t('activities.page.subtitle')}
          </p>
        </motion.div>

        {/* Activity emoji row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex justify-center gap-3 sm:gap-5 mt-8 flex-wrap"
        >
          {['🎨', '📖', '🎵', '🪔', '🥗', '🎤'].map((emoji, i) => (
            <motion.div
              key={emoji}
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 + i * 0.3, ease: 'easeInOut' }}
              className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl sm:text-3xl select-none"
            >
              {emoji}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
