import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import SEO from '../components/common/SEO'
import PageHero from '../components/common/PageHero'
import BranchContactForm from '../components/branches/BranchContactForm'
import BranchInfoBlock from '../components/branches/BranchInfoBlock'
import { useBranchFromRoute } from '../hooks/useBranchFromRoute'
import { useBranch } from '../hooks/useBranch'

export default function BranchContactPage() {
  const branch = useBranchFromRoute()
  const { setBranch } = useBranch()

  useEffect(() => {
    if (branch) setBranch(branch.slug)
  }, [branch, setBranch])

  if (!branch) return <Navigate to="/branches" replace />

  return (
    <>
      <SEO
        title={`Contact ${branch.shortName} Branch`}
        description={`Send a WhatsApp inquiry or call the ${branch.shortName} branch of Atharva Playschool directly. Admissions, fees, and visit scheduling.`}
        canonical={`/branches/${branch.slug}/contact`}
      />
      <PageHero
        title={`Contact ${branch.shortName}`}
        subtitle={`We'll get back to you with details specific to the ${branch.shortName} branch.`}
        gradient="from-cta via-red-400 to-secondary"
        emoji="👋"
      />

      <section className="py-12 md:py-16 bg-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <span className="inline-block h-1.5 w-12 rounded-full bg-cta mb-4" />
              <h2 className="font-display font-bold text-2xl md:text-3xl text-textPrimary mb-2">
                Reach the {branch.shortName} branch
              </h2>
              <p className="font-body text-textSecondary mb-6">
                Use the form on the right to send a WhatsApp inquiry pre-filled with your details, or call us directly.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`tel:+${branch.phone}`}
                  data-branch={branch.slug}
                  className="inline-flex items-center gap-2 bg-cta text-white font-body font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-cta-dark transition-colors"
                >
                  📞 +{branch.phone}
                </a>
                <a
                  href={`https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(
                    `Hi, I'm interested in Atharva Playschool (${branch.shortName} branch). Please contact me.`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-branch={branch.slug}
                  className="inline-flex items-center gap-2 bg-whatsapp text-white font-body font-semibold text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
            <BranchContactForm branch={branch} />
          </div>
        </div>
      </section>

      <BranchInfoBlock branch={branch} />
    </>
  )
}
