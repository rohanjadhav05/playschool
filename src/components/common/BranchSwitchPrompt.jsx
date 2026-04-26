import React from 'react'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import BranchCard from '../branches/BranchCard'
import { useBranch } from '../../hooks/useBranch'
import { useLanguage } from '../../context/LanguageContext'

// Hub homepage section (used in Phase 9). Hides itself for single-branch
// configs so the v1 graceful-degrade rule still holds.
export default function BranchSwitchPrompt() {
  const { branches } = useBranch()
  const { t } = useLanguage()

  if (!branches || branches.length < 2) return null

  return (
    <section className="py-16 md:py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={t('branches.findYours')}
          subtitle={t('branches.subtitle')}
          accent="cta"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {branches.map((b, i) => (
            <BranchCard key={b.slug} branch={b} eager={i === 0} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
