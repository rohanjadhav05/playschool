import React from 'react'
import { motion } from 'framer-motion'

export default function PageHero({ title, subtitle, gradient, emoji }) {
  return (
    <section
      className={`relative overflow-hidden pt-16 md:pt-20 bg-gradient-to-br ${gradient}`}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {emoji && <div className="text-5xl mb-4 select-none">{emoji}</div>}
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white leading-tight mb-3">
            {title}
          </h1>
          {subtitle && (
            <p className="font-body text-white/85 text-lg max-w-xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
