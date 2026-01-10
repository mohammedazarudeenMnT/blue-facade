import { Metadata } from "next"
import { Header } from "@/components/Blufacade/Header"
import { Footer } from "@/components/Blufacade/Footer"
import { FloatingContact } from "@/components/Blufacade/FloatingContact"
import { AboutHero } from "@/components/Blufacade/pages/AboutHero"
import { AboutContent } from "@/components/Blufacade/pages/AboutContent"
import { CTASection } from "@/components/Blufacade/CTASection"

export const metadata: Metadata = {
  title: "About Us | Blufacade - Inspiring Skylines",
  description: "Learn about Blufacade - your trusted partner for innovative façade solutions. With 15+ years of experience, we transform architectural visions into iconic realities.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AboutHero />
      <AboutContent />
      <CTASection />
      <Footer />
      <FloatingContact />
    </main>
  )
}
