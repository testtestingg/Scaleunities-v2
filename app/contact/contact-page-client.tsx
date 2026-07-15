"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/3d-button"
import { IconArrowLeft, IconMail, IconMapPin, IconClock, IconBrandWhatsapp, IconSend, IconCheck } from "@tabler/icons-react"
import { Footer } from "@/components/footer"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/i18n"

interface FormErrors {
  name?: string
  email?: string
  projectType?: string
  message?: string
  gdpr?: string
}

export function ContactPageClient() {
  const { t, lang, setLang } = useLanguage()
  const c = t.contact
  const en = translations.en.contact

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    timeline: "",
    budget: "",
    message: "",
  })
  const [gdprConsent, setGdprConsent] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validateField = useCallback(
    (name: string, value: string): string | undefined => {
      switch (name) {
        case "name":
          if (!value.trim()) return c.validationName
          if (value.trim().length < 2) return c.validationName
          return undefined
        case "email":
          if (!value.trim()) return c.validationEmail
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return c.validationEmail
          return undefined
        case "projectType":
          if (!value) return c.validationProject
          return undefined
        case "message":
          if (!value.trim()) return c.validationMessage
          if (value.trim().length < 10) return c.validationMessage
          return undefined
        default:
          return undefined
      }
    },
    [c],
  )

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    newErrors.name = validateField("name", formData.name)
    newErrors.email = validateField("email", formData.email)
    newErrors.projectType = validateField("projectType", formData.projectType)
    newErrors.message = validateField("message", formData.message)
    if (!gdprConsent) newErrors.gdpr = c.gdprRequired

    // Remove undefined entries
    const filtered = Object.fromEntries(Object.entries(newErrors).filter(([, v]) => v !== undefined))
    setErrors(filtered as FormErrors)
    return Object.keys(filtered).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error on change if field was touched
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Mark all fields as touched
    setTouched({ name: true, email: true, projectType: true, message: true })

    if (!validateForm()) return

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
        setErrors({ message: c.failed })
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setErrors({ message: c.errored })
      setIsSubmitting(false)
    }
  }

  const inputClasses = (fieldName: string) =>
    `w-full px-5 py-3.5 bg-background border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all rounded-xl ${
      errors[fieldName as keyof FormErrors] && touched[fieldName]
        ? "border-red-400 focus:border-red-400 focus:ring-red-200"
        : "border-border focus:border-[#6B21A8]/60 focus:ring-[#6B21A8]/20"
    }`
  const labelClasses = "block text-sm font-medium mb-2"

  return (
    <main className="min-h-screen bg-background" role="main">
      {/* Soft brand gradient backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_-10%,rgba(107,33,168,0.10),transparent_45%)]" />

      {/* Navigation bar */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 group text-sm font-medium hover:text-[#6B21A8] transition-colors"
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
                    className="text-muted-foreground hover:text-[#6B21A8] transition-colors"
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

            {/* Map placeholder with decorative element */}
            <div className="mt-8 rounded-2xl overflow-hidden border border-border h-48 bg-secondary/30 flex items-center justify-center">
              <div className="text-center">
                <IconMapPin className="w-8 h-8 text-[#6B21A8] mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Djerba, Tunisia</p>
                <p className="text-xs text-muted-foreground">Mediterranean Island</p>
              </div>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative bg-background rounded-3xl border-4 border-b-8 border-border shadow-2xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(107,33,168,0.08)] to-transparent pointer-events-none" />
                  <div className="relative p-12 lg:p-16 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500/30 flex items-center justify-center mx-auto mb-6"
                    >
                      <IconCheck className="w-10 h-10 text-green-600" />
                    </motion.div>
                    <h2 className="font-serif text-3xl mb-4">{c.successTitle}</h2>
                    <p className="text-lg text-muted-foreground mb-8">{c.successBody}</p>
                    <Link href="/">
                      <Button className="rounded-full px-8">{c.back}</Button>
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  className="relative bg-background rounded-3xl border-4 border-b-8 border-border shadow-2xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(107,33,168,0.06)] to-transparent pointer-events-none" />
                  <div className="relative p-8 md:p-10">
                    <div className="mb-8">
                      <h2 className="font-serif text-2xl md:text-3xl mb-2">{c.formTitle}</h2>
                      <p className="text-muted-foreground">{c.formSubtitle}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="name" className={labelClasses}>
                            {c.nameLabel} <span className="text-[#6B21A8]">*</span>
                          </label>
                          <input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={c.namePlaceholder}
                            required
                            autoComplete="name"
                            className={inputClasses("name")}
                          />
                          {errors.name && touched.name && (
                            <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">{errors.name}</p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="email" className={labelClasses}>
                            {c.emailFieldLabel} <span className="text-[#6B21A8]">*</span>
                          </label>
                          <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={c.emailPlaceholder}
                            required
                            autoComplete="email"
                            className={inputClasses("email")}
                          />
                          {errors.email && touched.email && (
                            <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="phone" className={labelClasses}>{c.phoneLabel}</label>
                          <input
                            id="phone"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+XX XX XXX XXX"
                            autoComplete="tel"
                            className={inputClasses("phone")}
                          />
                        </div>
                        <div>
                          <label htmlFor="company" className={labelClasses}>{c.companyLabel}</label>
                          <input
                            id="company"
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder={c.companyPlaceholder}
                            autoComplete="organization"
                            className={inputClasses("company")}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="projectType" className={labelClasses}>
                          {c.projectLabel} <span className="text-[#6B21A8]">*</span>
                        </label>
                        <select
                          id="projectType"
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={`${inputClasses("projectType")} appearance-none cursor-pointer`}
                        >
                          <option value="">{c.projectPlaceholder}</option>
                          {c.projectOptions.map((label, i) => (
                            <option key={en.projectOptions[i]} value={en.projectOptions[i]}>
                              {label}
                            </option>
                          ))}
                        </select>
                        {errors.projectType && touched.projectType && (
                          <p className="text-xs text-red-500 mt-1.5">{errors.projectType}</p>
                        )}
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="timeline" className={labelClasses}>{c.timelineLabel}</label>
                          <select
                            id="timeline"
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleChange}
                            className={`${inputClasses("timeline")} appearance-none cursor-pointer`}
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
                          <label htmlFor="budget" className={labelClasses}>{c.budgetLabel}</label>
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className={`${inputClasses("budget")} appearance-none cursor-pointer`}
                          >
                            <option value="">{c.budgetPlaceholder}</option>
                            {c.budgetOptions.map((label, i) => (
                              <option key={en.budgetOptions[i]} value={en.budgetOptions[i]}>
                                {label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className={labelClasses}>
                          {c.messageLabel} <span className="text-[#6B21A8]">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder={c.messagePlaceholder}
                          rows={5}
                          required
                          className={`${inputClasses("message")} resize-none`}
                        />
                        {errors.message && touched.message && (
                          <p className="text-xs text-red-500 mt-1.5">{errors.message}</p>
                        )}
                      </div>

                      {/* GDPR Consent */}
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="gdprConsent"
                          checked={gdprConsent}
                          onChange={(e) => {
                            setGdprConsent(e.target.checked)
                            if (e.target.checked) setErrors((prev) => ({ ...prev, gdpr: undefined }))
                          }}
                          className="mt-1 w-4 h-4 rounded border-border text-[#6B21A8] focus:ring-[#6B21A8] cursor-pointer"
                        />
                        <label htmlFor="gdprConsent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                          {c.gdprConsent}{" "}
                          <Link href="/privacy" className="text-[#6B21A8] underline hover:text-[#6B21A8]/80">
                            {t.footer.privacyPolicy}
                          </Link>
                          . <span className="text-[#6B21A8]">*</span>
                        </label>
                      </div>
                      {errors.gdpr && (
                        <p className="text-xs text-red-500 -mt-2">{errors.gdpr}</p>
                      )}

                      <div className="flex gap-4 pt-2">
                        <Link href="/" className="flex-1">
                          <Button type="button" variant="outline" stretch className="rounded-full">
                            {c.cancel}
                          </Button>
                        </Link>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          stretch
                          className="flex-1 rounded-full"
                          leadingIcon={isSubmitting ? undefined : IconSend}
                        >
                          {isSubmitting ? c.sending : c.send}
                        </Button>
                      </div>

                      <p className="text-sm text-muted-foreground text-center">{c.note}</p>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
