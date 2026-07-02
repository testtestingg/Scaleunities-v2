"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/3d-button"
import { IconArrowLeft, IconMail, IconMapPin, IconClock } from "@tabler/icons-react"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

export function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    timeline: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        alert("Failed to send message. Please try again.")
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("An error occurred. Please try again.")
      setIsSubmitting(false)
    }
  }

  const inputClasses =
    "w-full px-6 py-4 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#6B21A8]/50 focus:ring-2 focus:ring-[#6B21A8]/20 transition-all rounded-xl"

  return (
    <main className="min-h-screen bg-background" role="main">
      {/* Navigation bar */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
          <Link href="/" className="inline-flex items-center gap-2 group text-sm font-medium hover:text-accent transition-colors">
            <IconArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to home
          </Link>
        </div>
      </header>

      {/* Main content */}
      <section className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left side - Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-5xl lg:text-7xl tracking-tight mb-8">
              Tell us about
              <br />
              your project.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12 max-w-lg">
              We&apos;re excited to hear about your vision. Fill out the form and we&apos;ll get back to you within 24
              hours to discuss your project in detail.
            </p>

            {/* Contact Info */}
            <div className="space-y-6 pt-8 border-t border-border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[rgba(107,33,168,0.1)] flex items-center justify-center flex-shrink-0">
                  <IconMail className="w-5 h-5 text-[#6B21A8]" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Email</h3>
                  <a href="mailto:hello@amirdridi.com" className="text-muted-foreground hover:text-accent transition-colors">
                    hello@amirdridi.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[rgba(107,33,168,0.1)] flex items-center justify-center flex-shrink-0">
                  <IconMapPin className="w-5 h-5 text-[#6B21A8]" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Location</h3>
                  <p className="text-muted-foreground">Tunis, Tunisia</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[rgba(107,33,168,0.1)] flex items-center justify-center flex-shrink-0">
                  <IconClock className="w-5 h-5 text-[#6B21A8]" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Availability</h3>
                  <p className="text-muted-foreground">Monday - Friday, 9:00 AM - 6:00 PM CET</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <div className="border border-border rounded-2xl p-12 lg:p-16 text-center bg-secondary">
                <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-serif text-3xl mb-4">Message received!</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Thank you for reaching out. We&apos;ll review your project details and get in touch with you shortly.
                </p>
                <Link href="/">
                  <Button className="rounded-full px-8">Back to home</Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-3">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ahmed Ben Ali"
                    required
                    className={inputClasses}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-3">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ahmed@example.com"
                    required
                    className={inputClasses}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-3">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+216 XX XXX XXX"
                    className={inputClasses}
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium mb-3">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company"
                    className={inputClasses}
                  />
                </div>

                {/* Project Type */}
                <div>
                  <label className="block text-sm font-medium mb-3">What are you looking for? *</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className={`${inputClasses} appearance-none cursor-pointer`}
                  >
                    <option value="">Select a service</option>
                    <option value="Modern Website">Modern Website</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="E-commerce Solution">E-commerce Solution</option>
                    <option value="Custom Solution">Custom Solution</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Timeline */}
                <div>
                  <label className="block text-sm font-medium mb-3">Project Timeline</label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className={`${inputClasses} appearance-none cursor-pointer`}
                  >
                    <option value="">Select a timeline</option>
                    <option value="ASAP (1-2 weeks)">ASAP (1-2 weeks)</option>
                    <option value="Soon (1 month)">Soon (1 month)</option>
                    <option value="Flexible (2-3 months)">Flexible (2-3 months)</option>
                    <option value="Still planning (3+ months)">Still planning (3+ months)</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium mb-3">Tell us more about your project *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, goals, and any specific requirements..."
                    rows={6}
                    required
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <Link href="/" className="flex-1">
                    <Button type="button" variant="outline" stretch className="rounded-full">
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" disabled={isSubmitting} stretch className="flex-1 rounded-full">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground text-center">
                  We&apos;ll get back to you within 24 hours.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
