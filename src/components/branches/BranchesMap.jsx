import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, ExternalLink } from 'lucide-react'

// Single iframe showing all branch locations on desktop. Mobile renders
// per-card "View on Maps" links instead, so this component bails out below
// the lg breakpoint to keep mobile pages light.
export default function BranchesMap({ branches }) {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mql = window.matchMedia('(min-width: 1024px)')
    const sync = () => setIsDesktop(mql.matches)
    sync()
    mql.addEventListener('change', sync)
    return () => mql.removeEventListener('change', sync)
  }, [])

  if (!isDesktop) return null

  const points = branches.filter((b) => b.maps?.lat && b.maps?.lng)
  if (points.length === 0) return null

  // Build a Google Maps "search" URL with all coords as a fallback overlay link.
  const center = avgCenter(points)
  const directionsHref = `https://www.google.com/maps/dir/${points
    .map((p) => `${p.maps.lat},${p.maps.lng}`)
    .join('/')}`

  return (
    <section className="py-12 md:py-16 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl overflow-hidden shadow-card relative"
        >
          <iframe
            title="All branches map"
            className="w-full border-0"
            style={{ height: '480px' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${center.lat},${center.lng}&z=9&output=embed`}
          />
          <div className="absolute top-4 right-4 flex flex-col gap-2 max-w-xs">
            {points.map((b) => (
              <a
                key={b.slug}
                href={`/branches/${b.slug}`}
                data-branch={b.slug}
                className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <MapPin size={14} className="text-cta shrink-0" />
                <span className="font-body font-semibold text-sm text-textPrimary">
                  {b.shortName}
                </span>
              </a>
            ))}
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-secondary text-white rounded-full px-3 py-1.5 font-body font-semibold text-xs hover:bg-secondary-dark transition-colors"
            >
              Directions across all <ExternalLink size={11} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function avgCenter(points) {
  const lat = points.reduce((s, p) => s + p.maps.lat, 0) / points.length
  const lng = points.reduce((s, p) => s + p.maps.lng, 0) / points.length
  return { lat, lng }
}
