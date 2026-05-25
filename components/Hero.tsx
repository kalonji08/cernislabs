'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, animate, useInView, useScroll } from 'framer-motion'
import { ArrowRight, MapPin, EnvelopeSimple } from '@phosphor-icons/react'
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
    <span className="font-mono text-xs tracking-widest text-brand-muted uppercase">
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

/* ── Parallax image wrapper ── */
function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden rounded-[24px]">
      <motion.div className="absolute inset-[-12%]" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 45vw"
          priority
        />
      </motion.div>
    </div>
  )
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const mouseX  = useMotionValue(0)
  const mouseY  = useMotionValue(0)
  const cardRotateX = useTransform(mouseY, [-300, 300], [2, -2])
  const cardRotateY = useTransform(mouseX, [-400, 400], [-4, 4])

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left - rect.width / 2)
      mouseY.set(e.clientY - rect.top - rect.height / 2)
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  return (
    <section ref={heroRef} className="relative min-h-[100dvh] bg-white flex items-center overflow-hidden">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #E8EAEC 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[85vh]">

          {/* ── Left ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-10 px-3.5 py-1.5 rounded-full border border-brand-border bg-brand-light"
            >
              <MapPin size={12} weight="fill" className="text-brand-muted" />
              <span className="text-xs font-medium text-brand-secondary tracking-wide">Johannesburg, South Africa</span>
            </motion.div>

            {/* Massive headline */}
            <div className="font-heading font-bold tracking-tight leading-[0.9] text-brand mb-6"
              style={{ fontSize: 'clamp(3rem, 7vw, 7rem)' }}>
              <MaskReveal text="AI that actually" delay={0.15} />
              <MaskReveal text="moves the needle." delay={0.35} className="text-brand-muted" />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="text-base md:text-lg text-brand-secondary leading-relaxed max-w-[48ch] mb-10"
            >
              Strategy, software, data, and growth — under one roof — for South African and African businesses ready to do something serious with AI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              <a href="#contact-form" className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand text-white text-sm font-semibold hover:bg-brand-secondary transition-all duration-200 active:scale-[0.97]">
                Book discovery call
                <ArrowRight size={15} weight="bold" className="group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <a href="#services" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand-light text-brand text-sm font-semibold hover:bg-brand-border transition-all duration-200 active:scale-[0.97]">
                See our services
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="pt-8 border-t border-brand-border flex flex-wrap gap-6"
            >
              {['Financial services', 'Retail', 'Healthcare', 'Agribusiness', 'Logistics'].map((s, i) => (
                <motion.span key={s} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15 + i * 0.06 }}
                  className="text-xs text-brand-muted tracking-wide font-medium">{s}</motion.span>
              ))}
            </motion.div>
          </div>

          {/* ── Right — hero image + stats card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.4 }}
            className="hidden lg:flex flex-col gap-4 h-[620px]"
          >
            {/* Main image — parallax */}
            <div className="relative flex-1 rounded-[24px] overflow-hidden shadow-2xl"
              style={{ boxShadow: '0 40px 80px -20px rgba(25,28,31,0.18)' }}>
              <ParallaxImage
                src="/images/pexels-sonny-8581531.jpg"
                alt="CernisLabs — AI consulting in action"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand/60 via-transparent to-transparent" />
              {/* Typewriter overlay */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-white/90 backdrop-blur-sm rounded-[14px] px-4 py-3">
                  <TypewriterCycle />
                </div>
              </div>
            </div>

            {/* Stats row */}
            <motion.div
              style={{ rotateX: cardRotateX, rotateY: cardRotateY }}
              className="grid grid-cols-4 gap-2"
            >
              {[
                { to: 90,  unit: 'days',    label: 'to first savings', delay: 0.6 },
                { to: 4,   unit: 'services', label: 'one partner',     delay: 0.7 },
                { to: 0,   unit: 'charge',  label: 'for discovery',    delay: 0.8 },
                { to: 1,   unit: 'contact', label: 'for everything',   delay: 0.9 },
              ].map((m) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 18, delay: m.delay }}
                  className="rounded-[16px] bg-brand-light border border-brand-border p-3.5 text-center"
                >
                  <div className="font-heading text-xl font-bold text-brand tracking-tight">
                    <Counter to={m.to} delay={m.delay} />
                    <span className="text-xs text-brand-secondary ml-0.5">{m.unit}</span>
                  </div>
                  <p className="text-[10px] text-brand-muted mt-0.5 leading-tight">{m.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
