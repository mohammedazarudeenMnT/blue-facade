"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Phone, ChevronLeft, ChevronRight, Calendar, MapPin, User, Ruler, Clock, Banknote, Tag } from "lucide-react";
import Image from "next/image";
import { useState, useCallback } from "react";
// import { useContact } from "@/hooks/use-contact"; 
// Keeping useContact commented out if not strictly needed for project enquiry immediately, 
// but we will add a generic contact button.

interface PortfolioData {
  _id: string;
  projectName: string;
  client?: string;
  location?: string;
  category?: string;
  serviceType?: string;
  projectArea?: string;
  completionDate?: string;
  duration?: string;
  budget?: string;
  shortDescription?: string;
  description: string;
  image: string;
  gallery?: string[];
  features?: string[];
  slug: string;
  status?: string;
  seoTitle?: string;
  seoDescription?: string;
}

interface PortfolioDetailContentProps {
  portfolioData: PortfolioData;
}

export function PortfolioDetailContent({
  portfolioData,
}: PortfolioDetailContentProps) {
  const [selectedImage, setSelectedImage] = useState(portfolioData.image || "/placeholder.svg");
  const [imageLoading, setImageLoading] = useState(true);
  
  const allImages = [
    portfolioData.image,
    ...(portfolioData.gallery || []),
  ].filter((img) => img && img.trim() !== "");

  const currentIndex = allImages.indexOf(selectedImage);

  const handlePrevImage = useCallback(() => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : allImages.length - 1;
    setSelectedImage(allImages[newIndex]);
    setImageLoading(true);
  }, [currentIndex, allImages]);

  const handleNextImage = useCallback(() => {
    const newIndex = currentIndex < allImages.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(allImages[newIndex]);
    setImageLoading(true);
  }, [currentIndex, allImages]);

  const ProjectDetailItem = ({ icon: Icon, label, value }: { icon: any, label: string, value?: string }) => {
    if (!value) return null;
    return (
      <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
        <div className="p-2 bg-white rounded-lg shadow-sm text-[#f58420]">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</span>
          <span className="text-[#014a74] font-semibold">{value}</span>
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Sticky Image Gallery */}
          <div className="lg:sticky lg:top-28 lg:self-start h-fit">
             <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gray-100 border border-gray-100">
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                    <div className="w-10 h-10 border-3 border-[#014a74] border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                
                <Image
                  src={selectedImage}
                  alt={portfolioData.projectName}
                  fill
                  priority
                  className={`object-cover transition-opacity duration-500 ${imageLoading ? "opacity-0" : "opacity-100"}`}
                  onLoad={() => setImageLoading(false)}
                />

                {allImages.length > 1 && (
                  <>
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-between p-4">
                      <button
                        onClick={handlePrevImage}
                        className="pointer-events-auto p-3 bg-white/10 hover:bg-white/90 backdrop-blur-md rounded-full shadow-lg transition-all text-white hover:text-[#014a74] group"
                      >
                        <ChevronLeft className="w-8 h-8 transition-transform group-hover:-translate-x-1" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="pointer-events-auto p-3 bg-white/10 hover:bg-white/90 backdrop-blur-md rounded-full shadow-lg transition-all text-white hover:text-[#014a74] group"
                      >
                        <ChevronRight className="w-8 h-8 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                    
                    {/* Thumbnails */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 p-2 bg-black/40 backdrop-blur-md rounded-2xl max-w-[90%] overflow-x-auto scrollbar-hide">
                      {allImages.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => { setSelectedImage(img); setImageLoading(true); }}
                          className={`relative w-16 h-16 rounded-lg overflow-hidden shrink-0 transition-all border-2 ${
                            selectedImage === img ? "border-[#f58420] scale-110" : "border-white/20 hover:border-white opacity-70 hover:opacity-100"
                          }`}
                        >
                          <Image src={img} alt="thumbnail" fill className="object-cover" />
                        </button>
                      ))}
                    </div>
                  </>
                )}
             </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            {/* Header Section */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fefaf6] text-[#f58420] text-sm font-bold uppercase tracking-wide mb-4 border border-[#f58420]/20">
                <Tag className="w-4 h-4" />
                {portfolioData.category || "Project"}
              </div>
              <h1 className="text-3xl lg:text-5xl font-black text-[#014a74] mb-4 leading-tight">
                {portfolioData.projectName}
              </h1>
              {portfolioData.shortDescription && (
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  {portfolioData.shortDescription}
                </p>
              )}
            </div>

            {/* Project Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ProjectDetailItem icon={User} label="Client" value={portfolioData.client} />
              <ProjectDetailItem icon={MapPin} label="Location" value={portfolioData.location} />
              <ProjectDetailItem icon={Calendar} label="Completion" value={portfolioData.completionDate} />
              <ProjectDetailItem icon={Ruler} label="Area" value={portfolioData.projectArea} />
              <ProjectDetailItem icon={Clock} label="Duration" value={portfolioData.duration} />
              <ProjectDetailItem icon={Banknote} label="Budget" value={portfolioData.budget} />
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-[#014a74] mb-4">Project Overview</h2>
              <div
                className="prose prose-lg max-w-none text-gray-600
                  prose-headings:text-[#014a74] prose-headings:font-bold
                  prose-p:leading-relaxed
                  prose-li:text-gray-600
                  prose-strong:text-[#014a74]"
                dangerouslySetInnerHTML={{ __html: portfolioData.description }}
              />
            </div>

            {/* Features */}
            {portfolioData.features && portfolioData.features.length > 0 && (
              <div className="bg-[#fefaf6] rounded-3xl p-8 border border-[#f58420]/10">
                <h3 className="text-xl font-bold text-[#014a74] mb-6">Key Highlights</h3>
                <div className="space-y-3">
                  {portfolioData.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1 p-1 bg-[#f58420] rounded-full shrink-0">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="pt-6 border-t border-gray-100">
               <h4 className="font-semibold text-gray-900 mb-2">Interested in a similar project?</h4>
               <p className="text-sm text-gray-500 mb-4">Contact us today to discuss your architectural requirements.</p>
               <a href="/contact" className="block w-full sm:w-auto">
                 <Button className="w-full sm:w-auto bg-[#014a74] hover:bg-[#012d47] text-white h-12 px-8">
                   <Phone className="w-4 h-4 mr-2" />
                   Contact Us
                 </Button>
               </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
