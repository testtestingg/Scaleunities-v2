"use client"

import { Button } from "@/components/ui/3d-button"
import { Code2 } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { TypingText } from "@/components/typing-text"
import { useLanguage } from "@/components/language-provider"

export function Hero() {
  const { t } = useLanguage()
  return (
    <section className="pt-32 pb-12 px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Trust Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-8 text-sm text-muted-foreground"
        >
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
            {t.hero.badge1}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
            {t.hero.badge2}
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal text-center leading-[1.1] mb-6 text-balance"
        >
          {t.hero.headStart}{" "}
          <span className="inline-flex items-center gap-3">
            {t.hero.headMid}
            <span className="inline-flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full bg-[rgba(107,33,168,0.12)]">
              <Code2 className="w-5 h-5 md:w-7 md:h-7 text-[#6B21A8]" />
            </span>
            {t.hero.headHighlight}
          </span>{" "}
          {t.hero.headEnd}
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed"
        >
          {t.hero.subheadline}
        </motion.p>

        {/* Typing specialty line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-10 flex items-center justify-center gap-2 text-lg md:text-2xl font-serif"
        >
          <span className="text-muted-foreground">{t.hero.weBuild}</span>
          <TypingText words={[...t.hero.typing]} className="font-semibold text-[#6B21A8]" />
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex justify-center gap-4"
        >
          <Link href="/contact">
            <Button size="lg" className="rounded-full px-8 text-base">
              {t.hero.getStarted}
            </Button>
          </Link>
          <Link href="#services">
            <Button size="lg" variant="outline" className="rounded-full px-8 text-base bg-transparent">
              {t.hero.ourServices}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
