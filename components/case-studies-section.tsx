"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"

const U = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=70`

const caseImages = [
  U("1551288049-bebda4e38f71"), // analytics dashboard
  U("1556742049-0cfed4f6a45d"), // e-commerce / shopping
  U("1552519507-da3b142c6e3d"), // car / auto
  U("1467232004584-a241de8bcf5d"), // brand / workspace
]

const caseFallback = "/placeholder.svg?height=400&width=600"

export function CaseStudiesSection() {
  const { t } = useLanguage()
  const caseStudies = t.caseStudies.items.map((item, i) => ({ ...item, image: caseImages[i] }))

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl font-bold mb-4"
          >
            {t.caseStudies.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {t.caseStudies.subtitle}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-secondary rounded-2xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-300"
            >
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={study.image}
                  onError={(e) => {
                    if (e.currentTarget.dataset.fallback !== "1") {
                      e.currentTarget.dataset.fallback = "1"
                      e.currentTarget.src = caseFallback
                    }
                  }}
                  alt={study.project}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <div className="text-sm font-semibold text-accent mb-2">{study.client}</div>
                <h3 className="font-serif text-2xl font-bold mb-3">{study.project}</h3>
                <div className="text-3xl font-bold text-accent mb-4">{study.metric}</div>
                <p className="text-muted-foreground leading-relaxed">{study.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
