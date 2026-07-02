"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"

export function StatsSection() {
  const { t } = useLanguage()

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-center mb-16 leading-tight text-balance"
        >
          <span className="text-accent">{t.stats.headlineA}</span>
          {t.stats.headlineMid}
          <span className="text-accent">{t.stats.headlineB}</span>
          {t.stats.headlineEnd}
        </motion.h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.stats.items.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              className="border-2 border-dashed border-border rounded-3xl p-8 text-center"
            >
              <div className="mb-4">
                <span className="font-serif text-7xl md:text-8xl font-bold">{stat.value}</span>
                <span className="text-accent text-5xl md:text-6xl font-serif font-bold">{stat.suffix}</span>
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-4">{stat.title}</h3>
              <p className="text-muted-foreground font-sans leading-relaxed">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
