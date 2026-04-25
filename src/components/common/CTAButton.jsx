import React from 'react'
import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-cta text-white hover:bg-cta-dark shadow-cta',
  secondary: 'bg-secondary text-white hover:bg-secondary-dark',
  whatsapp: 'bg-whatsapp text-white hover:opacity-90',
  outline: 'border-2 border-cta text-cta hover:bg-cta hover:text-white',
  'outline-white': 'border-2 border-white text-white hover:bg-white hover:text-cta',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function CTAButton({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  ...props
}) {
  const base = `inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return (
      <motion.a
        href={href}
        className={base}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      className={base}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
