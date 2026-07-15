"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { Reveal } from "@/components/reveal"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import {
  IconTargetArrow,
  IconEye,
  IconStar,
  IconBulb,
  IconHandshake,
  IconUsers,
  IconCheck,
  IconRocket,
} from "@tabler/icons-react"

export function AboutPageClient() {
  const { t } = useLanguage()
  const about = t.about

  const valueIcons = [IconStar, IconBulb, IconHandshake, IconUsers]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(107,33,168,0.08),transparent_50%)]" />
        <div className="container mx-auto max-w-5xl relative">
          <Reveal>
            <div className="text-center">
              <span className="inline-block rounded-full bg-[rgba(107,33,168,0.1)] px-4 py-1.5 text-sm font-semibold text-[#6B21A8] mb-6">
                {t.nav.about}
              </span>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight mb-6 text-balance">
                {about.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {about.subtitle}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            <Reveal direction="left">
              <div className="relative bg-background rounded-3xl border-2 border-border p-8 md:p-10 hover:border-[#6B21A8]/30 transition-colors group">
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(107,33,168,0.04)] to-transparent rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-[rgba(107,33,168,0.1)] flex items-center justify-center mb-6">
                    <IconTargetArrow className="w-7 h-7 text-[#6B21A8]" />
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-4">{about.missionTitle}</h2>
                  <p className="text-muted-foreground leading-relaxed">{about.missionText}</p>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="relative bg-background rounded-3xl border-2 border-border p-8 md:p-10 hover:border-[#6B21A8]/30 transition-colors group">
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(107,33,168,0.04)] to-transparent rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-[rgba(107,33,168,0.1)] flex items-center justify-center mb-6">
                    <IconEye className="w-7 h-7 text-[#6B21A8]" />
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-4">{about.visionTitle}</h2>
                  <p className="text-muted-foreground leading-relaxed">{about.visionText}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-tight mb-4">{about.valuesTitle}</h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.values.map((value, index) => {
              const Icon = valueIcons[index]
              return (
                <Reveal key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-background rounded-2xl border border-border p-6 text-center h-full hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[rgba(107,33,168,0.1)] flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-[#6B21A8]" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </motion.div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-tight mb-4">{about.whyTitle}</h2>
            </div>
          </Reveal>
          <div className="space-y-4">
            {about.whyItems.map((item, index) => (
              <Reveal key={index} delay={index * 0.08}>
                <div className="flex items-start gap-4 bg-secondary/30 rounded-xl p-5 hover:bg-secondary/50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[rgba(107,33,168,0.1)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <IconCheck className="w-4 h-4 text-[#6B21A8]" />
                  </div>
                  <p className="text-foreground leading-relaxed">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Reveal>
        <CTASection />
      </Reveal>
      <Footer />
    </main>
  )
}
