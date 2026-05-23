import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import MarqueeStrip from '@/components/MarqueeStrip'
import Beliefs from '@/components/Beliefs'
import Services from '@/components/Services'
import WhyUs from '@/components/WhyUs'
import Process from '@/components/Process'
import Sectors from '@/components/Sectors'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Nav />
      <Hero />
      <MarqueeStrip />
      <Beliefs />
      <Services />
      <WhyUs />
      <Process />
      <Sectors />
      <ContactForm />
      <Footer />
    </main>
  )
}
