'use client';

import { useClientLogos } from '@/hooks/use-client-logos';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function ClientLogosSection() {
  const { clientLogos, isLoading } = useClientLogos(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-[#014a74]" />
          </div>
        </div>
      </section>
    );
  }

  if (clientLogos.length === 0) {
    return null;
  }

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...clientLogos, ...clientLogos];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6 mb-10">
        <div className="text-center mb-4">
          <p className="text-[#f58420] font-black text-xl tracking-widest uppercase mb-4">
            Trusted By
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#014a74]">
            Our <span className="text-[#f58420]">Happy Clients</span>
          </h2>
          <p className="text-base text-[#282828]/70 max-w-2xl mx-auto mt-4">
            Trusted partnerships delivering exceptional facade solutions
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-white to-transparent z-10" />

        {/* Marquee Container */}
        <div className="marquee-container">
          <div className="marquee-content">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo._id}-${index}`}
                className="marquee-item shrink-0 mx-8"
              >
                <div className="relative w-52 h-20 transition-all duration-300 hover:scale-105">
                  <Image
                    src={logo.logo}
                    alt={logo.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-container {
          width: 100%;
          overflow: hidden;
        }

        .marquee-content {
          display: flex;
          align-items: center;
          animation: logos-marquee 30s linear infinite;
          will-change: transform;
        }

        .marquee-content:hover {
          animation-play-state: paused;
        }

        @keyframes logos-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 768px) {
          .marquee-content {
            animation-duration: 20s;
          }
        }
      `}</style>
    </section>
  );
}