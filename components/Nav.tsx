'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { List, X } from '@phosphor-icons/react'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Why us', href: '#why-us' },
  { label: 'Process', href: '#process' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    return scrollY.on('change', (v) => setScrolled(v > 40))
  }, [scrollY])

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/60'
            : 'bg-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <span className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-950" />
            </span>
            <span className="text-sm font-semibold tracking-tight text-zinc-100">
              Cernislabs
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              className="text-sm font-medium px-4 py-2 rounded-lg bg-amber-500 text-zinc-950 hover:bg-amber-400 transition-all duration-200 active:scale-[0.98]"
            >
              Book discovery call
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-zinc-400 hover:text-zinc-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <List size={22} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        className="fixed inset-0 z-40 bg-zinc-950 md:hidden flex flex-col justify-center px-8"
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
              className="text-3xl font-semibold text-zinc-100 tracking-tight"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: open ? 1 : 0, x: open ? 0 : 20 }}
              transition={{ delay: i * 0.07 }}
            >
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-4 inline-block text-sm font-medium px-5 py-3 rounded-lg bg-amber-500 text-zinc-950 w-fit"
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
