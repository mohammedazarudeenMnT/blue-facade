"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, Send, Loader2, Facebook, Instagram, Linkedin, Twitter, Youtube, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useContact } from "@/hooks/use-contact"
import { useServices } from "@/hooks/use-services"

export function ContactContent() {
  const { contactInfo, isLoading: isContactLoading } = useContact()
  const { services } = useServices()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: "" })
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitStatus({ type: 'success', message: "Thank you! Your message has been sent successfully." })
        setFormData({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" })
      } else {
        setSubmitStatus({ type: 'error', message: data.error || "Something went wrong. Please try again." })
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: "Failed to send message. Please try again later." })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Helper to get array of branches if stored as comma-separated string
  const serviceAreas = contactInfo?.serviceAreas 
    ? contactInfo.serviceAreas.split(',').map(area => area.trim()) 
    : ["Chennai", "Madurai", "Dindigul", "Tamil Nadu", "South India"]

  return (
    <section className="py-20 bg-[#fefaf6]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-[#014a74] mb-6">
                Contact Information
              </h2>
              <p className="text-gray-600 mb-8">
                Reach out to us for any inquiries about our facade solutions. We&apos;re here to help transform your vision into reality.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo?.primaryPhone && (
                <a
                  href={`tel:${contactInfo.primaryPhone.replace(/\s+/g, '')}`}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white hover:shadow-md transition-shadow group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#014a74] flex items-center justify-center group-hover:bg-[#f58420] transition-colors">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#014a74]">Phone</h3>
                    <p className="text-gray-600">{contactInfo.primaryPhone}</p>
                    {contactInfo.secondaryPhone && (
                      <p className="text-gray-600 text-sm">{contactInfo.secondaryPhone}</p>
                    )}
                  </div>
                </a>
              )}

              {contactInfo?.email && (
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white hover:shadow-md transition-shadow group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#014a74] flex items-center justify-center group-hover:bg-[#f58420] transition-colors">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#014a74]">Email</h3>
                    <p className="text-gray-600 break-all">{contactInfo.email}</p>
                  </div>
                </a>
              )}

              {contactInfo?.address && (
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white">
                  <div className="w-12 h-12 rounded-xl bg-[#014a74] flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#014a74]">Office Address</h3>
                    <p className="text-gray-600">
                      {contactInfo.address}<br />
                      {contactInfo.city}, {contactInfo.state} - {contactInfo.postcode}<br />
                      {contactInfo.country}
                    </p>
                  </div>
                </div>
              )}

              {contactInfo?.businessHours && (
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white">
                  <div className="w-12 h-12 rounded-xl bg-[#014a74] flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#014a74]">Business Hours</h3>
                    <p className="text-gray-600">{contactInfo.businessHours}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Service Areas */}
            <div className="p-6 rounded-xl bg-[#014a74] text-white">
              <h3 className="font-semibold mb-3">Service Areas</h3>
              <div className="flex flex-wrap gap-2">
                {serviceAreas.map((area, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-white/10 text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-[#014a74] mb-4">Follow Us</h3>
              <div className="flex gap-3 flex-wrap">
                {contactInfo?.facebook && (
                  <a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#014a74] flex items-center justify-center text-white hover:bg-[#f58420] transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
                {contactInfo?.instagram && (
                  <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#014a74] flex items-center justify-center text-white hover:bg-[#f58420] transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {contactInfo?.linkedin && (
                  <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#014a74] flex items-center justify-center text-white hover:bg-[#f58420] transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                 {contactInfo?.twitter && (
                  <a href={contactInfo.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#014a74] flex items-center justify-center text-white hover:bg-[#f58420] transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                 {contactInfo?.youtube && (
                  <a href={contactInfo.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#014a74] flex items-center justify-center text-white hover:bg-[#f58420] transition-colors">
                    <Youtube className="w-5 h-5" />
                  </a>
                )}
                 {contactInfo?.whatsapp && (
                  <a href={contactInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#014a74] flex items-center justify-center text-white hover:bg-[#f58420] transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </a>
                )}
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
              <h2 className="text-2xl font-bold text-[#014a74] mb-2">
                {contactInfo?.pageTitle || "Send us a Message"}
              </h2>
              <p className="text-gray-600 mb-8">
                {contactInfo?.pageDescription || "Fill out the form below and we'll get back to you as soon as possible."}
              </p>

              {submitStatus.message && (
                <div className={`p-4 mb-6 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-[#014a74] mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f58420] focus:border-transparent outline-none transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-[#014a74] mb-2">
                       Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f58420] focus:border-transparent outline-none transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
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
                      {services.length > 0 && (
                        <optgroup label="Our Services">
                          {services.map((service) => (
                            <option key={service._id} value={service.serviceName}>
                              {service.serviceName}
                            </option>
                          ))}
                        </optgroup>
                      )}
                      <optgroup label="General">
                        <option value="Quote Request">Request a Quote</option>
                        <option value="Consultation">Free Consultation</option>
                        <option value="Project Inquiry">Project Inquiry</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Other">Other</option>
                      </optgroup>
                    </select>
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
                  disabled={isSubmitting}
                  className="w-full bg-[#014a74] hover:bg-[#012d47] text-white py-4 text-lg"
                >
                  {isSubmitting ? (
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

        {/* Google Map Section */}
        {contactInfo?.mapEmbedCode && (
          <div className="space-y-8">
             {(contactInfo?.officeTitle || contactInfo?.officeDescription) && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center max-w-3xl mx-auto"
                >
                   {contactInfo?.officeTitle && (
                     <h2 className="text-3xl font-bold text-[#014a74] mb-4">{contactInfo.officeTitle}</h2>
                   )}
                   {contactInfo?.officeDescription && (
                     <p className="text-gray-600">{contactInfo.officeDescription}</p>
                   )}
                </motion.div>
             )}

             <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-gray-100"
            >
               <div 
                 className="w-full h-[400px] lg:h-[500px] [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
                 dangerouslySetInnerHTML={{ __html: contactInfo.mapEmbedCode }}
               />
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}
