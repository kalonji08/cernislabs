'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const beliefs = [
  {
    num: '01',
    title: 'AI should pay for itself.',
    body: 'Within months, not years. If the investment takes longer than that to justify, it is the wrong investment.',
  },
  {
    num: '02',
    title: 'Buy outcomes, not hours.',
    body: 'You should not be paying for time spent. You should be paying for results delivered. We price accordingly.',
  },
  {
    num: '03',
    title: 'Good technology is invisible.',
    body: 'It just works. If your people are fighting the tool, the tool is wrong. We build things that disappear into the workflow.',
  },
  {
    num: '04',
    title: 'Local partners beat distant ones.',
    body: 'Every time. A senior partner in your time zone, on a local number, who understands the local context is worth more than a global brand logo.',
  },
]

export default function Beliefs() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-zinc-50 py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div ref={ref} className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono tracking-widest text-amber-600 uppercase mb-3"
          >
            What we believe
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold tracking-tighter text-zinc-900 max-w-lg"
            >
              Four principles that shape every engagement.
            </motion.h2>
          </div>
        </div>

        {/* Beliefs */}
        <div className="divide-y divide-zinc-200">
          {beliefs.map((belief, i) => (
            <motion.div
              key={belief.num}
              initial={{ opacity: 0, x: -32 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                type: 'spring',
                stiffness: 90,
                damping: 20,
                delay: 0.15 + i * 0.1,
              }}
              className="group grid grid-cols-[56px_1fr] md:grid-cols-[72px_1fr_1fr] gap-6 md:gap-12 py-8 items-start rounded-xl px-4 -mx-4 hover:bg-zinc-100/80 transition-colors duration-300 cursor-default"
            >
              {/* Number with amber line */}
              <div className="flex flex-col items-start gap-2 pt-1">
                <span className="font-mono text-xs text-zinc-400 group-hover:text-amber-600 transition-colors duration-300">
                  {belief.num}
                </span>
                <motion.div
                  className="h-px bg-amber-500 w-0 group-hover:w-8 transition-all duration-500"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-zinc-900 leading-snug">
                {belief.title}
              </h3>

              {/* Body */}
              <p className="text-sm md:text-base text-zinc-500 leading-relaxed max-w-[52ch] col-start-2 md:col-start-auto">
                {belief.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
