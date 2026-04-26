import React from 'react'
import SEO from '../components/common/SEO'
import PageHero from '../components/common/PageHero'
import TeacherProfile from '../components/about/TeacherProfile'
import PhilosophySection from '../components/about/PhilosophySection'
import TimelineSection from '../components/about/TimelineSection'

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us"
        description="Meet our experienced teacher and learn about the teaching philosophy behind Atharva Playschool — rooted in Indian values and activity-based learning in Karve, Karad."
        keywords="about atharva playschool, teacher karad, early childhood education karad, playschool philosophy maharashtra"
        canonical="/about"
      />
      <PageHero
        title="About Us"
        subtitle="A decade of nurturing young minds in Karad with love, culture, and purpose."
        gradient="from-violet-500 via-purple-400 to-pink-400"
        emoji="🏫"
      />
      <TeacherProfile />
      <PhilosophySection />
      <TimelineSection />
    </>
  )
}
