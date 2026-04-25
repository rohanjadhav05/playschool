import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import SectionHeader from '../common/SectionHeader'

const ROWS = [
  { feature: 'Age Group', playschool: '3–5 years', tuition: '6–16 years' },
  { feature: 'Batch Size', playschool: 'Max 15 students', tuition: 'Max 10 students' },
  { feature: 'Primary Focus', playschool: 'Holistic development', tuition: 'Academic support' },
  { feature: 'Activities', playschool: 'Art, dance, festivals, stage', tuition: 'Revision tests' },
  { feature: 'Cultural Component', playschool: '⭐⭐⭐⭐⭐ Strong', tuition: '⭐⭐⭐ Moderate' },
  { feature: 'Parent Updates', playschool: 'Weekly', tuition: 'Monthly' },
  { feature: 'Mode', playschool: 'Offline · Marathi / English', tuition: 'Offline · In-person' },
]

export default function ComparisonTable() {
  const { t } = useLanguage()

  return (
    <section className="py-16 md:py-20 bg-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Program Comparison"
          subtitle="Side by side — choose what's right for your child"
          className="mb-10"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="overflow-x-auto rounded-2xl shadow-card"
        >
          <table className="w-full min-w-[560px] bg-white text-left">
            <thead>
              <tr>
                <th className="px-6 py-4 font-display font-bold text-sm text-textMuted w-1/3 border-b border-border">
                  Feature
                </th>
                <th className="px-6 py-4 font-display font-bold text-sm text-cta border-b border-border">
                  🌟 Playschool
                </th>
                <th className="px-6 py-4 font-display font-bold text-sm text-secondary border-b border-border">
                  📚 Tuition
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(({ feature, playschool, tuition }, i) => (
                <tr
                  key={feature}
                  className={i % 2 === 0 ? 'bg-white' : 'bg-bg/60'}
                >
                  <td className="px-6 py-4 font-body font-semibold text-sm text-textPrimary border-b border-border last:border-0">
                    {feature}
                  </td>
                  <td className="px-6 py-4 font-body text-sm text-textSecondary border-b border-border last:border-0">
                    {playschool}
                  </td>
                  <td className="px-6 py-4 font-body text-sm text-textSecondary border-b border-border last:border-0">
                    {tuition}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  )
}
