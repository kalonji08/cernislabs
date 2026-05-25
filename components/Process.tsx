'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MagnifyingGlass, FileText, ArrowRight, CheckCircle } from '@phosphor-icons/react'

const steps = [
  { num: '1', icon: MagnifyingGlass, title: 'Discovery',  subtitle: 'No charge. No obligation.', body: 'A short, focused conversation to understand the problem you actually want solved. We listen first, advise second.' },
  { num: '2', icon: FileText,        title: 'Proposal',   subtitle: 'One page. Fixed fee.',       body: 'A clear plan with the scope, deliverables, price, and timeline. No mystery, no jargon, no open-ended billing.' },
  { num: '3', icon: ArrowRight,      title: 'Delivery',   subtitle: 'Weekly updates. Named lead.', body: 'A shared channel, a named contact you can actually reach, and written updates every week. No surprises.' },
  { num: '4', icon: CheckCircle,     title: 'Handover',   subtitle: 'Full docs. Your call on next.', body: 'Working software or a clear report, complete documentation, and a recommended next step. You decide what comes next.' },
]

export default function Process() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id="process" className="bg-brand-light py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ type: 'spring', stiffness: 100, damping: 20 }} className="mb-16">
          <p className="text-xs font-mono tracking-widest text-brand-muted uppercase mb-3">How we work</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-brand">Every engagement. Same simple path.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: 'spring', stiffness: 90, damping: 20, delay: 0.1 + i * 0.09 }}
                className="group bg-white rounded-[20px] border border-brand-border p-8 hover:shadow-md transition-all duration-300 relative"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-7 h-7 rounded-full border border-brand-border bg-brand-light flex items-center justify-center text-xs font-mono text-brand-muted group-hover:border-brand group-hover:text-brand transition-all duration-300">
                    {step.num}
                  </span>
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block h-px flex-1 bg-brand-border group-hover:bg-brand-muted transition-colors" />
                  )}
                </div>
                <div className="mb-5">
                  <Icon size={24} weight="regular" className="text-brand-muted group-hover:text-brand transition-colors duration-300" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-brand tracking-tight mb-1">{step.title}</h3>
                <p className="text-xs font-mono text-brand-muted mb-3 tracking-wide uppercase">{step.subtitle}</p>
                <p className="text-sm text-brand-secondary leading-relaxed">{step.body}</p>
                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-brand to-transparent transition-all duration-500 ease-out rounded-b-[20px]" />
              </motion.div>
            )
          })}
        </div>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }} className="mt-8 text-sm text-brand-muted text-center font-medium">
          No scope creep. No mystery. The same path, every time.
        </motion.p>
      </div>
    </section>
  )
}
