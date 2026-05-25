'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import { List, X } from '@phosphor-icons/react'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Why us',   href: '#why-us' },
  { label: 'Process',  href: '#process' },
]

export default function Nav() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => scrollY.on('change', (v) => setScrolled(v > 60)), [scrollY])

  /* Two visual states:
     – over hero   (scrolled=false): white text, fully transparent bg
     – past hero   (scrolled=true):  dark text, frosted white bg + border   */
  const isLight = scrolled

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isLight
            ? 'bg-white/95 backdrop-blur-md border-b border-brand-border shadow-sm'
            : 'bg-transparent border-b border-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group">
            <span className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-300 ${
              isLight ? 'bg-brand' : 'bg-white'
            }`}>
              <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                isLight ? 'bg-white' : 'bg-brand'
              }`} />
            </span>
            <span className={`font-heading text-base font-bold tracking-tight transition-colors duration-300 ${
              isLight ? 'text-brand' : 'text-white'
            }`}>
              CernisLabs
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 ${
                  isLight
                    ? 'text-brand-secondary hover:text-brand'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact-form"
              className={`text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 active:scale-[0.98] ${
                isLight
                  ? 'bg-brand text-white hover:bg-brand-secondary'
                  : 'bg-white text-brand hover:bg-brand-light border border-white/20'
              }`}
            >
              Book discovery call
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className={`md:hidden transition-colors duration-300 ${
              isLight ? 'text-brand-secondary hover:text-brand' : 'text-white/70 hover:text-white'
            }`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <List size={22} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        className="fixed inset-0 z-40 bg-white md:hidden flex flex-col justify-center px-8"
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: open ? 1 : 0, x: open ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="flex flex-col gap-8">
          {links.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-heading text-4xl font-bold text-brand tracking-tight"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: open ? 1 : 0, x: open ? 0 : 20 }}
              transition={{ delay: i * 0.07 }}
            >
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href="#contact-form"
            onClick={() => setOpen(false)}
            className="mt-4 inline-block text-sm font-semibold px-6 py-3 rounded-full bg-brand text-white w-fit"
            initial={{ opacity: 0 }}
            animate={{ opacity: open ? 1 : 0 }}
            transition={{ delay: 0.25 }}
          >
            Book discovery call
          </motion.a>
        </div>
      </motion.div>
    </>
  )
}
