import React from 'react'
import PageHero from '../components/common/PageHero'
import ContactInfo from '../components/contact/ContactInfo'
import ContactForm from '../components/contact/ContactForm'
import MapEmbed from '../components/contact/MapEmbed'

export default function ContactPage() {
  return (
    <div className="pt-16 md:pt-20">
      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out to learn more or schedule a visit."
        gradient="from-cta via-red-400 to-secondary"
        emoji="👋"
      />

      <section className="py-16 md:py-20 bg-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>

      <MapEmbed />
    </div>
  )
}
