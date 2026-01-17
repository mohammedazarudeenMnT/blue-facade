"use client"

import { motion } from "framer-motion"
import { 
  Building2, 
  ArrowRight,
  CheckCircle2
} from "lucide-react"
import Link from "next/link"
import Image from "next/image" // Use Next.js Image for better performance
import { useServices } from "@/hooks/use-services"

export function ServicesGrid() {
  const { services, isLoading } = useServices(1, 100) // Fetch all/many services

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8">
             {[1, 2, 3].map((i) => (
               <div key={i} className="h-[400px] w-full bg-gray-100 rounded-2xl animate-pulse" />
             ))}
          </div>
        </div>
      </section>
    )
  }

  if (!services || services.length === 0) {
     return (
        <section className="py-20 bg-white text-center">
           <div className="container mx-auto px-4">
              <p className="text-gray-500">No services found.</p>
           </div>
        </section>
     )
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-8">
          {services.map((service, index) => {
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={service._id}
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
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#014a74] to-[#0369a1] flex items-center justify-center shrink-0">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#014a74]">{service.serviceName}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                    {service.shortDescription || service.description}
                  </p>

                  {/* Features */}
                  {service.features && service.features.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {service.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#f58420] flex-shrink-0" />
                          <span className="text-sm text-gray-600 line-clamp-1">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-[#014a74] font-medium hover:text-[#f58420] transition-colors group"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Visual */}
                <div className={`${isEven ? "order-2" : "order-2 md:order-1"}`}>
                  <div className="aspect-video rounded-xl overflow-hidden relative shadow-md">
                     {service.image ? (
                        <Image 
                          src={service.image} 
                          alt={service.serviceName} 
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                     ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                           <Building2 className="w-16 h-16 text-gray-300" />
                        </div>
                     )}
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
