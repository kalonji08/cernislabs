'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { UsersThree, Timer, Robot, Wallet, Globe } from '@phosphor-icons/react'

const differentiators = [
  { icon: UsersThree, title: 'Local and senior.',             body: 'You speak to experienced people in your time zone, on a local number. No junior handoffs. No overseas account managers.' },
  { icon: Timer,      title: 'Outcomes, not hours.',          body: 'We price by the result, not the timesheet. Your scope, your fee — our problem to deliver. No billing surprises.' },
  { icon: Robot,      title: 'AI inside the work.',           body: 'We use AI tools every day to deliver faster and cheaper. That is how we keep prices fair and timelines honest.' },
  { icon: Wallet,     title: 'Built for mid-market budgets.', body: 'Real expertise at pricing that reflects the South African market. Not the global consultancy rate card.' },
  { icon: Globe,      title: 'African context.',              body: 'We understand local data, local regulation, and how business actually gets done across the continent.' },
]

function ParallaxSideImage() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <div ref={ref} className="relative h-[400px] rounded-[20px] overflow-hidden mt-10">
      <motion.div className="absolute inset-[-12%]" style={{ y }}>
        <Image
          src="/images/pexels-ramonkaphotography-2.jpg"
          alt="CernisLabs — senior partners"
          fill className="object-cover"
          sizes="(max-width: 1024px) 100vw, 38vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-brand/50 to-transparent" />
      <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-sm rounded-[14px] px-4 py-3">
        <p className="font-heading text-sm font-semibold text-brand">Senior partners. Local number. Real accountability.</p>
      </div>
    </div>
  )
}

export default function WhyUs() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="why-us" className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 lg:gap-24 items-start">

          {/* Left — sticky header + image */}
          <motion.div ref={ref} initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ type: 'spring', stiffness: 100, damping: 20 }} className="lg:sticky lg:top-24">
            <p className="text-xs font-mono tracking-widest text-brand-muted uppercase mb-4">Why work with us</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-brand leading-tight mb-6">
              One partner.<br />One plan.<br />Real outcomes.
            </h2>
            <p className="text-sm text-brand-secondary leading-relaxed max-w-[42ch]">
              Most AI projects fail because strategy, data, engineering, and marketing are split between too many vendors. CernisLabs runs the whole picture.
            </p>
            <div className="mt-8 h-px w-16 bg-brand" />
            <ParallaxSideImage />
          </motion.div>

          {/* Right — list */}
          <div className="space-y-0 divide-y divide-brand-border">
            {differentiators.map((d, i) => {
              const Icon = d.icon
              return (
                <motion.div key={d.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 + i * 0.07 }}
                  className="group py-7 flex gap-6 hover:bg-brand-light transition-colors duration-200 rounded-[20px] px-5 -mx-5 cursor-default"
                >
                  <div className="mt-0.5 flex-shrink-0">
                    <div className="w-9 h-9 rounded-[10px] bg-brand-light border border-brand-border flex items-center justify-center group-hover:border-brand group-hover:bg-white transition-all duration-300">
                      <Icon size={18} weight="regular" className="text-brand-muted group-hover:text-brand transition-colors duration-300" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-brand tracking-tight mb-1.5">{d.title}</h3>
                    <p className="text-sm text-brand-secondary leading-relaxed max-w-[52ch]">{d.body}</p>
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
