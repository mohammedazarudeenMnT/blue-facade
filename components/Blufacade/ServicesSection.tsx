"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useServices } from "@/hooks/use-services";
import { Loader2 } from "lucide-react";

// Helper function to strip HTML tags and decode entities
const stripHtml = (html: string) => {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();
};

// Helper to get aspect ratio based on index
const getAspectRatio = (index: number) => {
  return index % 2 === 0 ? "aspect-[3/4]" : "aspect-[4/3]";
};

export function ServicesSection() {
  const { services, isLoading } = useServices(1, 6);

  return (
    <section id="services" className="relative py-20 bg-[#fefaf6]">
      <div className="relative w-full max-w-350 mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <p className="text-[#f58420] font-black text-sm tracking-widest uppercase mb-4">
            Our Expertise
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#014a74]">
            Featured <span className="text-[#f58420]">Services</span>
          </h2>
          <p className="text-lg text-[#282828]/70 max-w-2xl mx-auto mt-4">
            Comprehensive facade solutions that combine innovation, precision
            engineering, and premium materials.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-[#f58420] animate-spin" />
          </div>
        ) : services && services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div className="flex flex-col gap-8">
              {services
                .filter((_, i) => i % 3 === 0)
                .map((service, index) => (
                  <ServiceCard
                    key={`col1-${service._id}`}
                    service={service}
                    index={index * 3}
                  />
                ))}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-8">
              {services
                .filter((_, i) => i % 3 === 1)
                .map((service, index) => (
                  <ServiceCard
                    key={`col2-${service._id}`}
                    service={service}
                    index={index * 3 + 1}
                  />
                ))}
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-8">
              {services
                .filter((_, i) => i % 3 === 2)
                .map((service, index) => (
                  <ServiceCard
                    key={`col3-${service._id}`}
                    service={service}
                    index={index * 3 + 2}
                  />
                ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-[#282828]/70">
              No services available at the moment
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: {
    _id: string;
    serviceName: string;
    shortDescription?: string;
    description: string;
    image: string;
    slug: string;
  };
  index: number;
}) {
  const aspect = getAspectRatio(index);
  const href = `/services/${service.slug}`;

  return (
    <Link href={href}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true, margin: "-50px" }}
        className={`relative overflow-hidden rounded-xl shadow-2xl transition-all duration-500 bg-linear-to-br from-[#014a74] to-[#0369a1] border-2 border-transparent w-full ${aspect} group cursor-pointer`}
      >
        {/* Image Background */}
        <div className="absolute inset-0 bg-linear-to-br from-[#014a74] via-[#0369a1] to-[#014a74]">
          {service.image && (
            <Image
              src={service.image}
              alt={service.serviceName}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          )}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`,
            }}
          />
        </div>

        {/* Service Icon/Text Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white/20 text-6xl font-black uppercase tracking-wider">
            {service.serviceName.charAt(0)}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-[#014a74]/90 via-[#014a74]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <span className="text-[#f58420] text-sm font-bold uppercase">
            {service.serviceName}
          </span>
          <h3 className="text-white text-xl font-black line-clamp-2">
            {stripHtml(service.shortDescription || service.description)}
          </h3>
        </div>

        {/* Always visible title at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity duration-300">
          <h3 className="text-white text-lg font-bold line-clamp-1">
            {service.serviceName}
          </h3>
        </div>
      </motion.div>
    </Link>
  );
}
