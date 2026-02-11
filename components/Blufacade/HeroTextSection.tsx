"use client"

import { motion } from "framer-motion"

export function HeroTextSection() {
  const textItems = [
    "FACADE CONSTRUCTION",
    "MODERN DESIGN",
    "QUALITY CRAFTSMANSHIP",
    "INNOVATIVE SOLUTIONS",
  ]

  return (
    <div className="relative flex w-full overflow-x-hidden border-b border-t border-[#014a74]/20 bg-[#fefaf6] text-transparent">
      <div className="animate-marquee whitespace-nowrap py-12">
        {textItems.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="mx-4 text-4xl sm:text-6xl font-black tracking-widest transition-all duration-300 hover:text-[#014a74]"
            style={{ 
              WebkitTextStroke: "1px #014a74",
              filter: "drop-shadow(0 0 2px rgba(1, 74, 116, 0.3))" 
            }}
          >
            {item}
          </span>
        ))}
      </div>
      <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-12">
        {textItems.map((item, index) => (
          <span
            key={`${item}-${index}-2`}
            className="mx-4 text-4xl sm:text-6xl font-black tracking-widest transition-all duration-300 hover:text-[#014a74]"
            style={{ 
              WebkitTextStroke: "1px #014a74",
              filter: "drop-shadow(0 0 2px rgba(1, 74, 116, 0.3))" 
            }}
          >
            {item}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes hero-marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes hero-marquee2 {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-marquee {
          animation: hero-marquee 60s linear infinite;
        }
        .animate-marquee2 {
          animation: hero-marquee2 60s linear infinite;
        }
      `}</style>
    </div>
  )
}
