"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  TextHoverEffect,
  FooterBackgroundGradient,
} from "@/components/ui/hover-footer";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/blufacade_/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/blufacade/" },
  { label: "Facebook", href: "#" },
];

export function Footer() {
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
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 relative">
                <Image
                  src="/images/logo/Blufacade Logo PNG (1).png"
                  alt="Blufacade Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">BLUFACADE</h3>
                <p className="text-[#f58420] text-xs font-semibold">
                  Inspiring Skylines
                </p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Innovating iconic facades through premium materials, expert
              engineering, and design excellence.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg text-[#f58420]">Contact Us</h4>
            <div className="space-y-3">
              <a
                href="tel:9994162996"
                className="flex items-center gap-3 text-white/80 hover:text-[#f58420] transition-colors"
              >
                <Phone className="w-5 h-5 shrink-0" />
                <span className="text-sm">9994162996</span>
              </a>
              <a
                href="mailto:blufacadein@gmail.com"
                className="flex items-center gap-3 text-white/80 hover:text-[#f58420] transition-colors"
              >
                <Mail className="w-5 h-5 shrink-0" />
                <span className="text-sm">blufacadein@gmail.com</span>
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
                  <p className="font-semibold">Chennai (Head Office)</p>
                  <p>#35/39, S5, Avyaya Apartments</p>
                  <p>East Tambaram, Chennai - 600059</p>
                </div>
              </div>
              <div className="pt-2 border-t border-white/20">
                <p className="text-xs font-semibold text-[#f58420] mb-2">
                  BRANCHES
                </p>
                <p className="text-sm text-white/70">Madurai, Dindigul</p>
              </div>
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
                <li>ACP Cladding</li>
                <li>Glass Facades</li>
                <li>Aluminum Systems</li>
                <li>Custom Solutions</li>
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
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-[#f58420] hover:border-[#f58420] transition-colors text-xs font-bold"
                >
                  {social.label.charAt(0)}
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
      <div className="lg:flex hidden h-[30rem] -mt-52 -mb-36 relative z-20">
        <TextHoverEffect text="BLUFACADE" className="z-50" />
      </div>

      {/* Background Gradient */}
      <FooterBackgroundGradient />
    </footer>
  );
}
