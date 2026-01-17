import { Metadata } from "next"
import { Header } from "@/components/Blufacade/Header"
import { Footer } from "@/components/Blufacade/Footer"
// import { FloatingContact } from "@/components/Blufacade/FloatingContact"
import { DynamicPageBanner } from "@/components/DynamicPageBanner"
import { ContactContent } from "@/components/Blufacade/pages/ContactContent"

export const metadata: Metadata = {
  title: "Contact Us | Blufacade - Get in Touch",
  description: "Contact Blufacade for your facade project inquiries. Visit our office in Chennai or reach out to our branches in Madurai and Dindigul.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <DynamicPageBanner
        pageKey="contact"
        title="Contact Us"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact Us", href: "/contact" },
        ]}
      />
      <ContactContent />
      <Footer />
      {/* <FloatingContact /> */}
    </main>
  )
}
