import { Metadata } from "next"
import { Header } from "@/components/Blufacade/Header"
import { Preloader } from "@/components/Blufacade/Preloader"
import { HeroSection } from "@/components/Blufacade/HeroSection"
import { HeroTextSection } from "@/components/Blufacade/HeroTextSection"
import { ServicesSection } from "@/components/Blufacade/ServicesSection"
import { AboutTextSection } from "@/components/Blufacade/AboutTextSection"
import { MissionSection } from "@/components/Blufacade/MissionSection"
import { PortfolioSection } from "@/components/Blufacade/PortfolioSection"
import { TestimonialsSection } from "@/components/Blufacade/TestimonialsSection"
import { Footer } from "@/components/Blufacade/Footer"

export const metadata: Metadata = {
  title: "Blufacade | Inspiring Skylines - Premium Facade Solutions",
  description: "Blufacade specializes in innovative, high-quality facade solutions including ACP, structural glazing, aluminium doors & windows, HPL, and spider glazing. Transform your building with iconic facades.",
  keywords: "facade solutions, ACP cladding, structural glazing, aluminium windows, glass partition, spider glazing, Chennai, Tamil Nadu",
  openGraph: {
    title: "Blufacade | Inspiring Skylines",
    description: "Premium facade solutions that redefine the visual identity of modern buildings.",
    url: "https://www.blufacade.com",
    siteName: "Blufacade",
    type: "website",
  },
}

export default function Home() {
  return (
    <>
      <Preloader />
      <main className="relative w-full overflow-x-hidden">
        <Header />
        <HeroSection />
        <HeroTextSection />
        <ServicesSection />
        <AboutTextSection />
        <MissionSection />
        <PortfolioSection />
        <TestimonialsSection />
        <Footer />
      </main>
    </>
  )
}
