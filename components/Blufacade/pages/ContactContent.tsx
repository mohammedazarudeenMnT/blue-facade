"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, Send, Loader2, Facebook, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

export function ContactContent() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement form submission
    setTimeout(() => {
      setIsLoading(false)
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      alert("Thank you for your message! We will get back to you soon.")
    }, 1500)
  }

  return (
    <section className="py-20 bg-[#fefaf6]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-[#014a74] mb-6">Contact Information</h2>
              <p className="text-gray-600 mb-8">
                Reach out to us for any inquiries about our façade solutions. 
                We&apos;re here to help transform your vision into reality.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-start gap-4 p-4 rounded-xl bg-white hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#014a74] flex items-center justify-center group-hover:bg-[#f58420] transition-colors">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#014a74]">Phone</h3>
                  <p className="text-gray-600">{siteConfig.contact.phone}</p>
                </div>
              </a>

              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-start gap-4 p-4 rounded-xl bg-white hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#014a74] flex items-center justify-center group-hover:bg-[#f58420] transition-colors">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#014a74]">Email</h3>
                  <p className="text-gray-600">{siteConfig.contact.email}</p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white">
                <div className="w-12 h-12 rounded-xl bg-[#014a74] flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#014a74]">Office Address</h3>
                  <p className="text-gray-600">{siteConfig.contact.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white">
                <div className="w-12 h-12 rounded-xl bg-[#014a74] flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#014a74]">Business Hours</h3>
                  <p className="text-gray-600">Mon - Sat: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            {/* Branches */}
            <div className="p-6 rounded-xl bg-[#014a74] text-white">
              <h3 className="font-semibold mb-3">Our Branches</h3>
              <div className="flex flex-wrap gap-2">
                {siteConfig.branches.map((branch) => (
                  <span
                    key={branch}
                    className="px-3 py-1 rounded-full bg-white/10 text-sm"
                  >
                    {branch}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-[#014a74] mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#014a74] flex items-center justify-center text-white hover:bg-[#f58420] transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#014a74] flex items-center justify-center text-white hover:bg-[#f58420] transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#014a74] flex items-center justify-center text-white hover:bg-[#f58420] transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-[#014a74] mb-2">Send us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#014a74] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f58420] focus:border-transparent outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#014a74] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f58420] focus:border-transparent outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#014a74] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f58420] focus:border-transparent outline-none transition-all"
                      placeholder="+91 99941 62996"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-[#014a74] mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f58420] focus:border-transparent outline-none transition-all"
                    >
                      <option value="">Select a subject</option>
                      <option value="quote">Request a Quote</option>
                      <option value="consultation">Free Consultation</option>
                      <option value="project">Project Inquiry</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#014a74] mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f58420] focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#014a74] hover:bg-[#012d47] text-white py-4 text-lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
