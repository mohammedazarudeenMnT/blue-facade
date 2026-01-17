import { Metadata } from "next"
import { Header } from "@/components/Blufacade/Header"
import { Footer } from "@/components/Blufacade/Footer"
// import { FloatingContact } from "@/components/Blufacade/FloatingContact"
import { DynamicPageBanner } from "@/components/DynamicPageBanner"
import { AboutContent } from "@/components/Blufacade/pages/AboutContent"
// import { CTASection } from "@/components/Blufacade/CTASection"

export const metadata: Metadata = {
  title: "About Us | Blufacade - Inspiring Skylines",
  description: "Learn about Blufacade - your trusted partner for innovative facade solutions. With 15+ years of experience, we transform architectural visions into iconic realities.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <DynamicPageBanner
        pageKey="about"
        title="About Blufacade"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
        ]}
      />
      <AboutContent />
      {/* <CTASection /> */}
      <Footer />
      {/* <FloatingContact /> */}
    </main>
  )
}
