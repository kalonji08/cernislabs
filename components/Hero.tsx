'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, animate, useInView, useScroll } from 'framer-motion'
import { ArrowRight, MapPin } from '@phosphor-icons/react'
import Image from 'next/image'

const PHRASES = [
  '90 days to first savings',
  'One partner. Four capabilities.',
  'Senior expertise, local rates.',
  'Outcomes, not hourly bills.',
]

function TypewriterCycle() {
  const [index, setIndex]         = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting]   = useState(false)

  useEffect(() => {
    const phrase = PHRASES[index]
    let t: ReturnType<typeof setTimeout>
    if (!deleting && displayed.length < phrase.length) {
      t = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 44)
    } else if (!deleting && displayed.length === phrase.length) {
      t = setTimeout(() => setDeleting(true), 2600)
    } else if (deleting && displayed.length > 0) {
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 20)
    } else {
      setDeleting(false)
      setIndex((i) => (i + 1) % PHRASES.length)
    }
    return () => clearTimeout(t)
  }, [displayed, deleting, index])

  return (
    <span className="font-mono text-xs tracking-widest text-white/70 uppercase">
      {displayed}<span className="animate-pulse ml-0.5">|</span>
    </span>
  )
}

function Counter({ to, delay = 0 }: { to: number; delay?: number }) {
  const ref    = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, {
      duration: 1.4, delay, ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v).toString() },
    })
    return () => c.stop()
  }, [inView, to, delay])
  return <span ref={ref}>0</span>
}

function MaskReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={`flex flex-wrap gap-x-[0.22em] ${className}`}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ type: 'spring', stiffness: 80, damping: 18, delay: delay + i * 0.055 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  /* Parallax: image scrolls at 30% of page scroll speed */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  /* Content fades + lifts as user scrolls away */
  const contentY       = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] w-full overflow-hidden flex items-center"
    >
      {/* ── Full-bleed parallax background image ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: imageY, scale: 1.15 }}
      >
        <Image
          src="/images/pexels-sonny-8581531.jpg"
          alt="CernisLabs — AI consulting in action"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </motion.div>

      {/* ── Layered overlays for depth + readability ── */}
      {/* Dark base */}
      <div className="absolute inset-0 bg-brand/70" />
      {/* Vignette from top */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand/60 via-transparent to-brand/80" />
      {/* Subtle left-side brightness for text area */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand/40 via-transparent to-transparent" />
      {/* Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      {/* ── Content ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-20"
      >
        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-10 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm"
        >
          <MapPin size={12} weight="fill" className="text-white/60" />
          <span className="text-xs font-medium text-white/80 tracking-wide">Johannesburg, South Africa</span>
        </motion.div>

        {/* Headline — H1 for SEO */}
        <h1
          className="font-heading font-bold tracking-tight leading-[0.9] text-white mb-8"
          style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
        >
          <MaskReveal text="AI that actually" delay={0.15} />
          <MaskReveal text="moves the needle." delay={0.35} className="text-white/50" />
        </h1>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="text-base md:text-xl text-white/70 leading-relaxed max-w-[52ch] mb-10"
        >
          Strategy, software, data, and growth — under one roof — for South African
          and African businesses ready to do something serious with AI.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex flex-wrap gap-3 mb-16"
        >
          <a
            href="#contact-form"
            className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-brand text-sm font-semibold hover:bg-brand-light transition-all duration-200 active:scale-[0.97]"
          >
            Book discovery call
            <ArrowRight size={15} weight="bold" className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold hover:bg-white/20 transition-all duration-200 active:scale-[0.97]"
          >
            See our services
          </a>
        </motion.div>

        {/* Typewriter strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mb-16"
        >
          <TypewriterCycle />
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 1.0 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl"
        >
          {[
            { to: 90,  unit: 'days',     label: 'to first savings', delay: 0.6 },
            { to: 4,   unit: 'services', label: 'one partner',      delay: 0.7 },
            { to: 0,   unit: 'charge',   label: 'for discovery',    delay: 0.8 },
            { to: 1,   unit: 'contact',  label: 'for everything',   delay: 0.9 },
          ].map((m) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 18, delay: m.delay }}
              className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-4 text-center"
            >
              <div className="font-heading text-2xl font-bold text-white tracking-tight">
                <Counter to={m.to} delay={m.delay} />
                <span className="text-sm text-white/60 ml-0.5">{m.unit}</span>
              </div>
              <p className="text-[11px] text-white/50 mt-0.5 leading-tight">{m.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Sectors */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-16 pt-8 border-t border-white/15 flex flex-wrap gap-6"
        >
          {['Financial services', 'Retail', 'Healthcare', 'Agribusiness', 'Logistics'].map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.35 + i * 0.06 }}
              className="text-xs text-white/40 tracking-wide font-medium"
            >
              {s}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  )
}
