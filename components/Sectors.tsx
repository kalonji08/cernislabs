'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { Bank, ShoppingCart, Heart, Leaf, Truck, Gear } from '@phosphor-icons/react'

const sectors = [
  { icon: Bank,         label: 'Financial services',    img: '/images/BANKINGpexels-liliana-drew-8554387.jpg' },
  { icon: Leaf,         label: 'Agribusiness',          img: '/images/AGRIpexels-nc-farm-bureau-mark-11678440.jpg' },
  { icon: ShoppingCart, label: 'Entrepreneurship',      img: '/images/ENtREpeneurpexels-pavel-danilyuk-8761552.jpg' },
  { icon: Heart,        label: 'Research & analytics',  img: '/images/RESEARCHpexels-mikhail-nilov-8851548.jpg' },
  { icon: Truck,        label: 'Education',             img: '/images/EDUCATIONpexels-yankrukov-8617888.jpg' },
  { icon: Gear,         label: 'Other industries',      img: '/images/pexels-ramonkaphotography-1.jpg' },
]

const criteria = [
  'Annual turnover between R100m and R2bn',
  'Between 80 and 1,500 staff',
  'Leadership that has tried AI and wants to go further',
  'A real problem to solve — not a buzzword to chase',
]

/* Image card with parallax */
function SectorCard({ sector, i, inView }: { sector: typeof sectors[0]; i: number; inView: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const Icon = sector.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: 'spring', stiffness: 90, damping: 20, delay: 0.08 * i }}
      className="group relative rounded-[20px] overflow-hidden cursor-default aspect-[4/3]"
    >
      {/* Parallax image */}
      <div className="absolute inset-[-12%]">
        <motion.div className="w-full h-full" style={{ y: imgY }}>
          <Image src={sector.img} alt={sector.label} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
        </motion.div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand/80 via-brand/20 to-transparent" />

      {/* Hover scale */}
      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.04 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[10px] bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <Icon size={16} weight="regular" className="text-white" />
          </div>
          <span className="font-heading text-sm font-semibold text-white tracking-tight">{sector.label}</span>
        </div>
      </div>

      {/* Bottom line on hover */}
      <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-white/40 transition-all duration-500 ease-out" />
    </motion.div>
  )
}

export default function Sectors() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 lg:gap-20 items-start">

          {/* Left — image grid */}
          <div>
            <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ type: 'spring', stiffness: 100, damping: 20 }} className="mb-10">
              <p className="text-xs font-mono tracking-widest text-brand-muted uppercase mb-3">Who we work with</p>
              <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-brand">Sectors we know well.</h2>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {sectors.map((sector, i) => (
                <SectorCard key={sector.label} sector={sector} i={i} inView={inView} />
              ))}
            </div>
          </div>

          {/* Right — criteria + geography */}
          <div className="space-y-4 lg:sticky lg:top-24">
            <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
              className="rounded-[20px] bg-brand border border-brand p-8">
              <h3 className="font-heading text-sm font-semibold text-white tracking-tight mb-6">Our typical client</h3>
              <ul className="space-y-4">
                {criteria.map((c, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-muted flex-shrink-0" />
                    <span className="text-sm text-white/70 leading-relaxed">{c}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.3 }}
              className="rounded-[20px] border border-brand-border bg-brand-light p-8">
              <h3 className="font-heading text-sm font-semibold text-brand tracking-tight mb-4">Where we work</h3>
              <p className="text-sm text-brand-secondary leading-relaxed mb-4">
                Home is Johannesburg. Year one focus is South Africa, with selected projects in{' '}
                <span className="text-brand font-semibold">Kenya</span>,{' '}
                <span className="text-brand font-semibold">Nigeria</span>, and{' '}
                <span className="text-brand font-semibold">Francophone markets</span>.
              </p>
              <p className="text-xs font-mono text-brand-muted tracking-wide">Remote by default — on site when it matters.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
