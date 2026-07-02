"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/3d-button"
import { IconArrowLeft, IconMail, IconMapPin, IconClock } from "@tabler/icons-react"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/i18n"

export function ContactPageClient() {
  const { t, lang, setLang } = useLanguage()
  const c = t.contact
  // Canonical English values so submitted emails stay consistent across languages.
  const en = translations.en.contact

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
        alert(c.failed)
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert(c.errored)
      setIsSubmitting(false)
    }
  }

  const inputClasses =
    "w-full px-5 py-3.5 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#6B21A8]/60 focus:ring-2 focus:ring-[#6B21A8]/20 transition-all rounded-xl"
  const labelClasses = "block text-sm font-medium mb-2"

  return (
    <main className="min-h-screen bg-background" role="main">
      {/* Soft brand gradient backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_-10%,rgba(107,33,168,0.10),transparent_45%)]" />

      {/* Navigation bar */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 group text-sm font-medium hover:text-accent transition-colors"
          >
            <IconArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {c.back}
          </Link>
          <div className="inline-flex items-center rounded-full border border-border bg-secondary/50 p-0.5 text-xs font-semibold">
            {(["en", "fr"] as const).map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={`rounded-full px-3 py-1 uppercase transition-colors ${
                  lang === code ? "bg-[#6B21A8] text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main content */}
      <section className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left side - Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-28"
          >
            <span className="inline-block rounded-full bg-[rgba(107,33,168,0.1)] px-4 py-1.5 text-sm font-semibold text-[#6B21A8] mb-6">
              {t.nav.getStarted}
            </span>
            <h1 className="font-serif text-4xl lg:text-6xl tracking-tight mb-6 text-balance">{c.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg">{c.intro}</p>

            {/* Contact Info */}
            <div className="space-y-6 pt-8 border-t border-border">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[rgba(107,33,168,0.1)] flex items-center justify-center flex-shrink-0">
                  <IconMail className="w-5 h-5 text-[#6B21A8]" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">{c.emailLabel}</h3>
                  <a
                    href="mailto:hello@scaleunities.com"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    hello@scaleunities.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[rgba(107,33,168,0.1)] flex items-center justify-center flex-shrink-0">
                  <IconMapPin className="w-5 h-5 text-[#6B21A8]" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">{c.locationLabel}</h3>
                  <p className="text-muted-foreground">{t.footer.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[rgba(107,33,168,0.1)] flex items-center justify-center flex-shrink-0">
                  <IconClock className="w-5 h-5 text-[#6B21A8]" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">{c.availabilityLabel}</h3>
                  <p className="text-muted-foreground">{c.availabilityValue}</p>
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
              <div className="relative bg-background rounded-3xl border-4 border-b-8 border-border shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(107,33,168,0.08)] to-transparent pointer-events-none" />
                <div className="relative p-12 lg:p-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="font-serif text-3xl mb-4">{c.successTitle}</h2>
                  <p className="text-lg text-muted-foreground mb-8">{c.successBody}</p>
                  <Link href="/">
                    <Button className="rounded-full px-8">{c.back}</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="relative bg-background rounded-3xl border-4 border-b-8 border-border shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(107,33,168,0.06)] to-transparent pointer-events-none" />
                <div className="relative p-8 md:p-10">
                  <div className="mb-8">
                    <h2 className="font-serif text-2xl md:text-3xl mb-2">{c.formTitle}</h2>
                    <p className="text-muted-foreground">{c.formSubtitle}</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClasses}>
                          {c.nameLabel} <span className="text-[#6B21A8]">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={c.namePlaceholder}
                          required
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>
                          {c.emailFieldLabel} <span className="text-[#6B21A8]">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={c.emailPlaceholder}
                          required
                          className={inputClasses}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClasses}>{c.phoneLabel}</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+216 XX XXX XXX"
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>{c.companyLabel}</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder={c.companyPlaceholder}
                          className={inputClasses}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClasses}>
                        {c.projectLabel} <span className="text-[#6B21A8]">*</span>
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                        className={`${inputClasses} appearance-none cursor-pointer`}
                      >
                        <option value="">{c.projectPlaceholder}</option>
                        {c.projectOptions.map((label, i) => (
                          <option key={en.projectOptions[i]} value={en.projectOptions[i]}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={labelClasses}>{c.timelineLabel}</label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className={`${inputClasses} appearance-none cursor-pointer`}
                      >
                        <option value="">{c.timelinePlaceholder}</option>
                        {c.timelineOptions.map((label, i) => (
                          <option key={en.timelineOptions[i]} value={en.timelineOptions[i]}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={labelClasses}>
                        {c.messageLabel} <span className="text-[#6B21A8]">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={c.messagePlaceholder}
                        rows={5}
                        required
                        className={`${inputClasses} resize-none`}
                      />
                    </div>

                    <div className="flex gap-4 pt-2">
                      <Link href="/" className="flex-1">
                        <Button type="button" variant="outline" stretch className="rounded-full">
                          {c.cancel}
                        </Button>
                      </Link>
                      <Button type="submit" disabled={isSubmitting} stretch className="flex-1 rounded-full">
                        {isSubmitting ? c.sending : c.send}
                      </Button>
                    </div>

                    <p className="text-sm text-muted-foreground text-center">{c.note}</p>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
