'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, EnvelopeSimple, Globe, MapPin } from '@phosphor-icons/react'

export default function Footer() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <footer id="contact" className="bg-brand border-t border-white/10">

      {/* CTA block */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-end">

          <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ type: 'spring', stiffness: 100, damping: 20 }}>
            <p className="text-xs font-mono tracking-widest text-white/40 uppercase mb-6">Get in touch</p>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[0.95] mb-8">
              Start with fifteen<br />
              <span className="text-brand-muted">minutes.</span>
            </h2>
            <p className="text-base text-white/60 leading-relaxed max-w-[50ch] mb-10">
              No pitch. No pressure. We will tell you honestly whether we can help — and if we cannot, we will point you to someone who can.
            </p>
            <a href="mailto:hello@cernislabs.com" className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-white text-brand text-sm font-semibold hover:bg-brand-light transition-all duration-200 active:scale-[0.98]">
              <EnvelopeSimple size={18} weight="bold" />
              hello@cernislabs.com
              <ArrowRight size={16} weight="bold" className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.15 }} className="rounded-[20px] border border-white/10 bg-white/5 p-7 space-y-5">
            <div>
              <p className="text-xs text-white/30 font-mono uppercase tracking-widest mb-1">Email</p>
              <a href="mailto:hello@cernislabs.com" className="text-sm text-white/80 hover:text-white transition-colors duration-150">hello@cernislabs.com</a>
            </div>
            <div className="h-px bg-white/10" />
            <div>
              <p className="text-xs text-white/30 font-mono uppercase tracking-widest mb-1">Web</p>
              <a href="https://www.cernislabs.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/80 hover:text-white transition-colors duration-150 flex items-center gap-1.5">
                <Globe size={14} className="text-white/30" />
                www.cernislabs.com
              </a>
            </div>
            <div className="h-px bg-white/10" />
            <div>
              <p className="text-xs text-white/30 font-mono uppercase tracking-widest mb-1">Location</p>
              <p className="text-sm text-white/80 flex items-center gap-1.5">
                <MapPin size={14} weight="fill" className="text-brand-muted" />
                Johannesburg, South Africa
              </p>
            </div>
            <div className="h-px bg-white/10" />
            <div>
              <p className="text-xs text-white/30 font-mono uppercase tracking-widest mb-1">Discovery</p>
              <p className="text-sm text-white/60">No charge. 15 minutes. Honest advice.</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-muted" />
            </span>
            <span className="font-heading text-sm font-semibold text-white/60">Cernislabs</span>
          </div>
          <p className="text-xs text-white/30 font-mono">Johannesburg, South Africa &mdash; {new Date().getFullYear()}</p>
          <div className="flex items-center gap-5">
            {['Services', 'Why us', 'Process'].map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`} className="text-xs text-white/30 hover:text-white/60 transition-colors duration-150">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
