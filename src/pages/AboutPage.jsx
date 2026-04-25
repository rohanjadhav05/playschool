import React from 'react'
import PageHero from '../components/common/PageHero'
import TeacherProfile from '../components/about/TeacherProfile'
import PhilosophySection from '../components/about/PhilosophySection'
import TimelineSection from '../components/about/TimelineSection'

export default function AboutPage() {
  return (
    <div className="pt-16 md:pt-20">
      <PageHero
        title="About Us"
        subtitle="A decade of nurturing young minds in Karad with love, culture, and purpose."
        gradient="from-secondary via-blue-500 to-indigo-500"
        emoji="🏫"
      />
      <TeacherProfile />
      <PhilosophySection />
      <TimelineSection />
    </div>
  )
}
