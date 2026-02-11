"use client"

import { motion } from "framer-motion"
import { Briefcase, ExternalLink, Users, TrendingUp, Award, Target, MapPin, Clock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCareers } from "@/hooks/use-careers"
import { useJobs } from "@/hooks/use-jobs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const benefits = [
  {
    icon: Users,
    title: "Collaborative Environment",
    description: "Work with talented professionals on cutting-edge facade projects.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Continuous learning opportunities and clear career progression paths.",
  },
  {
    icon: Award,
    title: "Iconic Projects",
    description: "Contribute to landmark developments that shape city skylines.",
  },
  {
    icon: Target,
    title: "Innovation Focus",
    description: "Access to latest technologies and innovative facade solutions.",
  },
]

export function CareersContent() {
  const { careersInfo, isLoading: isInfoLoading } = useCareers()
  const { jobs, isLoading: isJobsLoading } = useJobs()
  
  const activeJobs = jobs?.filter(job => job.isActive) || []
  const isLoading = isInfoLoading || isJobsLoading

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="w-12 h-12 border-4 border-[#014a74] border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-[#f58420]/10 text-[#f58420] text-sm font-medium mb-4">
              Careers
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#014a74] mb-6">
              {careersInfo?.pageTitle || "Join Our Team"}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {careersInfo?.pageDescription || "Be part of a dynamic team that's transforming skylines across India."}
            </p>
          </motion.div>

          {/* Open Positions Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
             <h2 className="text-3xl font-bold text-[#014a74] text-center mb-10">
                Current Openings
              </h2>
              
              {activeJobs.length > 0 ? (
                <div className="grid gap-6">
                  {activeJobs.map((job) => (
                    <Card key={job._id} className="overflow-hidden border-2 border-transparent hover:border-[#014a74]/10 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-4 md:p-8">
                        <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
                          <div className="space-y-4 flex-1">
                            <div>
                               <h3 className="text-2xl font-bold text-[#014a74] mb-2">{job.title}</h3>
                               <p className="text-gray-600 leading-relaxed" style={{ textAlign: 'justify' }}>{job.description}</p>
                            </div>
                            
                            {job.requirements && (
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-[#014a74] mb-2 flex items-center gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-[#f58420]" />
                                  Requirements & Qualifications
                                </h4>
                                <p className="text-sm text-gray-600 whitespace-pre-wrap" style={{ textAlign: 'justify' }}>{job.requirements}</p>
                              </div>
                            )}
                          </div>

                          <div className="flex-shrink-0 pt-2">
                            <a
                              href={job.driveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button className="bg-[#f58420] hover:bg-[#d9731a] text-white font-semibold px-8 py-6 rounded-xl shadow-md hover:shadow-xl transition-all">
                                Apply Now
                                <ExternalLink className="w-4 h-4 ml-2" />
                              </Button>
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center p-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                  <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No Open Positions</h3>
                  <p className="text-gray-500">
                    We don't have any specific openings right now, but we're always looking for talent.
                  </p>
                </div>
              )}
          </motion.div>

          {/* Why Work With Us Section */}
          {careersInfo?.sectionTitle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-[#014a74] text-center mb-4">
                {careersInfo.sectionTitle}
              </h2>
              {careersInfo.sectionDescription && (
                <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12 text-justify">
                  {careersInfo.sectionDescription}
                </p>
              )}

              {/* Benefits Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="p-6 rounded-2xl bg-gradient-to-br from-[#fefaf6] to-white border border-gray-100 hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#014a74] to-[#0369a1] flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#014a74] mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-justify">
                      {benefit.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center p-8 rounded-2xl bg-gray-50 border border-gray-100"
          >
            <h3 className="text-xl font-bold text-[#014a74] mb-2">
              Have Questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Reach out to our HR team for more information about career opportunities.
            </p>
            <a href="/contact">
              <Button
                variant="outline"
                className="border-2 border-[#014a74] text-[#014a74] hover:bg-[#014a74] hover:text-white"
              >
                Contact Us
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
