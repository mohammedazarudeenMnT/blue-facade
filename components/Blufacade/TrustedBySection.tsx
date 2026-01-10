"use client"

import { motion } from "framer-motion"

const clients = [
  { name: "Jaya Springs", logo: "JS" },
  { name: "JMH Enclave", logo: "JMH" },
  { name: "Sri Narpavi", logo: "SN" },
  { name: "JK Hospital", logo: "JK" },
  { name: "Tech Park", logo: "TP" },
  { name: "Luxury Homes", logo: "LH" },
  { name: "Metro Plaza", logo: "MP" },
  { name: "Grand Tower", logo: "GT" },
  { name: "City Center", logo: "CC" },
  { name: "Royal Complex", logo: "RC" },
  { name: "Elite Residency", logo: "ER" },
  { name: "Prime Square", logo: "PS" },
]

export function TrustedBySection() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[#014a74] mb-2">
            Trusted by <span className="text-[#f58420]">Industry Leaders</span>
          </h3>
          <p className="text-gray-600">
            Partnering with leading businesses across Tamil Nadu
          </p>
        </motion.div>

        {/* Logo Grid */}
        <div className="relative overflow-hidden">
          <motion.div
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
            className="flex gap-12 items-center"
          >
            {[...clients, ...clients].map((client, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className="flex-shrink-0 w-32 h-24 rounded-2xl bg-gradient-to-br from-[#fefaf6] to-white border border-gray-100 flex items-center justify-center group hover:shadow-lg transition-all duration-300"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-[#014a74] to-[#0369a1] bg-clip-text text-transparent group-hover:from-[#f58420] group-hover:to-[#e07310] transition-all duration-300">
                    {client.logo}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{client.name}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
