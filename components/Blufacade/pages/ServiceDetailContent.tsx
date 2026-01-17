"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Phone, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react"; // Replaced WhatsAppIcon with MessageCircle if needed, or keeping WhatsAppIcon
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import Image from "next/image";
import { useState, useCallback } from "react";
import { useContact } from "@/hooks/use-contact";

interface ServiceData {
  _id?: string;
  serviceName: string;
  shortDescription?: string;
  description: string;
  image: string;
  gallery?: string[];
  features: string[];
  slug: string;
  status?: string;
  views?: number;
  bookings?: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  // Dynamic Fields
  category?: string;
  applications?: string[];
  technicalSpecs?: { label: string; value: string }[];
  serviceLocations?: { region: string; cities: string }[];
  warranty?: string;
  estimatedDuration?: string;
  priceRange?: string;
}

interface ServiceDetailContentProps {
  serviceData: ServiceData;
}

export function ServiceDetailContent({
  serviceData,
}: ServiceDetailContentProps) {
  const { contactInfo } = useContact();
  const [selectedImage, setSelectedImage] = useState(serviceData.image || "/placeholder.svg");
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const allImages = [
    serviceData.image,
    ...(serviceData.gallery || []),
  ].filter((img) => img && img.trim() !== "");

  const currentIndex = allImages.indexOf(selectedImage);

  const handlePrevImage = useCallback(() => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : allImages.length - 1;
    setSelectedImage(allImages[newIndex]);
    setImageLoading(true);
    setImageError(false);
  }, [currentIndex, allImages]);

  const handleNextImage = useCallback(() => {
    const newIndex = currentIndex < allImages.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(allImages[newIndex]);
    setImageLoading(true);
    setImageError(false);
  }, [currentIndex, allImages]);

  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image);
    setImageLoading(true);
    setImageError(false);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:sticky lg:top-28 lg:self-start"
          >
            {/* Main Image Container */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg mb-4 bg-gray-100 border border-gray-100">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                  <div className="w-8 h-8 border-2 border-[#014a74] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              {imageError ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <span className="text-gray-400 text-sm">Image not available</span>
                </div>
              ) : (
                <Image
                  src={selectedImage}
                  alt={serviceData.serviceName}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`object-cover transition-all duration-500 ${imageLoading ? "opacity-0 scale-105" : "opacity-100 scale-100"}`}
                  onLoad={() => setImageLoading(false)}
                  onError={() => {
                    setImageLoading(false);
                    setImageError(true);
                  }}
                />
              )}

              {/* Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all z-20 hover:scale-110 text-[#014a74]"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all z-20 hover:scale-110 text-[#014a74]"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-medium z-20">
                    {currentIndex + 1} / {allImages.length}
                  </div>
                </>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(image)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      selectedImage === image
                        ? "border-[#f58420] ring-2 ring-[#f58420]/30"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${serviceData.serviceName} - Image ${index + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 space-y-8"
          >
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-[#014a74] mb-4">
                {serviceData.serviceName}
              </h1>
              {serviceData.shortDescription && (
                <p className="text-xl text-gray-500 font-medium leading-relaxed mb-6">
                  {serviceData.shortDescription}
                </p>
              )}

              <div
                className="prose prose-lg max-w-none text-gray-600
                  prose-headings:text-[#014a74] prose-headings:font-bold
                  prose-p:leading-relaxed
                  prose-li:text-gray-600
                  prose-strong:text-[#014a74]
                  prose-a:text-[#f58420] hover:prose-a:text-[#014a74]"
                dangerouslySetInnerHTML={{ __html: serviceData.description }}
              />
            </div>

             {/* Service Details Grid */}
             <div className="grid sm:grid-cols-2 gap-6">
                {serviceData.warranty && (
                   <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <span className="block text-sm text-gray-400 font-semibold mb-1 uppercase tracking-wider">Warranty</span>
                      <span className="text-[#014a74] font-medium">{serviceData.warranty}</span>
                   </div>
                )}
                {serviceData.estimatedDuration && (
                   <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <span className="block text-sm text-gray-400 font-semibold mb-1 uppercase tracking-wider">Estimated Duration</span>
                      <span className="text-[#014a74] font-medium">{serviceData.estimatedDuration}</span>
                   </div>
                )}
                {serviceData.priceRange && (
                   <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <span className="block text-sm text-gray-400 font-semibold mb-1 uppercase tracking-wider">Price Range</span>
                      <span className="text-[#014a74] font-medium">{serviceData.priceRange}</span>
                   </div>
                )}
                 {serviceData.category && (
                   <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <span className="block text-sm text-gray-400 font-semibold mb-1 uppercase tracking-wider">Category</span>
                      <span className="text-[#014a74] font-medium">{serviceData.category}</span>
                   </div>
                )}
             </div>

            {/* Applications */}
            {serviceData.applications && serviceData.applications.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-[#014a74] mb-4">
                  Applications & Use Cases
                </h3>
                <div className="flex flex-wrap gap-2">
                   {serviceData.applications.map((app: string, idx: number) => (
                      <span key={idx} className="px-4 py-2 bg-[#fefaf6] text-[#014a74] border border-[#f58420]/20 rounded-full text-sm font-medium">
                         {app}
                      </span>
                   ))}
                </div>
              </div>
            )}

             {/* Technical Specs */}
            {serviceData.technicalSpecs && serviceData.technicalSpecs.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-[#014a74] mb-4">
                  Technical Specifications
                </h3>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                   {serviceData.technicalSpecs.map((spec: any, idx: number) => (
                      <div key={idx} className={`flex items-center p-4 ${idx !== (serviceData.technicalSpecs?.length || 0) - 1 ? 'border-b border-gray-100' : ''}`}>
                         <span className="w-1/3 font-semibold text-gray-700">{spec.label}</span>
                         <span className="w-2/3 text-gray-600">{spec.value}</span>
                      </div>
                   ))}
                </div>
              </div>
            )}

            {/* Features */}
            {serviceData.features && serviceData.features.length > 0 && (
              <div className="bg-[#fefaf6] p-8 rounded-2xl border border-[#014a74]/10">
                <h3 className="text-xl font-bold text-[#014a74] mb-6">
                  Key Features
                </h3>
                <ul className="space-y-4">
                  {serviceData.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 p-1 bg-[#f58420] rounded-full shrink-0">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

             {/* Service Locations */}
             {serviceData.serviceLocations && serviceData.serviceLocations.length > 0 && (
                <div className="text-sm text-gray-500 pt-4 border-t border-gray-100">
                   <p className="mb-2"><span className="font-semibold text-[#014a74]">Available In:</span></p>
                   <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {serviceData.serviceLocations.map((loc: any, idx: number) => (
                         <span key={idx}>{loc.region} {loc.cities ? `(${loc.cities})` : ''}</span>
                      ))}
                   </div>
                </div>
             )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="/contact"
                className="flex-1"
              >
                <Button
                  size="lg"
                  className="w-full bg-[#014a74] hover:bg-[#012d47] text-white h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Contact Us
                </Button>
              </a>
              <a 
                href={`https://wa.me/${contactInfo?.whatsappNumber?.replace(/\s+/g, '') || ""}?text=${encodeURIComponent(`I'm interested in ${serviceData.serviceName}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-[#014a74] text-[#014a74] hover:bg-[#014a74] hover:text-white h-14 text-base font-semibold transition-all"
                >
                  <WhatsAppIcon className="h-5 w-5 mr-2" />
                  Get a Quote
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
