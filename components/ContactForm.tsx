'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  PaperPlaneTilt,
  CheckCircle,
  WarningCircle,
  SpinnerGap,
  User,
  EnvelopeSimple,
  Buildings,
  ChatText,
  CaretDown,
} from '@phosphor-icons/react'

// ─── Replace this with your Formspree form ID ───────────────────────────────
// Sign up at https://formspree.io → New Form → copy the ID from the endpoint
// e.g. if your endpoint is https://formspree.io/f/xpwzgkdo  →  FORM_ID = 'xpwzgkdo'
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? 'YOUR_FORM_ID'
// ─────────────────────────────────────────────────────────────────────────────

const services = [
  'Cost Reduction Advisory',
  'Data Analytics & Engineering',
  'Full-Stack Dev & Cloud DevOps',
  'Digital Marketing & SEO',
  'Not sure yet — let us advise',
]

type Status = 'idle' | 'loading' | 'success' | 'error'

interface FieldProps {
  label: string
  error?: string
  children: React.ReactNode
}

function Field({ label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-mono uppercase tracking-widest text-zinc-500">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-xs text-red-400 font-mono"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const inputClass =
  'w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10 transition-all duration-200'

export default function ContactForm() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  })

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    setErrors((err) => ({ ...err, [k]: '' }))
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required.'
    if (!form.email.trim()) e.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Please enter a valid email address.'
    if (!form.message.trim()) e.message = 'Tell us a bit about what you need.'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    setStatus('loading')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company || 'Not provided',
          service: form.service || 'Not specified',
          message: form.message,
        }),
      })

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', company: '', service: '', message: '' })
      } else {
        const data = await res.json()
        if (data?.errors) {
          setErrors({ form: data.errors.map((e: { message: string }) => e.message).join(', ') })
        }
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact-form" className="bg-zinc-950 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="mb-14"
        >
          <p className="text-xs font-mono tracking-widest text-amber-500 uppercase mb-3">
            Start the conversation
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-zinc-50 max-w-xl">
            Tell us what you are trying to solve.
          </h2>
          <p className="mt-4 text-sm text-zinc-500 max-w-[52ch]">
            Fill in the form and we will respond within one business day. Discovery calls are free — no pitch, no pressure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">

          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 90, damping: 20, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-10 flex flex-col items-center text-center gap-5"
                  style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.03) inset' }}
                >
                  <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                    <CheckCircle size={28} weight="fill" className="text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-100 tracking-tight mb-2">
                      Message received.
                    </h3>
                    <p className="text-sm text-zinc-500 leading-relaxed max-w-[40ch]">
                      We will be in touch within one business day. If it is urgent, email us directly at{' '}
                      <a href="mailto:hello@cernislabs.com" className="text-amber-400 hover:underline">
                        hello@cernislabs.com
                      </a>
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-2 text-xs font-mono text-zinc-600 hover:text-zinc-400 transition-colors"
                  >
                    Send another message →
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 space-y-5"
                  style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.03) inset' }}
                >
                  {/* Row: Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Full name *" error={errors.name}>
                      <div className="relative">
                        <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Jane Smith"
                          value={form.name}
                          onChange={set('name')}
                          className={`${inputClass} pl-9 ${errors.name ? 'border-red-500/50 focus:border-red-500/60 focus:ring-red-500/10' : ''}`}
                        />
                      </div>
                    </Field>
                    <Field label="Work email *" error={errors.email}>
                      <div className="relative">
                        <EnvelopeSimple size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
                        <input
                          type="email"
                          placeholder="jane@company.com"
                          value={form.email}
                          onChange={set('email')}
                          className={`${inputClass} pl-9 ${errors.email ? 'border-red-500/50 focus:border-red-500/60 focus:ring-red-500/10' : ''}`}
                        />
                      </div>
                    </Field>
                  </div>

                  {/* Row: Company + Service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Company (optional)">
                      <div className="relative">
                        <Buildings size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Acme Corp"
                          value={form.company}
                          onChange={set('company')}
                          className={`${inputClass} pl-9`}
                        />
                      </div>
                    </Field>
                    <Field label="Service of interest">
                      <div className="relative">
                        <select
                          value={form.service}
                          onChange={set('service')}
                          className={`${inputClass} appearance-none pr-9 cursor-pointer`}
                        >
                          <option value="" disabled>Select a service…</option>
                          {services.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <CaretDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
                      </div>
                    </Field>
                  </div>

                  {/* Message */}
                  <Field label="What are you trying to solve? *" error={errors.message}>
                    <div className="relative">
                      <ChatText size={16} className="absolute left-3.5 top-3.5 text-zinc-600 pointer-events-none" />
                      <textarea
                        rows={5}
                        placeholder="Give us the short version — what is the problem and what outcome matters to you…"
                        value={form.message}
                        onChange={set('message')}
                        className={`${inputClass} pl-9 resize-none ${errors.message ? 'border-red-500/50 focus:border-red-500/60 focus:ring-red-500/10' : ''}`}
                      />
                    </div>
                  </Field>

                  {/* Form-level error */}
                  <AnimatePresence>
                    {(status === 'error' || errors.form) && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3"
                      >
                        <WarningCircle size={16} className="text-red-400 shrink-0" />
                        <p className="text-xs text-red-400">
                          {errors.form ?? 'Something went wrong. Please try again or email us directly.'}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="group w-full flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-amber-500 text-zinc-950 text-sm font-semibold hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {status === 'loading' ? (
                      <>
                        <SpinnerGap size={18} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <PaperPlaneTilt size={18} weight="bold" />
                        Send message
                        <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block">→</span>
                      </>
                    )}
                  </motion.button>

                  <p className="text-xs text-zinc-700 text-center font-mono">
                    No spam. No sharing. Just a reply from a real person.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Side info ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 90, damping: 20, delay: 0.2 }}
            className="space-y-4"
          >
            {[
              {
                title: 'Free discovery call',
                body: '15 minutes. No pitch. We will tell you honestly if we are the right fit.',
              },
              {
                title: 'One business day',
                body: 'Our response time is a commitment, not a target. You will hear from a senior partner — not a sales rep.',
              },
              {
                title: 'Fixed-fee proposals',
                body: 'Every engagement starts with a one-page proposal. Scope, price, and timeline — upfront.',
              },
              {
                title: 'No lock-in',
                body: 'We earn the next engagement by delivering on this one. You own everything we build.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.25 + i * 0.07 }}
                className="group rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-5 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 group-hover:scale-125 transition-transform duration-300" />
                  <div>
                    <p className="text-sm font-semibold text-zinc-200 tracking-tight mb-1">{item.title}</p>
                    <p className="text-xs text-zinc-500 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Direct contact */}
            <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-5">
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-600 mb-3">Prefer email?</p>
              <a
                href="mailto:hello@cernislabs.com"
                className="text-sm text-amber-400 hover:text-amber-300 transition-colors duration-150 font-medium"
              >
                hello@cernislabs.com →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
