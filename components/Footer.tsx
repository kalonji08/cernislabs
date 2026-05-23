'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, EnvelopeSimple, Globe, MapPin } from '@phosphor-icons/react'

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <footer id="contact" className="bg-zinc-950 border-t border-zinc-800/60">

      {/* CTA block */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-end">

          {/* Left — big CTA */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <p className="text-xs font-mono tracking-widest text-amber-500 uppercase mb-6">
              Get in touch
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-zinc-50 leading-[0.95] mb-8">
              Start with fifteen
              <br />
              <span className="text-amber-500">minutes.</span>
            </h2>
            <p className="text-base text-zinc-400 leading-relaxed max-w-[50ch] mb-10">
              No pitch. No pressure. We will tell you honestly whether we can
              help — and if we cannot, we will point you to someone who can.
            </p>
            <a
              href="mailto:hello@cernislabs.com"
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-amber-500 text-zinc-950 text-sm font-semibold hover:bg-amber-400 transition-all duration-200 active:scale-[0.98]"
              style={{ transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              <EnvelopeSimple size={18} weight="bold" />
              hello@cernislabs.com
              <ArrowRight
                size={16}
                weight="bold"
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </a>
          </motion.div>

          {/* Right — contact card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.15 }}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-7 space-y-5"
            style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.03) inset' }}
          >
            <div>
              <p className="text-xs text-zinc-600 font-mono uppercase tracking-widest mb-1">Email</p>
              <a
                href="mailto:hello@cernislabs.com"
                className="text-sm text-zinc-300 hover:text-amber-400 transition-colors duration-150"
              >
                hello@cernislabs.com
              </a>
            </div>
            <div className="h-px bg-zinc-800" />
            <div>
              <p className="text-xs text-zinc-600 font-mono uppercase tracking-widest mb-1">Web</p>
              <a
                href="https://www.cernislabs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-300 hover:text-amber-400 transition-colors duration-150 flex items-center gap-1.5"
              >
                <Globe size={14} className="text-zinc-600" />
                www.cernislabs.com
              </a>
            </div>
            <div className="h-px bg-zinc-800" />
            <div>
              <p className="text-xs text-zinc-600 font-mono uppercase tracking-widest mb-1">Location</p>
              <p className="text-sm text-zinc-400 flex items-center gap-1.5">
                <MapPin size={14} weight="fill" className="text-amber-500" />
                Johannesburg, South Africa
              </p>
            </div>
            <div className="h-px bg-zinc-800" />
            <div>
              <p className="text-xs text-zinc-600 font-mono uppercase tracking-widest mb-1">Discovery</p>
              <p className="text-sm text-zinc-400">
                No charge. 15 minutes. Honest advice.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
            </span>
            <span className="text-sm font-semibold text-zinc-400">Cernislabs</span>
          </div>

          <p className="text-xs text-zinc-700 font-mono">
            Johannesburg, South Africa &mdash; {new Date().getFullYear()}
          </p>

          <div className="flex items-center gap-5">
            {['Services', 'Why us', 'Process'].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(' ', '-')}`}
                className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors duration-150"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
