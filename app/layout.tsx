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

const BASE_URL = 'https://www.cernislabs.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Cernislabs | AI & Software Consulting — Johannesburg, South Africa',
    template: '%s | Cernislabs',
  },
  description:
    'Johannesburg-based AI consulting, data engineering, full-stack development and digital marketing. Fixed-fee projects. Senior partners. Results within 90 days.',
  keywords: [
    'AI consulting Johannesburg',
    'AI consulting South Africa',
    'software development Johannesburg',
    'data analytics South Africa',
    'data engineering Gauteng',
    'digital marketing Johannesburg',
    'cost reduction consulting South Africa',
    'AI automation Gauteng',
    'full-stack development South Africa',
    'tech consulting Johannesburg',
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: 'Cernislabs | AI & Software Consulting — Johannesburg, South Africa',
    description:
      'Fixed-fee AI consulting, data engineering, and software development for South African businesses. Johannesburg-based senior partners. Results within 90 days.',
    url: BASE_URL,
    siteName: 'Cernislabs',
    locale: 'en_ZA',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cernislabs — AI & Software Consulting, Johannesburg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cernislabs | AI & Software Consulting — Johannesburg',
    description:
      'Fixed-fee AI and software projects for South African businesses. Senior partners. Results within 90 days.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [{ name: 'Cernislabs', url: BASE_URL }],
  creator: 'Cernislabs',
  publisher: 'Cernislabs',
  category: 'Technology',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Cernislabs',
  url: BASE_URL,
  logo: `${BASE_URL}/og-image.png`,
  email: 'hello@cernislabs.com',
  description:
    'Johannesburg-based AI consulting, data engineering, full-stack development and digital marketing for South African businesses.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Johannesburg',
    addressRegion: 'Gauteng',
    addressCountry: 'ZA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -26.2041,
    longitude: 28.0473,
  },
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'AdministrativeArea', name: 'Gauteng' },
    { '@type': 'Country', name: 'South Africa' },
  ],
  serviceType: [
    'AI Consulting',
    'Cost Reduction Advisory',
    'Data Analytics',
    'Data Engineering',
    'Full-Stack Software Development',
    'Cloud DevOps',
    'Digital Marketing',
    'SEO',
  ],
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },
  sameAs: [
    'https://www.linkedin.com/company/cernislabs',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-ZA" className={`${outfit.variable} ${dmMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
