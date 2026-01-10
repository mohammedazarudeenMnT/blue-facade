"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Building2, Award, Users } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const stats = [
    { icon: Building2, value: "500+", label: "Projects Completed" },
    { icon: Award, value: "15+", label: "Years Experience" },
    { icon: Users, value: "200+", label: "Happy Clients" },
  ]

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-[#fefaf6] via-white to-[#f0f7fc]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(1,74,116,0.15),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(245,132,32,0.1),transparent_50%),radial-gradient(circle_at_50%_80%,rgba(3,105,161,0.12),transparent_50%)]" />
        
        {/* Animated Grid */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #014a74 1px, transparent 1px), linear-gradient(to bottom, #014a74 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        
        {/* Floating Shapes */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-[#014a74]/10 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-[#f58420]/10 to-transparent blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#014a74]/10 shadow-lg shadow-[#014a74]/5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f58420] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f58420]"></span>
                </span>
                <span className="text-[#014a74] text-sm font-semibold">Premium Façade Solutions</span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-[#014a74]">Transforming</span>
                <br />
                <span className="text-[#014a74]">Architecture with</span>
                <br />
                <span className="bg-gradient-to-r from-[#014a74] to-[#f58420] bg-clip-text text-transparent">
                  Iconic Facades
                </span>
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg text-[#f58420] font-semibold tracking-wide"
            >
              INSPIRING SKYLINES
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg text-gray-600 max-w-lg"
            >
              We specialize in delivering innovative, high-quality façade solutions 
              that redefine the visual identity and performance of modern buildings.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-[#014a74] hover:bg-[#012d47] text-white px-8 py-6 text-lg group"
              >
                <Link href="/contact">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[#f58420] text-[#f58420] hover:bg-[#f58420] hover:text-white px-8 py-6 text-lg group"
              >
                <Link href="/portfolio">
                  <Play className="mr-2 w-5 h-5" />
                  View Projects
                </Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="grid grid-cols-3 gap-4 pt-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="relative group"
                >
                  <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#014a74] to-[#0369a1] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#014a74] to-[#0369a1] bg-clip-text text-transparent">{stat.value}</div>
                      <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Image Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                {/* Gradient Background */}
                <div className="relative bg-gradient-to-br from-[#014a74] via-[#0369a1] to-[#014a74] h-[500px]">
                  {/* Animated Pattern Overlay */}
                  <motion.div
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`,
                    }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
                    <div className="text-center text-white/90">
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
                        <Building2 className="w-24 h-24 mx-auto mb-4 opacity-40" />
                      </motion.div>
                      <p className="text-lg font-medium">Add your hero building image</p>
                      <p className="text-sm opacity-70 mt-2">public/images/portfolio/hero-building.jpg</p>
                    </div>
                  </div>
                  
                  {/* Glass Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#014a74]/60 via-transparent to-transparent" />
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20, x: -20 }}
                animate={isLoaded ? { opacity: 1, y: 0, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-5 border border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#f58420] to-[#e07310] flex items-center justify-center shadow-lg">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-[#014a74] text-lg">Quality Assured</div>
                    <div className="text-sm text-gray-500">ISO Certified Company</div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                animate={{
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-6 -right-6 w-32 h-32 border-2 border-[#f58420]/20 rounded-3xl -z-10"
              />
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-br from-[#014a74]/5 to-[#f58420]/5 rounded-3xl -z-20 blur-xl" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}
