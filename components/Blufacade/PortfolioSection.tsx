"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ExternalLink, Building2 } from "lucide-react"
import Link from "next/link"

const portfolioItems = [
  {
    id: 1,
    title: "Jaya Springs Commercial Complex",
    category: "Structural Glazing",
    image: "/images/portfolio/jaya-springs.jpg",
    description: "Modern commercial building with full structural glazing facade",
    gradient: "from-[#014a74] to-[#0369a1]",
  },
  {
    id: 2,
    title: "JMH Enclave",
    category: "ACP Cladding",
    image: "/images/portfolio/jmh-enclave.jpg",
    description: "Mixed-use development featuring premium ACP panels",
    gradient: "from-[#f58420] to-[#e07310]",
  },
  {
    id: 3,
    title: "Sri Narpavi Jewellers",
    category: "Glass Partition",
    image: "/images/portfolio/narpavi-jewellers.jpg",
    description: "Elegant retail facade with decorative glass elements",
    gradient: "from-[#0369a1] to-[#014a74]",
  },
  {
    id: 4,
    title: "JK Hospital",
    category: "DGU Semi Unitised",
    image: "/images/portfolio/jk-hospital.jpg",
    description: "Healthcare facility with energy-efficient glazing system",
    gradient: "from-[#012d47] to-[#014a74]",
  },
]

const categories = ["All", "Structural Glazing", "ACP Cladding", "Glass Partition", "DGU Semi Unitised"]

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredItems = activeCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory)

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#fefaf6] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#014a74]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#f58420]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#014a74]/10 border border-[#014a74]/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#014a74] animate-pulse" />
            <span className="text-[#014a74] text-sm font-semibold">Our Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#014a74] to-[#0369a1] bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Explore our collection of iconic façade projects that showcase our 
            commitment to excellence and innovation.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-[#014a74] to-[#0369a1] text-white shadow-lg shadow-[#014a74]/30 scale-105"
                  : "bg-white text-gray-600 hover:bg-[#014a74]/5 hover:text-[#014a74] border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="aspect-[4/3] relative">
                  {/* Gradient Background with Pattern */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}>
                    {/* Animated Pattern */}
                    <motion.div
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`,
                      }}
                    />
                    
                    {/* Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Building2 className="w-20 h-20 text-white/20" />
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#014a74]/95 via-[#014a74]/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <span className="inline-block w-fit px-4 py-2 rounded-full bg-[#f58420] text-white text-xs font-semibold mb-4 shadow-lg">
                      {item.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-[#f58420] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-white/90 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      {item.description}
                    </p>
                    <Link
                      href={`/portfolio/${item.id}`}
                      className="inline-flex items-center gap-2 text-[#f58420] font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                    >
                      View Project Details
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-[#f58420]/0 group-hover:border-[#f58420]/50 rounded-3xl transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
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
            href="/portfolio"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#f58420] to-[#e07310] text-white rounded-full font-semibold hover:shadow-xl hover:shadow-[#f58420]/30 transition-all duration-300 group"
          >
            View All Projects
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
