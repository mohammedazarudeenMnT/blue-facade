"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  Youtube,
  MessageCircle,
  Send,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  TextHoverEffect,
  FooterBackgroundGradient,
} from "@/components/ui/hover-footer";
import { useServices } from "@/hooks/use-services";
import { useContact } from "@/hooks/use-contact";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const { services } = useServices(1, 3); // Fetch first 3 services for footer
  const { contactInfo } = useContact();

  // Dynamic social links from contact info
  const socialLinks = [
    {
      label: "Facebook",
      href: contactInfo?.facebook,
      icon: <Facebook className="h-5 w-5" />,
    },
    {
      label: "Twitter",
      href: contactInfo?.twitter,
      icon: <Twitter className="h-5 w-5" />,
    },
    {
      label: "LinkedIn",
      href: contactInfo?.linkedin || "https://www.linkedin.com/company/blufacade/",
      icon: <Linkedin className="h-5 w-5" />,
    },
    {
      label: "Instagram",
      href: contactInfo?.instagram || "https://www.instagram.com/blufacade_/",
      icon: <Instagram className="h-5 w-5" />,
    },
    {
      label: "YouTube",
      href: contactInfo?.youtube,
      icon: <Youtube className="h-5 w-5" />,
    },
    {
      label: "WhatsApp",
      href: contactInfo?.whatsapp,
      icon: <MessageCircle className="h-5 w-5" />,
    },
    {
      label: "Telegram",
      href: contactInfo?.telegram,
      icon: <Send className="h-5 w-5" />,
    },
  ].filter(link => link.href); // Only show links that have URLs
  return (
    <footer
      id="contact"
      className="bg-[#1a1a1a] text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-10 relative z-10">
        {/* Contact Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16"
        >
          {/* Company Info */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg text-[#f58420] mb-4">Company</h4>
            <div className="mb-4">
              <div className="h-20 w-auto relative">
                <Image
                  src="/images/logo/Blufacade Logo PNG (1)-Photoroom.png"
                  alt="Blufacade - Inspiring Skylines"
                  width={300}
                  height={80}
                  className="object-contain h-full w-auto"
                />
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              Innovating iconic facades through premium materials, expert
              engineering, and design excellence.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg text-[#f58420]">Contact Us</h4>
            <div className="space-y-3">
              <a
                href={`tel:${contactInfo?.primaryPhone || '9994162996'}`}
                className="flex items-center gap-3 text-white/80 hover:text-[#f58420] transition-colors"
              >
                <Phone className="w-5 h-5 shrink-0" />
                <span className="text-sm">{contactInfo?.primaryPhone || '9994162996'}</span>
              </a>
              <a
                href={`mailto:${contactInfo?.email || 'blufacadein@gmail.com'}`}
                className="flex items-center gap-3 text-white/80 hover:text-[#f58420] transition-colors"
              >
                <Mail className="w-5 h-5 shrink-0" />
                <span className="text-sm">{contactInfo?.email || 'blufacadein@gmail.com'}</span>
              </a>
            </div>
          </div>

          {/* Office Locations */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg text-[#f58420]">Locations</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-[#f58420]" />
                <div className="text-sm text-white/80">
                  <p className="font-semibold">{contactInfo?.city || 'Chennai'} (Head Office)</p>
                  <p>{contactInfo?.address || '#35/39, S5, Avyaya Apartments'}</p>
                  <p>{contactInfo?.city || 'East Tambaram'}, {contactInfo?.state || 'Chennai'} - {contactInfo?.postcode || '600059'}</p>
                </div>
              </div>
              {contactInfo?.serviceAreas && (
                <div className="pt-2 border-t border-white/20">
                  <p className="text-xs font-semibold text-[#f58420] mb-2">
                    BRANCHES
                  </p>
                  <p className="text-sm text-white/70">{contactInfo.serviceAreas}</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Links Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="border-t border-white/20 py-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div>
              <h5 className="font-bold text-sm text-[#f58420] mb-4 uppercase">
                Menu
              </h5>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-sm text-[#f58420] mb-4 uppercase">
                Services
              </h5>
              <ul className="space-y-2 text-sm text-white/70">
                {services.length > 0 ? (
                  services.map((service: any) => (
                    <li key={service._id}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="hover:text-white transition-colors"
                      >
                        {service.serviceName}
                      </Link>
                    </li>
                  ))
                ) : (
                  <>
                    <li>ACP Cladding</li>
                    <li>Glass Facades</li>
                    <li>Aluminum Systems</li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 pt-8 border-t border-white/20">
            <p className="text-sm font-semibold text-[#f58420] uppercase">
              Follow Us
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-[#f58420] hover:border-[#f58420] transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/60">
          <p>© 2025 Blufacade. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-conditions"
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>

      {/* Text Hover Effect - Hidden on mobile, visible on large screens */}
      <div className="lg:flex hidden h-[30rem] -mt-52 -mb-36 relative z-20 pointer-events-none">
        <TextHoverEffect text="BLUFACADE" className="z-50" />
      </div>

      {/* Background Gradient */}
      <FooterBackgroundGradient />
    </footer>
  );
}
