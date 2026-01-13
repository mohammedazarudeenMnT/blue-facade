"use client"

import { useRef } from "react"

export function AboutTextSection() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen bg-[#1a1a1a] text-white py-24 flex items-center justify-center"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-balance leading-[1.1]">
            <span className="text-[#f58420] font-bold leading-[1.1]">INNOVATING</span> ICONIC
            <br />
            <span className="text-[#f58420] font-bold leading-[1.1]">FACADES</span> FOR
            <br />
            MODERN <span className="text-[#f58420] font-bold leading-[1.1]">ARCHITECTURE</span>
            <br />
            THAT STANDS THE <span className="text-[#f58420] font-bold leading-[1.1]">TEST</span>
            <br />
            OF TIME.
          </h2>

          <div className="mt-16 max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              At Blufacade, we transform architectural visions into iconic realities. With expertise spanning glass
              facades, aluminium cladding, curtain walls, and customized architectural exteriors, we deliver solutions
              that are innovative, sustainable, and built to last.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
