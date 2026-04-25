import React from 'react'
import PageHero from '../components/common/PageHero'
import ProgramCard from '../components/programs/ProgramCard'
import ComparisonTable from '../components/programs/ComparisonTable'

export default function ProgramsPage() {
  return (
    <div className="pt-16 md:pt-20">
      <PageHero
        title="Our Programs"
        subtitle="Thoughtfully designed for every stage — from first steps to board exams."
        gradient="from-cta via-orange-400 to-primary"
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
    </div>
  )
}
