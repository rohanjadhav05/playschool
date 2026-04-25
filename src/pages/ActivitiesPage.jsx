import React from 'react'
import ActivityPageHero from '../components/activities/ActivityPageHero'
import ActivitySection from '../components/activities/ActivitySection'
import { ACTIVITIES } from '../data/activities'

export default function ActivitiesPage() {
  return (
    <>
      <ActivityPageHero />
      {ACTIVITIES.map((activity, i) => (
        <ActivitySection key={activity.id} activity={activity} index={i} />
      ))}
    </>
  )
}
