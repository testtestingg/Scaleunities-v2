"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { FooterSection } from "@/components/landing/footer-section";

export function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to send message. Please try again.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background" role="main">
      {/* Navigation bar */}
      <header className="sticky top-0 z-50 border-b border-foreground/10">
        <div className="max-w-350 mx-auto px-6 lg:px-12 py-6 flex items-center">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back to home</span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <section className="max-w-350 mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left side - Info */}
          <div>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Let's Work Together
            </span>
            <h1 className="text-5xl lg:text-7xl font-display tracking-tight mb-8">
              Tell us about
              <br />
              your project.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12 max-w-lg">
              I'm excited to hear about your vision. Fill out the form and I'll get back to you within 24 hours to discuss your project in detail.
            </p>

            {/* Contact Info */}
            <div className="space-y-6 pt-8 border-t border-foreground/10">
              <div>
                <h3 className="font-medium text-foreground mb-2">Email</h3>
                <a
                  href="mailto:hello@amirdridi.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  hello@amirdridi.com
                </a>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">Location</h3>
                <p className="text-muted-foreground">
                  Tunis, Tunisia
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">Availability</h3>
                <p className="text-muted-foreground">
                  Monday - Friday, 9:00 AM - 6:00 PM CET
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div>
            {submitted ? (
              <div className="border border-foreground/10 p-12 lg:p-16 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-display mb-4">Message received!</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Thank you for reaching out. We'll review your project details and get in touch with you shortly.
                </p>
                <Link href="/">
                  <Button className="bg-foreground hover:bg-foreground/90 text-background px-8 rounded-full">
                    Back to home
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ahmed Ben Ali"
                    required
                    className="w-full px-6 py-4 bg-background border border-foreground/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ahmed@example.com"
                    required
                    className="w-full px-6 py-4 bg-background border border-foreground/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+216 XX XXX XXX"
                    className="w-full px-6 py-4 bg-background border border-foreground/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company"
                    className="w-full px-6 py-4 bg-background border border-foreground/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors"
                  />
                </div>

                {/* Project Type */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    What are you looking for? *
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-background border border-foreground/10 text-foreground focus:outline-none focus:border-foreground/30 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Select a service</option>
                    <option value="website">Modern Website</option>
                    <option value="mobile">Mobile App</option>
                    <option value="ecommerce">E-commerce Solution</option>
                    <option value="custom">Custom Solution</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Timeline */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Project Timeline
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-background border border-foreground/10 text-foreground focus:outline-none focus:border-foreground/30 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Select a timeline</option>
                    <option value="urgent">ASAP (1-2 weeks)</option>
                    <option value="soon">Soon (1 month)</option>
                    <option value="flexible">Flexible (2-3 months)</option>
                    <option value="planning">Still planning (3+ months)</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Tell us more about your project
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, goals, and any specific requirements..."
                    rows={6}
                    className="w-full px-6 py-4 bg-background border border-foreground/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <Link href="/" className="flex-1">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full rounded-full border-foreground/20 hover:bg-foreground/5"
                    >
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-foreground hover:bg-foreground/90 text-background rounded-full"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground text-center">
                  We'll get back to you within 24 hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
