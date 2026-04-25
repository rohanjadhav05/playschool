import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import CTAButton from '../common/CTAButton'

export default function ProgramsCTABanner() {
  const { t } = useLanguage()

  return (
    <section className="py-16 md:py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-primary via-[#FFB800] to-cta rounded-3xl px-8 py-12 md:py-14 text-center relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/3 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 translate-y-1/3 -translate-x-1/4 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="font-display font-black text-3xl md:text-4xl text-textPrimary mb-3 leading-tight">
              {t('programs.banner.title')}
            </h2>
            <p className="font-body text-textPrimary/80 font-medium text-base md:text-lg mb-8">
              {t('programs.banner.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CTAButton to="/programs" variant="outline" size="lg" className="border-textPrimary text-textPrimary hover:bg-textPrimary hover:text-white">
                {t('programs.banner.cta1')}
              </CTAButton>
              <CTAButton to="/contact" variant="outline" size="lg" className="border-textPrimary text-textPrimary hover:bg-textPrimary hover:text-white">
                {t('programs.banner.cta2')}
              </CTAButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
