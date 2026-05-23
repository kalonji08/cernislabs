'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion'
import { ArrowRight, MapPin, EnvelopeSimple } from '@phosphor-icons/react'

/* ─── Typewriter ─── */
const PHRASES = [
  '90 days to first savings',
  'One partner. Four capabilities.',
  'Senior expertise, local rates.',
  'Outcomes, not hourly bills.',
]

function TypewriterCycle() {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

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
    <span className="font-mono text-xs tracking-widest text-amber-400 uppercase">
      {displayed}
      <span className="animate-pulse ml-0.5">|</span>
    </span>
  )
}

/* ─── Animated counter ─── */
function Counter({ to, delay = 0 }: { to: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration: 1.4,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v).toString()
      },
    })
    return () => controls.stop()
  }, [inView, to, delay])

  return <span ref={ref}>0</span>
}

/* ─── Word mask reveal ─── */
function MaskReveal({
  text,
  className,
  delay = 0,
  color = 'text-zinc-50',
}: {
  text: string
  className?: string
  delay?: number
  color?: string
}) {
  const words = text.split(' ')
  return (
    <span className={`flex flex-wrap gap-x-[0.25em] leading-none ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className={`inline-block ${color}`}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 80,
              damping: 18,
              delay: delay + i * 0.055,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/* ─── Floating orb ─── */
function Orb({
  size,
  color,
  x,
  y,
  duration,
  delay,
}: {
  size: number
  color: string
  x: string
  y: string
  duration: number
  delay: number
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, left: x, top: y, background: color, filter: 'blur(80px)' }}
      animate={{ x: [0, 24, -16, 0], y: [0, -20, 12, 0], scale: [1, 1.08, 0.95, 1] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

/* ─── Main Hero ─── */
export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Subtle parallax on the right panel
  const panelRotateX = useTransform(mouseY, [-300, 300], [4, -4])
  const panelRotateY = useTransform(mouseX, [-400, 400], [-6, 6])

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left - rect.width / 2)
      mouseY.set(e.clientY - rect.top - rect.height / 2)
    }
    el.addEventListener('mousemove', handleMove)
    return () => el.removeEventListener('mousemove', handleMove)
  }, [mouseX, mouseY])

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] bg-zinc-950 flex items-center overflow-hidden"
    >
      {/* ── Background orbs ── */}
      <Orb size={600} color="rgba(217,119,6,0.07)" x="10%" y="-10%" duration={14} delay={0} />
      <Orb size={400} color="rgba(217,119,6,0.05)" x="60%" y="40%" duration={18} delay={3} />
      <Orb size={300} color="rgba(120,80,0,0.06)" x="30%" y="60%" duration={20} delay={6} />

      {/* ── Subtle grid ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-16 items-center">

          {/* ── Left ── */}
          <div className="max-w-2xl">
            {/* Location tag */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-2 mb-10"
            >
              <MapPin size={13} weight="fill" className="text-amber-500" />
              <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                Johannesburg, South Africa
              </span>
            </motion.div>

            {/* Word-mask headline */}
            <div className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tighter leading-[0.92] mb-3">
              <MaskReveal text="AI that actually" delay={0.15} color="text-zinc-50" />
              <MaskReveal text="moves the needle." delay={0.35} color="text-amber-500" />
            </div>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 text-base md:text-lg text-zinc-400 leading-relaxed max-w-[52ch]"
            >
              Strategy, software, data, and growth — under one roof — for South
              African and African businesses ready to do something serious with AI.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-amber-500 text-zinc-950 text-sm font-semibold overflow-hidden active:scale-[0.97]"
                style={{ transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
              >
                {/* Shimmer sweep on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out pointer-events-none" />
                Book discovery call
                <ArrowRight
                  size={15}
                  weight="bold"
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-zinc-700 text-zinc-300 text-sm font-medium hover:border-zinc-500 hover:text-zinc-100 active:scale-[0.97]"
                style={{ transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
              >
                See our services
              </a>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="mt-10 pt-8 border-t border-zinc-800/60 flex flex-wrap gap-5"
            >
              {['Financial services', 'Retail', 'Healthcare', 'Agribusiness', 'Logistics'].map(
                (sector, i) => (
                  <motion.span
                    key={sector}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.15 + i * 0.06 }}
                    className="text-xs text-zinc-600 tracking-wide"
                  >
                    {sector}
                  </motion.span>
                )
              )}
            </motion.div>
          </div>

          {/* ── Right — 3-D tilt panel ── */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.55 }}
            className="hidden lg:block perspective-[1000px]"
            style={{ perspective: 1000 }}
          >
            {/* Outer float */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              style={{ rotateX: panelRotateX, rotateY: panelRotateY }}
            >
              {/* Glow ring behind card */}
              <div
                className="absolute -inset-4 rounded-3xl opacity-40 blur-2xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(217,119,6,0.25) 0%, transparent 70%)' }}
              />

              {/* Card */}
              <div
                className="relative rounded-2xl border border-zinc-700/60 bg-zinc-900/90 backdrop-blur-xl p-6 space-y-5"
                style={{
                  boxShadow:
                    '0 0 0 1px rgba(255,255,255,0.05) inset, 0 40px 80px -20px rgba(0,0,0,0.7)',
                }}
              >
                {/* Inner border shimmer */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)',
                  }}
                />

                {/* Typewriter */}
                <div className="border-b border-zinc-800 pb-5">
                  <TypewriterCycle />
                </div>

                {/* Status */}
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                  </span>
                  <span className="text-sm text-zinc-300">Accepting new clients</span>
                </div>

                {/* Animated counters */}
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { to: 90, unit: 'days', label: 'to first savings', delay: 0.6 },
                    { to: 4, unit: 'services', label: 'one partner', delay: 0.7 },
                    { to: 0, unit: 'charge', label: 'for discovery', delay: 0.8 },
                    { to: 1, unit: 'contact', label: 'for everything', delay: 0.9 },
                  ].map((m) => (
                    <motion.div
                      key={m.label}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 100, damping: 18, delay: m.delay }}
                      className="rounded-xl bg-zinc-800/60 border border-zinc-700/40 p-3.5"
                    >
                      <div className="flex items-baseline gap-1 mb-0.5">
                        <span className="text-xl font-bold text-zinc-100 tracking-tight font-mono">
                          <Counter to={m.to} delay={m.delay} />
                        </span>
                        <span className="text-xs text-amber-500 font-medium">{m.unit}</span>
                      </div>
                      <p className="text-xs text-zinc-500">{m.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Email */}
                <div className="pt-1 border-t border-zinc-800 flex items-center gap-2">
                  <EnvelopeSimple size={13} className="text-zinc-600" />
                  <a
                    href="mailto:hello@cernislabs.com"
                    className="text-xs text-zinc-500 hover:text-amber-400 transition-colors duration-150 font-mono"
                  >
                    hello@cernislabs.com
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
    </section>
  )
}
