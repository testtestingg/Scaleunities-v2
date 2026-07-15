"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { Reveal } from "@/components/reveal"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import {
  IconCode,
  IconDeviceMobile,
  IconShoppingCart,
  IconPalette,
  IconChartBar,
  IconHeadset,
  IconCheck,
  IconArrowRight,
} from "@tabler/icons-react"
import Link from "next/link"
import { Button } from "@/components/ui/3d-button"

const serviceIcons = [IconCode, IconDeviceMobile, IconShoppingCart, IconPalette, IconChartBar, IconHeadset]

export function ServicesPageClient() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_-10%,rgba(107,33,168,0.08),transparent_50%)]" />
        <div className="container mx-auto max-w-5xl relative">
          <Reveal>
            <div className="text-center">
              <span className="inline-block rounded-full bg-[rgba(107,33,168,0.1)] px-4 py-1.5 text-sm font-semibold text-[#6B21A8] mb-6">
                {t.nav.services}
              </span>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight mb-6 text-balance">
                {t.services.pageTitle}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t.services.pageSubtitle}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-8">
            {t.services.detailedServices.map((service, index) => {
              const Icon = serviceIcons[index]
              const isEven = index % 2 === 0
              return (
                <Reveal key={index} direction={isEven ? "left" : "right"}>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative bg-background rounded-3xl border-2 border-border overflow-hidden hover:border-[#6B21A8]/30 transition-all group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgba(107,33,168,0.03)] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative p-8 md:p-10">
                      <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Icon & Number */}
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-2xl bg-[rgba(107,33,168,0.1)] flex items-center justify-center flex-shrink-0">
                            <Icon className="w-8 h-8 text-[#6B21A8]" />
                          </div>
                          <span className="text-accent/20 font-serif text-5xl font-bold md:hidden">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start gap-4 mb-4">
                            <div>
                              <span className="hidden md:block text-accent/20 font-serif text-lg font-bold mb-1">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <h3 className="font-serif text-2xl md:text-3xl font-semibold">{service.title}</h3>
                            </div>
                          </div>
                          <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">{service.description}</p>

                          {/* Features */}
                          <div className="grid sm:grid-cols-2 gap-3">
                            {service.features.map((feature, fi) => (
                              <div key={fi} className="flex items-center gap-2">
                                <IconCheck className="w-4 h-4 text-[#6B21A8] flex-shrink-0" />
                                <span className="text-sm text-foreground">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <Reveal>
        <CTASection />
      </Reveal>
      <Footer />
    </main>
  )
}
