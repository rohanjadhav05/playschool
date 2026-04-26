import React from 'react'
import SEO from '../components/common/SEO'
import PageHero from '../components/common/PageHero'
import ProgramCard from '../components/programs/ProgramCard'
import ComparisonTable from '../components/programs/ComparisonTable'

export default function ProgramsPage() {
  return (
    <>
      <SEO
        title="Playschool & Tuition Classes"
        description="Playschool for ages 3–5 and tuition classes for 1st–10th standard at Atharva Playschool, Karve, Karad. Small batches, personal attention, rooted in Indian values."
        keywords="playschool admission karad, tuition classes karad, nursery admission maharashtra, 1st to 10th tuition karad, preschool fees karad"
        canonical="/programs"
      />
      <PageHero
        title="Our Programs"
        subtitle="Thoughtfully designed for every stage — from first steps to board exams."
        gradient="from-emerald-500 via-teal-400 to-cyan-400"
        emoji="📚"
      />

      <section className="py-16 md:py-20 bg-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <ProgramCard type="playschool" />
            <ProgramCard type="tuition" />
          </div>
        </div>
      </section>

      <ComparisonTable />
    </>
  )
}
