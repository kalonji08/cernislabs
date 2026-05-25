'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

const beliefs = [
  { num: '01', title: 'AI should pay for itself.',        body: 'Within months, not years. If the investment takes longer than that to justify, it is the wrong investment.' },
  { num: '02', title: 'Buy outcomes, not hours.',          body: 'You should not be paying for time spent. You should be paying for results delivered. We price accordingly.' },
  { num: '03', title: 'Good technology is invisible.',     body: 'It just works. If your people are fighting the tool, the tool is wrong. We build things that disappear into the workflow.' },
  { num: '04', title: 'Local partners beat distant ones.', body: 'Every time. A senior partner in your time zone, on a local number, who understands the local context is worth more than a global brand logo.' },
]

function ScrollRevealImage() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const clipPath = useTransform(scrollYProgress, [0, 1], ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'])
  const imgY     = useTransform(scrollYProgress, [0, 1], ['10%', '-5%'])

  return (
    <div ref={ref} className="relative h-[520px] lg:h-full min-h-[480px] rounded-[24px] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ clipPath }}>
        <motion.div className="absolute inset-[-15%]" style={{ y: imgY }}>
          <Image
            src="/images/pexels-alexander-tisko-2156743736-35758419.jpg"
            alt="CernisLabs team and approach"
            fill className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-br from-brand/30 to-transparent" />
      </motion.div>
    </div>
  )
}

export default function Beliefs() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-brand-light py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — image */}
          <div className="lg:sticky lg:top-24">
            <ScrollRevealImage />
          </div>

          {/* Right — beliefs */}
          <div>
            <div ref={ref} className="mb-12">
              <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
                className="text-xs font-mono tracking-widest text-brand-muted uppercase mb-3">What we believe</motion.p>
              <div className="overflow-hidden">
                <motion.h2 initial={{ y: '100%' }} animate={inView ? { y: '0%' } : {}} transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.1 }}
                  className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-brand">
                  Four principles that shape every engagement.
                </motion.h2>
              </div>
            </div>

            <div className="divide-y divide-brand-border">
              {beliefs.map((belief, i) => (
                <motion.div key={belief.num}
                  initial={{ opacity: 0, x: 32 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ type: 'spring', stiffness: 90, damping: 20, delay: 0.15 + i * 0.1 }}
                  className="group grid grid-cols-[48px_1fr] gap-6 py-7 rounded-[20px] px-4 -mx-4 hover:bg-white transition-colors duration-300 cursor-default"
                >
                  <div className="flex flex-col items-start gap-2 pt-1">
                    <span className="font-mono text-xs text-brand-muted group-hover:text-brand transition-colors duration-300">{belief.num}</span>
                    <div className="h-px bg-brand w-0 group-hover:w-8 transition-all duration-500" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold tracking-tight text-brand leading-snug mb-2">{belief.title}</h3>
                    <p className="text-sm text-brand-secondary leading-relaxed">{belief.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
