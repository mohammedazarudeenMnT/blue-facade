import { Metadata } from "next"
import { Header } from "@/components/Blufacade/Header"
import { Footer } from "@/components/Blufacade/Footer"
import { DynamicPageBanner } from "@/components/DynamicPageBanner"
import { CareersContent } from "@/components/Blufacade/pages/CareersContent"

export const metadata: Metadata = {
  title: "Careers | Blufacade - Join Our Team",
  description: "Explore career opportunities at Blufacade. Join our team of facade engineering experts and work on iconic projects across India.",
}

export default function CareersPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <DynamicPageBanner
        pageKey="careers"
        title="Careers"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
        ]}
      />
      <CareersContent />
      <Footer />
    </main>
  )
}
