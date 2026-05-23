'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  UsersThree,
  Timer,
  Robot,
  Wallet,
  Globe,
} from '@phosphor-icons/react'

const differentiators = [
  {
    icon: UsersThree,
    title: 'Local and senior.',
    body: 'You speak to experienced people in your time zone, on a local number. No junior handoffs. No overseas account managers.',
  },
  {
    icon: Timer,
    title: 'Outcomes, not hours.',
    body: 'We price by the result, not the timesheet. Your scope, your fee — our problem to deliver. No billing surprises.',
  },
  {
    icon: Robot,
    title: 'AI inside the work.',
    body: 'We use AI tools every day to deliver faster and cheaper. That is how we keep prices fair and timelines honest.',
  },
  {
    icon: Wallet,
    title: 'Built for mid-market budgets.',
    body: 'Real expertise at pricing that reflects the South African market. Not the global consultancy rate card.',
  },
  {
    icon: Globe,
    title: 'African context.',
    body: 'We understand local data, local regulation, and how business actually gets done across the continent.',
  },
]

export default function WhyUs() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="why-us" className="bg-zinc-50 py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 lg:gap-24 items-start">

          {/* Left — sticky header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="lg:sticky lg:top-24"
          >
            <p className="text-xs font-mono tracking-widest text-amber-600 uppercase mb-4">
              Why work with us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-zinc-900 leading-tight mb-6">
              One partner.<br />One plan.<br />Real outcomes.
            </h2>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-[42ch]">
              Most AI projects fail because strategy, data, engineering, and
              marketing are split between too many vendors. Cernislabs runs the
              whole picture.
            </p>

            {/* Decorative line */}
            <div className="mt-10 h-px w-16 bg-amber-500" />
          </motion.div>

          {/* Right — differentiator list */}
          <div className="space-y-0 divide-y divide-zinc-200">
            {differentiators.map((d, i) => {
              const Icon = d.icon
              return (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 20,
                    delay: 0.1 + i * 0.07,
                  }}
                  className="group py-7 flex gap-6 hover:bg-zinc-100/80 transition-colors duration-200 rounded-xl px-5 -mx-5 cursor-default"
                >
                  <div className="mt-0.5 flex-shrink-0">
                    <div className="w-9 h-9 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center group-hover:border-amber-400/60 group-hover:bg-amber-50 transition-all duration-300">
                      <Icon size={18} weight="regular" className="text-zinc-500 group-hover:text-amber-600 transition-colors duration-300" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-zinc-900 tracking-tight mb-1.5">
                      {d.title}
                    </h3>
                    <p className="text-sm text-zinc-500 leading-relaxed max-w-[52ch]">
                      {d.body}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
