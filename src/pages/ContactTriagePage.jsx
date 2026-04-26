import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, ArrowRight, MapPin } from 'lucide-react'
import SEO from '../components/common/SEO'
import PageHero from '../components/common/PageHero'
import AdmissionStatusPill from '../components/branches/AdmissionStatusPill'
import { useBranch } from '../hooks/useBranch'

export default function ContactTriagePage() {
  const { branches } = useBranch()

  return (
    <>
      <SEO
        title="Contact Us"
        description="Choose your nearest Atharva Playschool branch to call, WhatsApp, or send an admission inquiry."
        canonical="/contact"
      />
      <PageHero
        title="Which branch are you contacting?"
        subtitle="Pick the branch closest to you — your inquiry will route to the right team."
        gradient="from-cta via-red-400 to-secondary"
        emoji="👋"
      />

      <section className="py-12 md:py-16 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {branches.map((b, i) => {
              const addressLine = `${b.address.line1}${b.address.line2 ? ', ' + b.address.line2 : ''}`
              const waUrl = `https://wa.me/${b.whatsapp}?text=${encodeURIComponent(
                `Hi, I'm interested in Atharva Playschool (${b.shortName} branch). Please contact me.`,
              )}`
              return (
                <motion.article
                  key={b.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-white rounded-3xl shadow-card hover:shadow-card-hover transition-shadow duration-300 p-6 md:p-7 flex flex-col gap-5"
                  data-branch={b.slug}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display font-bold text-xl text-textPrimary mb-1">{b.shortName}</h3>
                      <p className="font-body text-textSecondary text-sm flex items-start gap-1.5">
                        <MapPin size={14} className="mt-0.5 shrink-0 text-textMuted" />
                        <span>{addressLine}</span>
                      </p>
                    </div>
                    <AdmissionStatusPill status={b.admissionStatus} />
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:+${b.phone}`}
                      data-branch={b.slug}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-cta text-white font-body font-semibold text-sm px-3 py-2.5 rounded-full hover:bg-cta-dark transition-colors"
                    >
                      <Phone size={14} /> Call
                    </a>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-branch={b.slug}
                      className="inline-flex items-center justify-center bg-whatsapp text-white p-2.5 rounded-full hover:opacity-90 transition-opacity min-w-[42px] min-h-[42px]"
                      aria-label={`WhatsApp ${b.shortName}`}
                    >
                      <MessageCircle size={16} />
                    </a>
                  </div>

                  <Link
                    to={`/branches/${b.slug}/contact`}
                    data-branch={b.slug}
                    className="inline-flex items-center justify-between gap-2 bg-secondary text-white font-body font-semibold text-sm px-5 py-3 rounded-full hover:bg-secondary-dark transition-colors"
                  >
                    <span>Send an inquiry to {b.shortName}</span>
                    <ArrowRight size={16} />
                  </Link>
                </motion.article>
              )
            })}
          </div>

          <p className="text-center font-body text-textMuted text-sm mt-10">
            Not sure which branch is closest? <Link to="/branches" className="text-secondary font-semibold hover:underline">See all branches on a map →</Link>
          </p>
        </div>
      </section>
    </>
  )
}
