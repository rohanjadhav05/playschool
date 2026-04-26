import React from 'react'
import SEO from '../components/common/SEO'
import PageHero from '../components/common/PageHero'
import GalleryGrid from '../components/gallery/GalleryGrid'

export default function GalleryPage() {
  return (
    <>
      <SEO
        title="Gallery"
        description="Photos from our classrooms, festival celebrations, annual events, and daily activities at Atharva Playschool, Karve, Karad."
        keywords="atharva playschool gallery, playschool photos karad, school events karad, diwali celebration school"
        canonical="/gallery"
      />
      <PageHero
        title="Gallery"
        subtitle="Moments from our classroom, festivals, and events."
        gradient="from-primary via-cta to-secondary"
        emoji="📸"
      />
      <GalleryGrid />
    </>
  )
}
