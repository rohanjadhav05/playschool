import React from 'react'
import SEO from '../components/common/SEO'
import PageHero from '../components/common/PageHero'
import BranchCard from '../components/branches/BranchCard'
import BranchesMap from '../components/branches/BranchesMap'
import { useBranch } from '../hooks/useBranch'
import { useLanguage } from '../context/LanguageContext'

export default function BranchesIndexPage() {
  const { branches } = useBranch()
  const { t } = useLanguage()

  return (
    <>
      <SEO
        title="Our Branches"
        description="Atharva Playschool — three branches across Maharashtra. Find your nearest branch for admissions, timings, and a campus visit."
        canonical="/branches"
      />
      <PageHero
        title={t('branches.title')}
        subtitle={t('branches.subtitle')}
        gradient="from-cta via-orange-400 to-primary"
        emoji="🏫"
      />

      <section className="py-12 md:py-16 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {branches.map((b, i) => (
              <BranchCard key={b.slug} branch={b} eager={i === 0} />
            ))}
          </div>
        </div>
      </section>

      <BranchesMap branches={branches} />
    </>
  )
}
