"use client"

import { motion } from "framer-motion"
import { CheckCircle2, ArrowRight, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const features = [
  "Design Excellence & Engineering Precision",
  "End-to-End Façade Services",
  "Premium Materials & Quality Control",
  "Timely Execution & Project Management",
  "Cost-Effective & Innovative Solutions",
  "Safety & Sustainability Standards",
]

export function AboutSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#014a74] to-[#012d47] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#014a74] to-[#0369a1]">
                <div className="w-full h-[450px] flex items-center justify-center">
                  <div className="text-center text-white/80 p-8">
                    <Award className="w-20 h-20 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Add about section image</p>
                    <p className="text-sm opacity-70">public/images/portfolio/about-building.jpg</p>
                  </div>
                </div>
              </div>

              {/* Experience Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-6 -right-6 bg-[#f58420] text-white rounded-2xl p-6 shadow-xl"
              >
                <div className="text-4xl font-bold">15+</div>
                <div className="text-sm opacity-90">Years of Excellence</div>
              </motion.div>

              {/* Decorative Frame */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#f58420]/30 rounded-2xl -z-10" />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-[#f58420] text-sm font-medium mb-4">
              About Blufacade
            </span>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Innovating Iconic Facades Since 2009
            </h2>
            
            <p className="text-white/80 text-lg mb-6 leading-relaxed">
              At Blufacade, we specialize in delivering innovative, high-quality façade 
              solutions that redefine the visual identity and performance of modern buildings. 
              With a strong commitment to design excellence, engineering precision, and timely 
              execution, we help transform architectural visions into iconic realities.
            </p>

            <p className="text-white/80 mb-8 leading-relaxed">
              We believe that a building&apos;s façade is more than just an outer skin—it is a 
              statement of identity, efficiency, and durability. By combining advanced technology, 
              premium materials, and strict quality control, we ensure every project meets the 
              highest standards.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#f58420] flex-shrink-0" />
                  <span className="text-sm text-white/90">{feature}</span>
                </motion.div>
              ))}
            </div>

            <Button
              asChild
              size="lg"
              className="bg-[#f58420] hover:bg-[#e07310] text-white group"
            >
              <Link href="/about">
                Learn More About Us
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
