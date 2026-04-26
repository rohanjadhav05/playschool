import React from 'react'
import { Helmet } from 'react-helmet-async'
import HeroSection from '../components/home/HeroSection'
import TrustHighlights from '../components/home/TrustHighlights'
import ActivityPreview from '../components/home/ActivityPreview'
import TestimonialsSnippet from '../components/home/TestimonialsSnippet'
import ProgramsCTABanner from '../components/home/ProgramsCTABanner'
import BranchSwitchPrompt from '../components/common/BranchSwitchPrompt'
import SEO from '../components/common/SEO'
import { BRAND, BRANCHES } from '../../school.config.js'

const buildJsonLd = () => {
  const primary = BRANCHES.find((b) => b.isPrimary) || BRANCHES[0]
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: BRAND.name,
    alternateName: 'अथर्व प्लेस्कूल',
    description: 'Activity-based playschool and tuition centre rooted in Indian values, with branches across Maharashtra.',
    url: `https://${BRAND.domain}`,
    telephone: primary ? `+${primary.phone}` : undefined,
    email: primary?.email,
    address: BRANCHES.map((b) => ({
      '@type': 'PostalAddress',
      streetAddress: b.address.line1,
      addressLocality: b.address.city,
      addressRegion: b.address.state,
      postalCode: b.address.pin,
      addressCountry: 'IN',
    })),
    location: BRANCHES.map((b) => ({
      '@type': 'Place',
      name: b.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: b.address.line1,
        addressLocality: b.address.city,
        addressRegion: b.address.state,
        postalCode: b.address.pin,
        addressCountry: 'IN',
      },
      telephone: `+${b.phone}`,
      ...(b.maps?.lat && b.maps?.lng
        ? { geo: { '@type': 'GeoCoordinates', latitude: b.maps.lat, longitude: b.maps.lng } }
        : {}),
    })),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
    sameAs: [BRAND.social.facebook, BRAND.social.instagram, BRAND.social.youtube].filter(Boolean),
  }
}

export default function HomePage() {
  return (
    <>
      <SEO
        description="Atharva Playschool — activity-based playschool and tuition classes across Maharashtra. Indian values, small batches, admissions open for 2025–26."
        keywords="playschool karad, nursery karad, preschool karad, tuition karad, atharva playschool, karve karad school, satara playschool, best playschool maharashtra"
        canonical="/"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(buildJsonLd())}</script>
      </Helmet>
      <HeroSection />
      <BranchSwitchPrompt />
      <TrustHighlights />
      <ActivityPreview />
      <TestimonialsSnippet />
      <ProgramsCTABanner />
    </>
  )
}
