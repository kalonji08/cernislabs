'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Bank, ShoppingCart, Heart, Leaf, Truck, Gear } from '@phosphor-icons/react'

const sectors = [
  { icon: Bank, label: 'Financial services & insurance' },
  { icon: ShoppingCart, label: 'Retail & consumer goods' },
  { icon: Heart, label: 'Healthcare & medical schemes' },
  { icon: Leaf, label: 'Agribusiness & food production' },
  { icon: Truck, label: 'Logistics & mining services' },
  { icon: Gear, label: 'Other industries with real problems' },
]

const criteria = [
  'Annual turnover between R100m and R2bn',
  'Between 80 and 1,500 staff',
  'Leadership that has tried AI and wants to go further',
  'A real problem to solve — not a buzzword to chase',
]

export default function Sectors() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-zinc-50 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 lg:gap-24 items-start">

          {/* Left — sectors */}
          <div>
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className="mb-10"
            >
              <p className="text-xs font-mono tracking-widest text-amber-600 uppercase mb-3">
                Who we work with
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-zinc-900">
                Sectors we know well.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sectors.map((sector, i) => {
                const Icon = sector.icon
                return (
                  <motion.div
                    key={sector.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      type: 'spring',
                      stiffness: 100,
                      damping: 20,
                      delay: 0.1 + i * 0.06,
                    }}
                    className="group flex items-center gap-3.5 py-4 px-5 rounded-xl border border-zinc-200 bg-white hover:border-amber-300 hover:bg-amber-50/50 transition-all duration-200 cursor-default"
                    style={{ transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
                  >
                    <Icon
                      size={18}
                      weight="regular"
                      className="text-zinc-400 group-hover:text-amber-600 transition-colors duration-200 flex-shrink-0"
                    />
                    <span className="text-sm text-zinc-700 group-hover:text-zinc-900 transition-colors duration-200">
                      {sector.label}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Right — ideal client criteria + geography */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
              className="rounded-2xl bg-zinc-900 border border-zinc-800 p-8"
            >
              <h3 className="text-sm font-semibold text-zinc-100 tracking-tight mb-6">
                Our typical client
              </h3>
              <ul className="space-y-4">
                {criteria.map((c, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                    <span className="text-sm text-zinc-400 leading-relaxed">{c}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.3 }}
              className="rounded-2xl border border-zinc-200 bg-white p-8"
            >
              <h3 className="text-sm font-semibold text-zinc-900 tracking-tight mb-4">
                Where we work
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed mb-4">
                Home is Johannesburg. Year one focus is South Africa, with
                selected projects in{' '}
                <span className="text-zinc-800 font-medium">Kenya</span>,{' '}
                <span className="text-zinc-800 font-medium">Nigeria</span>, and{' '}
                <span className="text-zinc-800 font-medium">Francophone markets</span>{' '}
                where demand for senior AI services is strongest.
              </p>
              <p className="text-xs font-mono text-zinc-400 tracking-wide">
                Remote by default — on site when it matters.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
