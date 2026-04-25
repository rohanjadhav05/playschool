import React from 'react'
import HeroSection from '../components/home/HeroSection'
import TrustHighlights from '../components/home/TrustHighlights'
import ActivityPreview from '../components/home/ActivityPreview'
import TestimonialsSnippet from '../components/home/TestimonialsSnippet'
import ProgramsCTABanner from '../components/home/ProgramsCTABanner'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustHighlights />
      <ActivityPreview />
      <TestimonialsSnippet />
      <ProgramsCTABanner />
    </>
  )
}
