"use client"

import { motion } from "framer-motion"
import { 
  Building2, 
  DoorOpen, 
  Layers, 
  LayoutGrid, 
  Square, 
  Umbrella, 
  PanelLeft, 
  Sparkles,
  ArrowRight,
  CheckCircle2
} from "lucide-react"
import Link from "next/link"
import { siteConfig } from "@/config/site"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  DoorOpen,
  Layers,
  LayoutGrid,
  Square,
  Umbrella,
  PanelLeft,
  Sparkles,
}

const serviceDetails: Record<string, string[]> = {
  "acp": [
    "Fire-resistant options available",
    "Wide range of colors and finishes",
    "Weather-resistant coating",
    "Easy maintenance",
  ],
  "aluminium-doors-windows": [
    "Thermal break technology",
    "Sound insulation",
    "Powder-coated finishes",
    "Custom sizes available",
  ],
  "structural-glazing": [
    "Frameless glass appearance",
    "Superior weather sealing",
    "UV protection options",
    "Energy-efficient designs",
  ],
  "hpl": [
    "Scratch-resistant surface",
    "UV stable colors",
    "Impact resistant",
    "Easy to clean",
  ],
  "dgu-semi-unitised": [
    "Enhanced thermal insulation",
    "Reduced condensation",
    "Acoustic performance",
    "Factory-assembled units",
  ],
  "canopy-work": [
    "Custom designs",
    "Durable materials",
    "Weather protection",
    "Aesthetic appeal",
  ],
  "glass-partition": [
    "Maximizes natural light",
    "Sound dampening options",
    "Privacy glass available",
    "Modern aesthetics",
  ],
  "spider-glazing": [
    "Minimalist design",
    "Maximum transparency",
    "Structural integrity",
    "Contemporary look",
  ],
}

export function ServicesGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-8">
          {siteConfig.services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Building2
            const details = serviceDetails[service.id] || []
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`grid md:grid-cols-2 gap-8 items-center p-8 rounded-2xl ${
                  isEven ? "bg-gradient-to-r from-[#fefaf6] to-white" : "bg-white"
                } border border-gray-100 hover:shadow-xl transition-shadow`}
              >
                {/* Content */}
                <div className={isEven ? "order-1" : "order-1 md:order-2"}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#014a74] to-[#0369a1] flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#014a74]">{service.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#f58420] flex-shrink-0" />
                        <span className="text-sm text-gray-600">{detail}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/services/${service.id}`}
                    className="inline-flex items-center gap-2 text-[#014a74] font-medium hover:text-[#f58420] transition-colors group"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Visual */}
                <div className={`${isEven ? "order-2" : "order-2 md:order-1"}`}>
                  <div className="aspect-video rounded-xl bg-gradient-to-br from-[#014a74]/10 to-[#f58420]/10 flex items-center justify-center">
                    <IconComponent className="w-24 h-24 text-[#014a74]/30" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
