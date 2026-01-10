"use client"

import { motion } from "framer-motion"
import { 
  Shield, 
  Clock, 
  Award, 
  Users, 
  Wrench, 
  Leaf 
} from "lucide-react"

const reasons = [
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Premium materials and strict quality control ensure every project meets the highest standards.",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "We understand the importance of deadlines and ensure on-time project completion.",
  },
  {
    icon: Award,
    title: "Expert Team",
    description: "Our experienced professionals bring expertise in design, engineering, and installation.",
  },
  {
    icon: Users,
    title: "Client-Centric",
    description: "We work closely with architects, developers, and contractors to deliver tailored solutions.",
  },
  {
    icon: Wrench,
    title: "End-to-End Service",
    description: "From concept and design to fabrication and installation, we handle it all.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Eco-friendly solutions that meet modern sustainability and energy efficiency standards.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#014a74]/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-[#f58420]/5 to-transparent rounded-full blur-3xl" />
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
            <span className="text-[#f58420] text-sm font-semibold">Why Choose Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#014a74] to-[#0369a1] bg-clip-text text-transparent">
              The Blufacade Advantage
            </span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We combine innovation, expertise, and dedication to deliver façade solutions 
            that exceed expectations.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white to-[#fefaf6] border border-gray-100 hover:border-[#014a74]/20 hover:shadow-2xl transition-all duration-500 h-full">
                {/* Animated Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#014a74]/0 to-[#f58420]/0 group-hover:from-[#014a74]/5 group-hover:to-[#f58420]/5 rounded-3xl transition-all duration-500" />
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#014a74] to-[#0369a1] flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-[#014a74]/20">
                    <reason.icon className="w-10 h-10 text-white" />
                  </div>
                  {/* Decorative Ring */}
                  <div className="absolute -inset-2 border-2 border-[#f58420]/20 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#014a74] mb-3 group-hover:text-[#f58420] transition-colors duration-300 relative">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed relative">
                  {reason.description}
                </p>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#014a74] via-[#0369a1] to-[#f58420] rounded-b-3xl scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
