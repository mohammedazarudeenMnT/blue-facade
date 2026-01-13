import { Metadata } from "next"
import { Header } from "@/components/Blufacade/Header"
import { Footer } from "@/components/Blufacade/Footer"
// import { FloatingContact } from "@/components/Blufacade/FloatingContact"
import { ServicesHero } from "@/components/Blufacade/pages/ServicesHero"
import { ServicesGrid } from "@/components/Blufacade/pages/ServicesGrid"
// import { CTASection } from "@/components/Blufacade/CTASection"

export const metadata: Metadata = {
  title: "Our Services | Blufacade - Facade Solutions",
  description: "Explore our comprehensive facade services including ACP cladding, structural glazing, aluminium doors & windows, HPL, DGU systems, canopy work, glass partitions, and spider glazing.",
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ServicesHero />
      <ServicesGrid />
      {/* <CTASection /> */}
      <Footer />
      {/* <FloatingContact /> */}
    </main>
  )
}
