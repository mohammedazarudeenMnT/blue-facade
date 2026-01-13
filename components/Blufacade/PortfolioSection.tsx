"use client"

import InfiniteGallery from "@/components/3d-gallery-photography"

export function PortfolioSection() {
  const projectImages = [
    { src: "/images/portfolio/GULMOHAR c2.png", alt: "Gulmohar Commercial Building" },
    { src: "/images/portfolio/Thulip Garden 1.png", alt: "Thulip Garden Residential" },
    { src: "/images/portfolio/Jaya Springs.png", alt: "Jaya Springs Commercial" },
    { src: "/images/portfolio/Jk Hospital .jpeg", alt: "JK Hospital Healthcare Facility" },
    { src: "/images/portfolio/Universal Distubutor .png", alt: "Universal Distributor" },
    { src: "/images/portfolio/GH, OTANCHATHIRAM , HOSPITAL.png", alt: "GH Otanchathiram Hospital" },
    { src: "/images/portfolio/GH CH 1 (1).png", alt: "GH CH Building" },
  ]

  return (
    <section id="portfolio" className="relative bg-[#fefaf6]">
      {/* Section Header */}
      <div className="relative z-10 text-center py-12 px-6">
        <p className="text-[#f58420] font-black text-sm tracking-widest uppercase mb-4">
          Our Work
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#014a74] mb-4">
          Featured <span className="text-[#f58420]">Projects</span>
        </h2>
        <p className="text-lg text-[#282828]/70 max-w-2xl mx-auto">
          Explore our portfolio of iconic facade projects in an immersive 3D experience
        </p>
      </div>

      {/* 3D Gallery */}
      <div className="relative">
        <InfiniteGallery
          images={projectImages}
          speed={1.2}
          visibleCount={12}
          fadeSettings={{
            fadeIn: { start: 0.05, end: 0.25 },
            fadeOut: { start: 0.4, end: 0.43 },
          }}
          blurSettings={{
            blurIn: { start: 0.0, end: 0.1 },
            blurOut: { start: 0.4, end: 0.43 },
            maxBlur: 8.0,
          }}
          className="h-[70vh] w-full"
        />

        {/* Overlay Text */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="text-center px-6 mix-blend-difference text-white">
            <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-tight italic opacity-80">
              Blufacade
            </h3>
          </div>
        </div>
      </div>

      {/* Bottom Padding */}
      <div className="h-20" />
    </section>
  )
}
