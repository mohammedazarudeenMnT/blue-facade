"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion"
import { ArrowRight, Award, Users, Calendar, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

// Stat Counter Component
interface StatCounterProps {
  icon: React.ReactNode
  value: number
  label: string
  suffix: string
}

function StatCounter({ icon, value, label, suffix }: StatCounterProps) {
  const countRef = useRef(null)
  const isInView = useInView(countRef, { once: false })
  const [hasAnimated, setHasAnimated] = useState(false)
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 10,
  })

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value)
      setHasAnimated(true)
    } else if (!isInView && hasAnimated) {
      springValue.set(0)
      setHasAnimated(false)
    }
  }, [isInView, value, springValue, hasAnimated])

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest))

  return (
    <motion.div
      className="bg-white p-6 rounded-xl flex flex-col items-center text-center group hover:bg-[#fefaf6] transition-colors duration-300 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5 }}
    >
      <motion.div
        className="mb-4 text-[#f58420]"
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.8 }}
      >
        {icon}
      </motion.div>
      <motion.div ref={countRef} className="text-3xl font-bold text-[#014a74] transition-colors duration-300 flex items-center">
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </motion.div>
      <p className="text-[#282828]/70 transition-colors duration-300 text-sm mt-1">{label}</p>
      <motion.div className="w-10 h-0.5 bg-[#f58420] mt-3 group-hover:w-16 transition-all duration-300" />
    </motion.div>
  )
}

export function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50])

  const stats = [
    { icon: <Award />, value: 250, label: "Projects Completed", suffix: "+" },
    { icon: <Users />, value: 500, label: "Happy Clients", suffix: "+" },
    { icon: <Calendar />, value: 15, label: "Years Experience", suffix: "" },
    { icon: <TrendingUp />, value: 99, label: "Satisfaction Rate", suffix: "%" },
  ]

  return (
    <section id="mission" ref={sectionRef} className="py-24 px-4 bg-[#1a1a1a] text-white overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h2>
            <p className="text-white/80 text-lg mb-6">
              At <span className="text-[#014a74] font-semibold">Blufacade</span>, we are committed to delivering exceptional facade solutions that enhance the beauty and
              performance of buildings while prioritizing sustainability and innovation.
            </p>
            <p className="text-white/80 text-lg mb-8">
              Our team of experts combines years of experience with cutting-edge technology to create facades that
              stand the test of time.
            </p>
            <Button className="bg-[#f58420] hover:bg-[#f58420]/90 text-white">
              Learn More <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80"
                alt="Mission"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#014a74]/50 to-transparent" />
            </div>
            <motion.div
              className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-[#f58420]/20 blur-3xl"
              style={{ y: y2 }}
            />
          </motion.div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {stats.map((stat, index) => (
            <StatCounter key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
