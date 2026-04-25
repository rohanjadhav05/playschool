import React from 'react'
import { motion } from 'framer-motion'

const accentColors = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  cta: 'bg-cta',
  accent: 'bg-accent',
}

export default function SectionHeader({
  title,
  subtitle,
  align = 'center',
  accent = 'primary',
  className = '',
}) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <motion.div
      className={`flex flex-col ${alignClass} gap-3 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <span className={`inline-block h-1.5 w-12 rounded-full ${accentColors[accent] ?? 'bg-primary'}`} />
      <h2 className="font-display font-bold text-3xl md:text-4xl text-textPrimary leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="font-body text-textSecondary text-base md:text-lg max-w-xl">{subtitle}</p>
      )}
    </motion.div>
  )
}
