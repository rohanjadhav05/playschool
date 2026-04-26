import React, { useEffect } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SEO from '../components/common/SEO'
import BranchHeroSection from '../components/branches/BranchHeroSection'
import BranchInfoBlock from '../components/branches/BranchInfoBlock'
import { useBranchFromRoute } from '../hooks/useBranchFromRoute'
import { useBranch } from '../hooks/useBranch'

export default function BranchPage() {
  const branch = useBranchFromRoute()
  const { setBranch } = useBranch()

  useEffect(() => {
    if (branch) setBranch(branch.slug)
  }, [branch, setBranch])

  // Per-route hero preload (per Phase 10 plan, but cheap to add now).
  useEffect(() => {
    if (!branch) return
    const heroPhoto = branch.photos && branch.photos[0]
    if (!heroPhoto) return
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = heroPhoto
    document.head.appendChild(link)
    return () => {
      document.head.removeChild(link)
    }
  }, [branch])

  if (!branch) return <Navigate to="/branches" replace />

  return (
    <>
      <SEO
        title={`${branch.shortName} Branch`}
        description={`Atharva Playschool ${branch.shortName} branch — ${branch.address.line1}, ${branch.address.city}. Admissions, timings, and contact details.`}
        canonical={`/branches/${branch.slug}`}
      />

      <BranchHeroSection branch={branch} />

      {branch.branchTeacher && (
        <section className="py-12 md:py-16 bg-bg">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-card p-6 md:p-8 flex flex-col md:flex-row items-center gap-6"
            >
              {branch.branchTeacher.photo && (
                <img
                  src={branch.branchTeacher.photo}
                  alt={branch.branchTeacher.name}
                  className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover shadow-card"
                  loading="lazy"
                  decoding="async"
                />
              )}
              <div className="text-center md:text-left">
                <p className="font-body font-semibold text-xs uppercase tracking-wider text-textMuted mb-1">
                  Branch Lead Teacher
                </p>
                <h2 className="font-display font-bold text-2xl text-textPrimary mb-1">
                  {branch.branchTeacher.name}
                </h2>
                {branch.branchTeacher.title && (
                  <p className="font-body text-textSecondary text-sm mb-3">{branch.branchTeacher.title}</p>
                )}
                {branch.branchTeacher.bio && (
                  <p className="font-body text-textPrimary text-base leading-relaxed">{branch.branchTeacher.bio}</p>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {branch.photos && branch.photos.length > 0 && (
        <section className="py-12 md:py-16 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-textPrimary mb-6">
              Inside the {branch.shortName} branch
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {branch.photos.map((src, i) => (
                <motion.img
                  key={src}
                  src={src}
                  alt={`${branch.name} interior ${i + 1}`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="w-full aspect-[4/3] object-cover rounded-2xl shadow-card"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <BranchInfoBlock branch={branch} />

      <section className="py-12 md:py-16 bg-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-textPrimary mb-3">
            Same activities, same values
          </h2>
          <p className="font-body text-textSecondary text-base md:text-lg max-w-2xl mx-auto mb-6">
            Every branch follows the same activity-based curriculum and value-driven approach. Explore the daily life that makes Atharva special.
          </p>
          <Link
            to="/activities"
            className="inline-flex items-center gap-2 bg-secondary text-white font-body font-semibold text-base px-6 py-3 rounded-full hover:bg-secondary-dark transition-colors"
          >
            See our activities <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
