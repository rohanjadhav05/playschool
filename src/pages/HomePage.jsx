import React from 'react'
import { Helmet } from 'react-helmet-async'
import HeroSection from '../components/home/HeroSection'
import TrustHighlights from '../components/home/TrustHighlights'
import ActivityPreview from '../components/home/ActivityPreview'
import TestimonialsSnippet from '../components/home/TestimonialsSnippet'
import ProgramsCTABanner from '../components/home/ProgramsCTABanner'
import SEO from '../components/common/SEO'
import { SCHOOL } from '../../school.config.js'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: SCHOOL.name,
  alternateName: 'अथर्व प्लेस्कूल',
  description: 'Activity-based playschool and tuition centre rooted in Indian values in Karve, Karad, Maharashtra.',
  url: `https://${SCHOOL.domain}`,
  telephone: SCHOOL.phone,
  email: SCHOOL.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SCHOOL.address.line1,
    addressLocality: 'Karad',
    addressRegion: 'Maharashtra',
    postalCode: SCHOOL.address.pin,
    addressCountry: 'IN',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '18:00',
  },
  sameAs: [SCHOOL.social.facebook, SCHOOL.social.instagram, SCHOOL.social.youtube],
}

export default function HomePage() {
  return (
    <>
      <SEO
        description="Best playschool and tuition classes in Karve, Karad, Maharashtra. Activity-based learning rooted in Indian values. Admissions open for 2025–26."
        keywords="playschool karad, nursery karad, preschool karad, tuition karad, atharva playschool, karve karad school, best playschool maharashtra"
        canonical="/"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <HeroSection />
      <TrustHighlights />
      <ActivityPreview />
      <TestimonialsSnippet />
      <ProgramsCTABanner />
    </>
  )
}
