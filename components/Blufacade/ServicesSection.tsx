"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"

const services = [
  {
    src: "/images/services/acp-cladding.jpg",
    alt: "ACP Cladding",
    aspect: "aspect-[3/4]",
    title: "ACP Cladding",
    category: "Aluminium Composite Panel",
    href: "/services/acp",
  },
  {
    src: "/images/services/structural-glazing.jpg",
    alt: "Structural Glazing",
    aspect: "aspect-[4/3]",
    title: "Structural Glazing",
    category: "Glass Facades",
    href: "/services/structural-glazing",
  },
  {
    src: "/images/services/aluminium-doors.jpg",
    alt: "Aluminium Doors & Windows",
    aspect: "aspect-[3/4]",
    title: "Aluminium Doors & Windows",
    category: "Aluminum Systems",
    href: "/services/aluminium-doors-windows",
  },
  {
    src: "/images/services/hpl.jpg",
    alt: "HPL Panels",
    aspect: "aspect-[4/3]",
    title: "HPL Panels",
    category: "High-Pressure Laminate",
    href: "/services/hpl",
  },
  {
    src: "/images/services/spider-glazing.jpg",
    alt: "Spider Glazing",
    aspect: "aspect-[3/4]",
    title: "Spider Glazing",
    category: "Architectural Glass",
    href: "/services/spider-glazing",
  },
  {
    src: "/images/services/glass-partition.jpg",
    alt: "Glass Partition",
    aspect: "aspect-[4/3]",
    title: "Glass Partition",
    category: "Interior Solutions",
    href: "/services/glass-partition",
  },
]

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-20 bg-[#fefaf6]"
    >
      <div className="relative w-full max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <p className="text-[#f58420] font-black text-sm tracking-widest uppercase mb-4">
            Our Expertise
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#014a74]">
            Featured <span className="text-[#f58420]">Services</span>
          </h2>
          <p className="text-lg text-[#282828]/70 max-w-2xl mx-auto mt-4">
            Comprehensive facade solutions that combine innovation, precision engineering, and premium materials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div className="flex flex-col gap-8">
            {services
              .filter((_, i) => i % 3 === 0)
              .map((service, index) => (
                <ServiceCard key={`col1-${index}`} service={service} />
              ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-8">
            {services
              .filter((_, i) => i % 3 === 1)
              .map((service, index) => (
                <ServiceCard key={`col2-${index}`} service={service} />
              ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-8">
            {services
              .filter((_, i) => i % 3 === 2)
              .map((service, index) => (
                <ServiceCard key={`col3-${index}`} service={service} />
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  service,
}: {
  service: {
    src: string
    alt: string
    aspect: string
    title: string
    category: string
    href: string
  }
}) {
  return (
    <Link href={service.href}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true, margin: "-50px" }}
        className={`relative overflow-hidden rounded-xl shadow-2xl transition-all duration-500 bg-gradient-to-br from-[#014a74] to-[#0369a1] border-2 border-transparent w-full ${service.aspect} group cursor-pointer`}
      >
        {/* Placeholder gradient background - replace with actual images */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#014a74] via-[#0369a1] to-[#014a74]">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`,
          }} />
        </div>

        {/* Service Icon/Text Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white/20 text-6xl font-black uppercase tracking-wider">
            {service.title.charAt(0)}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#014a74]/90 via-[#014a74]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <span className="text-[#f58420] text-sm font-bold uppercase">
            {service.category}
          </span>
          <h3 className="text-white text-xl font-black">{service.title}</h3>
        </div>

        {/* Always visible title at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity duration-300">
          <h3 className="text-white text-lg font-bold">{service.title}</h3>
        </div>
      </motion.div>
    </Link>
  )
}
