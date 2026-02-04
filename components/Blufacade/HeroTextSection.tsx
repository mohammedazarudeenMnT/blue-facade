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
    <div className="relative flex w-full overflow-x-hidden border-b-2 border-t-2 border-[#014a74]/20 bg-[#fefaf6] text-[#014a74]">
      <div className="animate-marquee whitespace-nowrap py-12">
        {textItems.map((item, index) => (
          <span key={`${item}-${index}`} className="mx-4 text-4xl font-bold">
            {item}
          </span>
        ))}
      </div>
      <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-12">
        {textItems.map((item, index) => (
          <span key={`${item}-${index}-2`} className="mx-4 text-4xl font-bold">
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
          animation: hero-marquee 25s linear infinite;
        }
        .animate-marquee2 {
          animation: hero-marquee2 25s linear infinite;
        }
      `}</style>
    </div>
  )
}
