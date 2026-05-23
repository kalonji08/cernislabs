import type { Metadata } from 'next'
import { Outfit, DM_Mono } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  display: 'swap',
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = {
  title: 'Cernislabs — AI that actually moves the needle',
  description:
    'Strategy, software, data, and growth for South African and African businesses. We help mid-market companies use AI to grow revenue, cut costs, and make better decisions.',
  keywords: [
    'AI consulting',
    'South Africa',
    'Johannesburg',
    'data analytics',
    'full-stack development',
    'digital marketing',
    'cost reduction',
  ],
  openGraph: {
    title: 'Cernislabs — AI that actually moves the needle',
    description:
      'Strategy, software, data, and growth for South African businesses.',
    url: 'https://www.cernislabs.com',
    siteName: 'Cernislabs',
    locale: 'en_ZA',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmMono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
