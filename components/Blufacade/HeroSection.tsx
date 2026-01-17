"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useBanner } from "@/hooks/use-banner"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)
  const { banner } = useBanner("home")

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const heroOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(smoothProgress, [0, 0.5], [1, 0.95])

  // Determine the image source: try banner.images[0] (legacy compatibility/carousel support), then banner.image, then fallback
  const heroImage = banner?.images?.[0] || banner?.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity: heroOpacity, scale: heroScale }}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Modern building facade"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isReady ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl mb-6 font-light italic tracking-wide"
        >
          <span className="text-[#014a74]">BLU</span>
          <span className="text-[#f58420]">FACADE</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isReady ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-200"
        >
          Building Tomorrow&apos;s Architecture Today
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isReady ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button 
            asChild
            size="lg" 
            className="text-lg px-8 py-6"
          >
            <Link href="/portfolio">
              Explore Our Work <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isReady ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center text-white">
          <span className="text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="rotate-90" />
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  )
}
