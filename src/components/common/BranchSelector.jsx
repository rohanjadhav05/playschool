import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Check, MapPin } from 'lucide-react'
import { useBranch } from '../../hooks/useBranch'
import { useLanguage } from '../../context/LanguageContext'

export default function BranchSelector({ variant = 'desktop', onNavigate }) {
  const { branches, selectedBranch, setBranch } = useBranch()
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const handlePick = (slug) => {
    setBranch(slug)
    setOpen(false)
    onNavigate?.()
  }

  if (!selectedBranch) return null

  if (variant === 'drawer') {
    return (
      <div className="w-full">
        <p className="font-body font-semibold text-xs uppercase tracking-wider text-textMuted mb-2">
          {t('branches.selectBranch')}
        </p>
        <div className="flex flex-col gap-1.5">
          {branches.map((b) => (
            <button
              key={b.slug}
              onClick={() => handlePick(b.slug)}
              className={`flex items-center justify-between rounded-xl px-4 py-3 font-body text-base transition-colors ${
                b.slug === selectedBranch.slug
                  ? 'bg-cta-light text-cta font-semibold'
                  : 'bg-surface text-textPrimary hover:bg-bg'
              }`}
            >
              <span className="flex items-center gap-2">
                <MapPin size={15} />
                {b.shortName}
              </span>
              {b.slug === selectedBranch.slug && <Check size={16} />}
            </button>
          ))}
          <Link
            to="/branches"
            onClick={() => onNavigate?.()}
            className="font-body font-semibold text-sm text-secondary mt-2 hover:underline"
          >
            {t('branches.seeAll')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-full border-2 border-border bg-white px-3.5 py-2 font-body font-semibold text-sm text-textPrimary hover:border-secondary transition-colors"
      >
        <MapPin size={14} className="text-cta" />
        <span>{selectedBranch.shortName}</span>
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-2 w-60 bg-white rounded-2xl shadow-card-hover border border-border overflow-hidden z-50"
        >
          {branches.map((b) => (
            <button
              key={b.slug}
              role="option"
              aria-selected={b.slug === selectedBranch.slug}
              onClick={() => handlePick(b.slug)}
              className={`w-full flex items-center justify-between px-4 py-3 font-body text-sm text-left transition-colors ${
                b.slug === selectedBranch.slug
                  ? 'bg-cta-light text-cta font-semibold'
                  : 'text-textPrimary hover:bg-bg'
              }`}
            >
              <span className="flex items-center gap-2">
                <MapPin size={14} />
                {b.shortName}
              </span>
              {b.slug === selectedBranch.slug && <Check size={14} />}
            </button>
          ))}
          <Link
            to="/branches"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 border-t border-border font-body font-semibold text-sm text-secondary hover:bg-bg transition-colors"
          >
            {t('branches.seeAll')}
          </Link>
        </div>
      )}
    </div>
  )
}
