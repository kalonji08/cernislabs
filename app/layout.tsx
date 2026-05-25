import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans, DM_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Aeonik Pro substitute — swap for self-hosted Aeonik Pro woff2 files if available
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
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
    default: 'AI Consulting Johannesburg | CernisLabs — Software, Data & Growth',
    template: '%s | CernisLabs',
  },
  description:
    'Top-rated AI consulting firm in Johannesburg. CernisLabs delivers cost reduction, data engineering, full-stack development and digital marketing for South African businesses. Fixed-fee. Senior partners. Results within 90 days.',
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
    title: 'AI Consulting Johannesburg | CernisLabs — Software, Data & Growth',
    description:
      'Fixed-fee AI consulting, data engineering, and software development for South African businesses. Johannesburg-based senior partners. Results within 90 days.',
    url: BASE_URL,
    siteName: 'CernisLabs',
    locale: 'en_ZA',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'CernisLabs — AI & Software Consulting, Johannesburg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Consulting Johannesburg | CernisLabs',
    description:
      'Fixed-fee AI and software projects for South African businesses. Senior partners. Results within 90 days.',
    images: ['/opengraph-image'],
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
  authors: [{ name: 'CernisLabs', url: BASE_URL }],
  creator: 'CernisLabs',
  publisher: 'CernisLabs',
  category: 'Technology',
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'CernisLabs',
  url: BASE_URL,
  description: 'AI consulting, data engineering, full-stack development and digital marketing for South African businesses.',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: BASE_URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Services',
      item: `${BASE_URL}/#services`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Why CernisLabs',
      item: `${BASE_URL}/#why-us`,
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Our Process',
      item: `${BASE_URL}/#process`,
    },
    {
      '@type': 'ListItem',
      position: 5,
      name: 'Contact',
      item: `${BASE_URL}/#contact-form`,
    },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does AI consulting cost in South Africa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CernisLabs offers fixed-fee AI consulting packages for South African businesses. Unlike hourly billing, you know the exact cost upfront. Discovery calls are completely free. Most engagements start with a cost reduction audit and deliver measurable results within 90 days.',
      },
    },
    {
      '@type': 'Question',
      name: 'What AI consulting services does CernisLabs offer in Johannesburg?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CernisLabs offers four core services from our Johannesburg base: Cost Reduction Advisory (AI and automation audits), Data Analytics & Engineering (warehouses, pipelines, dashboards), Full-Stack Development & Cloud DevOps (web platforms, internal tools, AI-powered apps), and Digital Marketing & SEO (AI-assisted content, search strategy, conversion optimisation).',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly can CernisLabs deliver results?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most CernisLabs clients see measurable outcomes within 90 days of starting. We begin with a free discovery call, followed by a clear proposal with fixed fees and defined deliverables — no open-ended billing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does CernisLabs work with small businesses in South Africa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. CernisLabs works with businesses across South Africa and the African continent — from SMEs to large enterprises in financial services, retail, healthcare, agribusiness, and logistics. Our fixed-fee model makes senior-level AI expertise accessible without enterprise budgets.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is CernisLabs based in Johannesburg?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. CernisLabs is headquartered in Johannesburg, Gauteng. We primarily serve clients in Johannesburg, Pretoria, Cape Town, Durban, and across South Africa, with remote capability for clients anywhere in Africa.',
      },
    },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'CernisLabs',
  url: BASE_URL,
  logo: `${BASE_URL}/opengraph-image`,
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
    <html lang="en-ZA" className={`${inter.variable} ${jakarta.variable} ${dmMono.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
