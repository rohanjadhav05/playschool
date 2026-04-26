import React from 'react'
import { useLanguage } from '../../context/LanguageContext'

const STYLES = {
  open: { emoji: '⭐', cls: 'bg-accent-light text-accent-dark', key: 'branches.admissionStatus.open' },
  waitlist: { emoji: '⏳', cls: 'bg-primary-light text-textPrimary', key: 'branches.admissionStatus.waitlist' },
  closed: { emoji: '●', cls: 'bg-border text-textMuted', key: 'branches.admissionStatus.closed' },
}

export default function AdmissionStatusPill({ status, className = '' }) {
  const { t } = useLanguage()
  const cfg = STYLES[status] || STYLES.open
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-body font-semibold text-xs ${cfg.cls} ${className}`}
    >
      <span aria-hidden="true">{cfg.emoji}</span>
      {t(cfg.key)}
    </span>
  )
}
