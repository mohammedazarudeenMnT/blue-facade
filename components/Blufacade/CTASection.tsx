"use client"

import { motion } from "framer-motion"
import { Phone, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { siteConfig } from "@/config/site"

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#014a74] via-[#0369a1] to-[#014a74] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#f58420]/20 rounded-full blur-3xl -translate-y-1/2"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Building&apos;s Facade?
            </h2>
            <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Let&apos;s discuss your project and create something extraordinary together. 
              Contact us today for a free consultation and quote.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button
              asChild
              size="lg"
              className="bg-[#f58420] hover:bg-[#e07310] text-white px-8 py-6 text-lg group w-full sm:w-auto"
            >
              <Link href="/contact">
                Get Free Quote
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#014a74] px-8 py-6 text-lg w-full sm:w-auto"
            >
              <a href={`tel:${siteConfig.contact.phone}`}>
                <Phone className="mr-2 w-5 h-5" />
                Call Now
              </a>
            </Button>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80"
          >
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="flex items-center gap-2 hover:text-[#f58420] transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>{siteConfig.contact.phone}</span>
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center gap-2 hover:text-[#f58420] transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>{siteConfig.contact.email}</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
