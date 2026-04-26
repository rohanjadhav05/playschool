import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'

const inputClass =
  'w-full rounded-xl border border-border bg-surface px-4 py-3 font-body text-textPrimary text-base focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-colors placeholder:text-textMuted/60'

const labelClass = 'block font-body font-semibold text-sm text-textPrimary mb-1.5'

const INITIAL = {
  parentName: '',
  childName: '',
  childAge: '',
  program: 'playschool',
  phone: '',
  message: '',
}

export default function BranchContactForm({ branch }) {
  const { t } = useLanguage()
  const [form, setForm] = useState(INITIAL)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.parentName.trim()) e.parentName = 'Required'
    if (!form.childName.trim()) e.childName = 'Required'
    if (!form.phone.trim()) e.phone = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitted(true)

    const programLabel = { playschool: 'Playschool', tuition: 'Tuition', both: 'Both Programs' }
    const msg = [
      `Hello! I am ${form.parentName}.`,
      `I am interested in ${programLabel[form.program]} at the ${branch.shortName} branch for my child ${form.childName} (age ${form.childAge || 'not specified'}).`,
      `Please contact me at ${form.phone}.`,
      form.message ? `Message: ${form.message}` : '',
    ]
      .filter(Boolean)
      .join(' ')

    const waUrl = `https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(msg)}`
    window.open(waUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl shadow-card p-6 md:p-8"
      data-branch={branch.slug}
    >
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8"
          >
            <div className="text-6xl mb-4">🙏</div>
            <h3 className="font-display font-black text-2xl text-textPrimary mb-2">
              {t('contact.form.success')}
            </h3>
            <p className="font-body text-textSecondary text-sm mb-6">
              WhatsApp has been opened with your details for the {branch.shortName} branch. We'll be in touch soon!
            </p>
            <button
              onClick={() => {
                setSubmitted(false)
                setForm(INITIAL)
              }}
              className="font-body font-semibold text-secondary text-sm hover:underline"
            >
              Send another inquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="mb-5">
              <p className="font-body font-semibold text-xs uppercase tracking-wider text-textMuted mb-1">
                Inquiry for
              </p>
              <h3 className="font-display font-bold text-xl text-textPrimary">
                {branch.shortName} branch
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelClass}>{t('contact.form.parentName')} *</label>
                <input
                  type="text"
                  value={form.parentName}
                  onChange={set('parentName')}
                  placeholder="Priya Sharma"
                  className={`${inputClass} ${errors.parentName ? 'border-red-400' : ''}`}
                />
                {errors.parentName && <p className="text-red-500 text-xs mt-1">{errors.parentName}</p>}
              </div>
              <div>
                <label className={labelClass}>{t('contact.form.childName')} *</label>
                <input
                  type="text"
                  value={form.childName}
                  onChange={set('childName')}
                  placeholder="Ananya"
                  className={`${inputClass} ${errors.childName ? 'border-red-400' : ''}`}
                />
                {errors.childName && <p className="text-red-500 text-xs mt-1">{errors.childName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelClass}>{t('contact.form.childAge')}</label>
                <input
                  type="number"
                  min="1"
                  max="16"
                  value={form.childAge}
                  onChange={set('childAge')}
                  placeholder="4"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>{t('contact.form.program')}</label>
                <select value={form.program} onChange={set('program')} className={inputClass}>
                  <option value="playschool">{t('contact.form.program.playschool')}</option>
                  <option value="tuition">{t('contact.form.program.tuition')}</option>
                  <option value="both">{t('contact.form.program.both')}</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className={labelClass}>{t('contact.form.phone')} *</label>
              <input
                type="tel"
                value={form.phone}
                onChange={set('phone')}
                placeholder="+91 98765 43210"
                className={`${inputClass} ${errors.phone ? 'border-red-400' : ''}`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div className="mb-6">
              <label className={labelClass}>{t('contact.form.message')}</label>
              <textarea
                rows={3}
                value={form.message}
                onChange={set('message')}
                placeholder="Any questions or specific requirements..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-cta text-white font-body font-semibold text-base py-3.5 rounded-full hover:bg-cta-dark transition-colors shadow-cta"
              data-branch={branch.slug}
            >
              {t('contact.form.submit')}
            </motion.button>

            <p className="text-center font-body text-textMuted text-xs mt-3">
              Opens WhatsApp to <span className="font-semibold">{branch.shortName}</span> with your details pre-filled.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
