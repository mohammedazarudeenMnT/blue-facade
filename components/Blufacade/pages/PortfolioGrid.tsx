"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Building2, ExternalLink } from "lucide-react"

const portfolioItems = [
  {
    id: 1,
    title: "Jaya Springs Commercial Complex",
    category: "Structural Glazing",
    location: "Chennai",
    year: "2023",
    description: "Modern commercial building with full structural glazing facade providing maximum natural light and contemporary aesthetics.",
    gradient: "from-[#014a74] to-[#0369a1]",
  },
  {
    id: 2,
    title: "JMH Enclave",
    category: "ACP Cladding",
    location: "Chennai",
    year: "2023",
    description: "Mixed-use development featuring premium ACP panels with a striking combination of colors and textures.",
    gradient: "from-[#f58420] to-[#e07310]",
  },
  {
    id: 3,
    title: "Sri Narpavi Jewellers",
    category: "Glass Partition",
    location: "Madurai",
    year: "2022",
    description: "Elegant retail facade with decorative glass elements and traditional design motifs.",
    gradient: "from-[#0369a1] to-[#014a74]",
  },
  {
    id: 4,
    title: "JK Hospital",
    category: "DGU Semi Unitised",
    location: "Chennai",
    year: "2022",
    description: "Healthcare facility with energy-efficient glazing system ensuring optimal thermal and acoustic performance.",
    gradient: "from-[#012d47] to-[#014a74]",
  },
  {
    id: 5,
    title: "Tech Park Tower",
    category: "Structural Glazing",
    location: "Chennai",
    year: "2021",
    description: "State-of-the-art IT park with floor-to-ceiling glass facades and modern curtain wall systems.",
    gradient: "from-[#014a74] to-[#f58420]",
  },
  {
    id: 6,
    title: "Luxury Residences",
    category: "Aluminium Windows",
    location: "Dindigul",
    year: "2021",
    description: "Premium residential complex featuring high-performance aluminium windows with thermal break technology.",
    gradient: "from-[#f58420] to-[#014a74]",
  },
]

const categories = ["All", "Structural Glazing", "ACP Cladding", "Glass Partition", "DGU Semi Unitised", "Aluminium Windows"]

export function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredItems = activeCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-[#014a74] text-white shadow-lg"
                  : "bg-[#fefaf6] text-gray-600 hover:bg-[#014a74]/10 hover:text-[#014a74]"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
              >
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white border border-gray-100">
                  {/* Image Placeholder */}
                  <div className="aspect-[4/3] relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                      <Building2 className="w-16 h-16 text-white/30" />
                    </div>
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    {/* Category Badge */}
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#f58420] text-white text-xs font-medium">
                      {item.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#014a74] mb-2 group-hover:text-[#f58420] transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span>{item.location}</span>
                      <span>•</span>
                      <span>{item.year}</span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}
