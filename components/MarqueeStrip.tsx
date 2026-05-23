'use client'

import { motion } from 'framer-motion'

const items = [
  { text: 'Cost Reduction Advisory', accent: false },
  { text: 'Johannesburg', accent: true },
  { text: 'Data Analytics & Engineering', accent: false },
  { text: 'Outcomes, not hours', accent: true },
  { text: 'Full-stack Development', accent: false },
  { text: 'South Africa', accent: true },
  { text: 'Digital Marketing & SEO', accent: false },
  { text: '90 days to first savings', accent: true },
  { text: 'AI that moves the needle', accent: false },
  { text: 'One partner. One plan.', accent: true },
]

// Duplicate for seamless loop
const allItems = [...items, ...items]

export default function MarqueeStrip() {
  return (
    <div className="bg-zinc-900 border-y border-zinc-800 py-4 overflow-hidden">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {allItems.map((item, i) => (
          <span key={i} className="flex items-center gap-10 flex-shrink-0">
            <span
              className={`text-sm font-medium tracking-wide ${
                item.accent ? 'text-amber-400' : 'text-zinc-500'
              }`}
            >
              {item.text}
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-700 flex-shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
