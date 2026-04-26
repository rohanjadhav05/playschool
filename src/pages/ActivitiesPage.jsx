import React from 'react'
import ActivityPageHero from '../components/activities/ActivityPageHero'
import ActivitySection from '../components/activities/ActivitySection'
import { ACTIVITIES } from '../data/activities'
import SEO from '../components/common/SEO'

export default function ActivitiesPage() {
  return (
    <>
      <SEO
        title="Our Activities"
        description="Art & craft, storytelling, dance, festival celebrations, healthy habits, and stage confidence — daily activities at Atharva Playschool, Karad."
        keywords="playschool activities karad, art craft nursery, dance music preschool, indian festival school karad"
        canonical="/activities"
      />
      <ActivityPageHero />
      {ACTIVITIES.map((activity, i) => (
        <ActivitySection key={activity.id} activity={activity} index={i} />
      ))}
    </>
  )
}
