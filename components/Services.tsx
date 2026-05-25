'use client'

import { motion, useInView, useMotionValue, useMotionTemplate } from 'framer-motion'
import { useRef } from 'react'
import { CurrencyDollar, Database, Code, MagnifyingGlass } from '@phosphor-icons/react'

const services = [
  { num: '01', icon: CurrencyDollar, title: 'Cost Reduction Advisory', tagline: 'Find the savings. Prove the case. Capture the value.', body: 'We audit your operations and identify where AI and automation can cut costs. You receive a clear report: the savings, the implementation cost, and the payback period. Most clients see results within 90 days.', span: 'col-span-1 lg:col-span-3' },
  { num: '02', icon: Database, title: 'Data Analytics & Engineering', tagline: 'Turn your data into decisions you can trust.', body: 'Warehouses, pipelines, dashboards, and AI models — built on your cloud, owned by you, documented end to end. Your team uses the results without needing a data scientist on call.', span: 'col-span-1 lg:col-span-2' },
  { num: '03', icon: Code, title: 'Full-Stack Dev & Cloud DevOps', tagline: 'Software that ships, scales, and stays up.', body: 'Web platforms, internal tools, customer apps, and AI-powered products on AWS, Azure, or Google Cloud. Our engineers use AI daily — that is how we deliver faster and cheaper.', span: 'col-span-1 lg:col-span-2' },
  { num: '04', icon: MagnifyingGlass, title: 'Digital Marketing & SEO', tagline: 'Get found. Get chosen. Grow.', body: 'SEO and content strategy built around what your customers actually search for. AI-assisted production that keeps quality high. Conversion optimisation tied to pipeline and revenue, not vanity metrics.', span: 'col-span-1 lg:col-span-3' },
]

function SpotlightCard({ service, delay }: { service: (typeof services)[number]; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX  = useMotionValue(0)
  const mouseY  = useMotionValue(0)
  const background = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, rgba(25,28,31,0.05), transparent 80%)`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const Icon = service.icon
  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 85, damping: 20, delay }}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
      className={`group relative rounded-[20px] border border-brand-border bg-white p-7 overflow-hidden cursor-default ${service.span}`}
      style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
    >
      <motion.div className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background }} />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <span className="font-mono text-xs text-brand-muted group-hover:text-brand transition-colors duration-300">{service.num}</span>
        </div>
        <div className="mb-6">
          <motion.div
            className="w-11 h-11 rounded-[14px] bg-brand-light border border-brand-border flex items-center justify-center"
            whileHover={{ rotate: 8, scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <Icon size={20} weight="regular" className="text-brand-muted group-hover:text-brand transition-colors duration-300" />
          </motion.div>
        </div>
        <h3 className="font-heading text-lg font-semibold tracking-tight text-brand mb-2 leading-snug">{service.title}</h3>
        <p className="text-xs font-semibold text-brand-muted mb-3 tracking-wide uppercase">{service.tagline}</p>
        <p className="text-sm text-brand-secondary leading-relaxed max-w-[52ch]">{service.body}</p>
      </div>
      <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-brand to-transparent transition-all duration-500 ease-out" />
    </motion.div>
  )
}

export default function Services() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id="services" className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ type: 'spring', stiffness: 100, damping: 20 }} className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs font-mono tracking-widest text-brand-muted uppercase mb-3">What we do</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-brand">Four services. One partner.</h2>
          </div>
          <p className="text-sm text-brand-secondary max-w-[40ch] md:text-right">Most clients start with one and grow from there. They all work better together.</p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
          {services.map((s, i) => <SpotlightCard key={s.num} service={s} delay={0.05 * i} />)}
        </div>
      </div>
    </section>
  )
}
