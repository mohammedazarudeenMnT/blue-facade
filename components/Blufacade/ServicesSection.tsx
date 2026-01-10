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
  ArrowRight
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

export function ServicesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white via-[#fefaf6] to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#014a74]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#f58420]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f58420]/10 border border-[#f58420]/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#f58420] animate-pulse" />
            <span className="text-[#f58420] text-sm font-semibold">Our Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#014a74] to-[#0369a1] bg-clip-text text-transparent">
              Comprehensive Façade Solutions
            </span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            From concept to completion, we deliver end-to-end façade services with 
            expertise spanning a wide range of systems and materials.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {siteConfig.services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Building2
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="group"
              >
                <Link href={`/services/${service.id}`}>
                  <div className="relative h-full p-6 rounded-3xl bg-white border border-gray-100 hover:border-[#014a74]/20 hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#014a74]/0 via-[#014a74]/0 to-[#014a74]/0 group-hover:from-[#014a74]/5 group-hover:via-[#0369a1]/5 group-hover:to-[#f58420]/5 transition-all duration-500" />
                    
                    {/* Decorative Circle */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#f58420]/10 to-transparent rounded-full group-hover:scale-150 transition-transform duration-700" />
                    
                    {/* Icon */}
                    <div className="relative mb-5">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#014a74] to-[#0369a1] flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-[#014a74]/20">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-[#014a74] mb-3 group-hover:text-[#f58420] transition-colors duration-300 relative">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed relative">
                      {service.description}
                    </p>

                    {/* Arrow */}
                    <div className="flex items-center text-[#014a74] text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 relative">
                      <span className="mr-2">Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>

                    {/* Bottom Accent Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#014a74] via-[#0369a1] to-[#f58420] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#014a74] to-[#0369a1] text-white rounded-full font-semibold hover:shadow-xl hover:shadow-[#014a74]/30 transition-all duration-300 group"
          >
            View All Services
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
