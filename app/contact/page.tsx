import { Metadata } from "next"
import { Header } from "@/components/Blufacade/Header"
import { Footer } from "@/components/Blufacade/Footer"
import { FloatingContact } from "@/components/Blufacade/FloatingContact"
import { ContactHero } from "@/components/Blufacade/pages/ContactHero"
import { ContactContent } from "@/components/Blufacade/pages/ContactContent"

export const metadata: Metadata = {
  title: "Contact Us | Blufacade - Get in Touch",
  description: "Contact Blufacade for your façade project inquiries. Visit our office in Chennai or reach out to our branches in Madurai and Dindigul.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ContactHero />
      <ContactContent />
      <Footer />
      <FloatingContact />
    </main>
  )
}
