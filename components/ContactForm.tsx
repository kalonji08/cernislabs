'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { PaperPlaneTilt, CheckCircle, WarningCircle, SpinnerGap, User, EnvelopeSimple, Buildings, ChatText, CaretDown } from '@phosphor-icons/react'

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? 'YOUR_FORM_ID'

const services = [
  'Cost Reduction Advisory',
  'Data Analytics & Engineering',
  'Full-Stack Dev & Cloud DevOps',
  'Digital Marketing & SEO',
  'Not sure yet — let us advise',
]

type Status = 'idle' | 'loading' | 'success' | 'error'

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-mono uppercase tracking-widest text-brand-muted">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-xs text-red-500 font-mono">{error}</motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const inputClass = 'w-full rounded-[14px] border border-brand-border bg-white px-4 py-3 text-sm text-brand placeholder:text-brand-muted outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all duration-200'

export default function ContactForm() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm]     = useState({ name: '', email: '', company: '', service: '', message: '' })

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    setErrors((err) => ({ ...err, [k]: '' }))
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim())    e.name    = 'Name is required.'
    if (!form.email.trim())   e.email   = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address.'
    if (!form.message.trim()) e.message = 'Tell us a bit about what you need.'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('loading')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, company: form.company || 'Not provided', service: form.service || 'Not specified', message: form.message }),
      })
      if (res.ok) { setStatus('success'); setForm({ name: '', email: '', company: '', service: '', message: '' }) }
      else { setStatus('error') }
    } catch { setStatus('error') }
  }

  return (
    <section id="contact-form" className="bg-brand-light py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ type: 'spring', stiffness: 100, damping: 20 }} className="mb-14">
          <p className="text-xs font-mono tracking-widest text-brand-muted uppercase mb-3">Start the conversation</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-brand max-w-xl">Tell us what you are trying to solve.</h2>
          <p className="mt-4 text-sm text-brand-secondary max-w-[52ch]">Fill in the form and we will respond within one business day. Discovery calls are free — no pitch, no pressure.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ type: 'spring', stiffness: 90, damping: 20, delay: 0.1 }}>
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="rounded-[20px] border border-brand-border bg-white p-10 flex flex-col items-center text-center gap-5" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
                  <div className="w-14 h-14 rounded-full bg-brand-light border border-brand-border flex items-center justify-center">
                    <CheckCircle size={28} weight="fill" className="text-brand" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-brand tracking-tight mb-2">Message received.</h3>
                    <p className="text-sm text-brand-secondary leading-relaxed max-w-[40ch]">We will be in touch within one business day. If it is urgent, email us at <a href="mailto:hello@cernislabs.com" className="text-brand font-semibold hover:underline">hello@cernislabs.com</a></p>
                  </div>
                  <button onClick={() => setStatus('idle')} className="text-xs font-mono text-brand-muted hover:text-brand transition-colors">Send another message →</button>
                </motion.div>
              ) : (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} noValidate className="rounded-[20px] border border-brand-border bg-white p-8 space-y-5" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Full name *" error={errors.name}>
                      <div className="relative"><User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" /><input type="text" placeholder="Jane Smith" value={form.name} onChange={set('name')} className={`${inputClass} pl-9 ${errors.name ? 'border-red-400' : ''}`} /></div>
                    </Field>
                    <Field label="Work email *" error={errors.email}>
                      <div className="relative"><EnvelopeSimple size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" /><input type="email" placeholder="jane@company.com" value={form.email} onChange={set('email')} className={`${inputClass} pl-9 ${errors.email ? 'border-red-400' : ''}`} /></div>
                    </Field>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Company (optional)">
                      <div className="relative"><Buildings size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" /><input type="text" placeholder="Acme Corp" value={form.company} onChange={set('company')} className={`${inputClass} pl-9`} /></div>
                    </Field>
                    <Field label="Service of interest">
                      <div className="relative">
                        <select value={form.service} onChange={set('service')} className={`${inputClass} appearance-none pr-9 cursor-pointer`}>
                          <option value="" disabled>Select a service…</option>
                          {services.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <CaretDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
                      </div>
                    </Field>
                  </div>
                  <Field label="What are you trying to solve? *" error={errors.message}>
                    <div className="relative"><ChatText size={16} className="absolute left-3.5 top-3.5 text-brand-muted pointer-events-none" /><textarea rows={5} placeholder="Give us the short version…" value={form.message} onChange={set('message')} className={`${inputClass} pl-9 resize-none ${errors.message ? 'border-red-400' : ''}`} /></div>
                  </Field>
                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2.5 rounded-[14px] border border-red-200 bg-red-50 px-4 py-3">
                        <WarningCircle size={16} className="text-red-500 shrink-0" />
                        <p className="text-xs text-red-600">Something went wrong. Please try again or email us directly.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <motion.button type="submit" disabled={status === 'loading'} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="group w-full flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-brand text-white text-sm font-semibold hover:bg-brand-secondary disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200">
                    {status === 'loading' ? <><SpinnerGap size={18} className="animate-spin" />Sending…</> : <><PaperPlaneTilt size={18} weight="bold" />Send message<span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block">→</span></>}
                  </motion.button>
                  <p className="text-xs text-brand-muted text-center font-mono">No spam. No sharing. Just a reply from a real person.</p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ type: 'spring', stiffness: 90, damping: 20, delay: 0.2 }} className="space-y-3">
            {[
              { title: 'Free discovery call',  body: '15 minutes. No pitch. We will tell you honestly if we are the right fit.' },
              { title: 'One business day',      body: 'Our response time is a commitment, not a target. You will hear from a senior partner — not a sales rep.' },
              { title: 'Fixed-fee proposals',  body: 'Every engagement starts with a one-page proposal. Scope, price, and timeline — upfront.' },
              { title: 'No lock-in',            body: 'We earn the next engagement by delivering on this one. You own everything we build.' },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, x: 16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.25 + i * 0.07 }} className="group rounded-[16px] border border-brand-border bg-white p-5 hover:border-brand hover:shadow-sm transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 group-hover:scale-125 transition-transform duration-300" />
                  <div>
                    <p className="font-heading text-sm font-semibold text-brand tracking-tight mb-1">{item.title}</p>
                    <p className="text-xs text-brand-secondary leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="rounded-[16px] border border-brand-border bg-white p-5">
              <p className="text-xs font-mono uppercase tracking-widest text-brand-muted mb-3">Prefer email?</p>
              <a href="mailto:hello@cernislabs.com" className="text-sm text-brand font-semibold hover:text-brand-secondary transition-colors duration-150">hello@cernislabs.com →</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
