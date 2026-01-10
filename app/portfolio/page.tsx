import { Metadata } from "next"
import { Header } from "@/components/Blufacade/Header"
import { Footer } from "@/components/Blufacade/Footer"
import { FloatingContact } from "@/components/Blufacade/FloatingContact"
import { PortfolioHero } from "@/components/Blufacade/pages/PortfolioHero"
import { PortfolioGrid } from "@/components/Blufacade/pages/PortfolioGrid"
import { CTASection } from "@/components/Blufacade/CTASection"

export const metadata: Metadata = {
  title: "Portfolio | Blufacade - Our Projects",
  description: "Explore our portfolio of iconic façade projects. From commercial complexes to healthcare facilities, see how we transform buildings with innovative façade solutions.",
}

export default function PortfolioPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <PortfolioHero />
      <PortfolioGrid />
      <CTASection />
      <Footer />
      <FloatingContact />
    </main>
  )
}
