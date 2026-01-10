import { Metadata } from "next"
import { Header } from "@/components/Blufacade/Header"
import { HeroSection } from "@/components/Blufacade/HeroSection"
import { TrustedBySection } from "@/components/Blufacade/TrustedBySection"
import { ServicesSection } from "@/components/Blufacade/ServicesSection"
import { AboutSection } from "@/components/Blufacade/AboutSection"
import { PortfolioSection } from "@/components/Blufacade/PortfolioSection"
import { WhyChooseUs } from "@/components/Blufacade/WhyChooseUs"
import { CTASection } from "@/components/Blufacade/CTASection"
import { Footer } from "@/components/Blufacade/Footer"
import { FloatingContact } from "@/components/Blufacade/FloatingContact"

export const metadata: Metadata = {
  title: "Blufacade | Inspiring Skylines - Premium Façade Solutions",
  description: "Blufacade specializes in innovative, high-quality façade solutions including ACP, structural glazing, aluminium doors & windows, HPL, and spider glazing. Transform your building with iconic facades.",
  keywords: "facade solutions, ACP cladding, structural glazing, aluminium windows, glass partition, spider glazing, Chennai, Tamil Nadu",
  openGraph: {
    title: "Blufacade | Inspiring Skylines",
    description: "Premium façade solutions that redefine the visual identity of modern buildings.",
    url: "https://www.blufacade.com",
    siteName: "Blufacade",
    type: "website",
  },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <TrustedBySection />
      <ServicesSection />
      <AboutSection />
      <PortfolioSection />
      <WhyChooseUs />
      <CTASection />
      <Footer />
      <FloatingContact />
    </main>
  )
}
