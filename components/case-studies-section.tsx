"use client"

import { motion } from "framer-motion"

export function CaseStudiesSection() {
  const caseStudies = [
    {
      client: "Enterprise Dashboard",
      project: "Dashboard Redesign",
      metric: "3x Faster Workflows",
      description:
        "Complete redesign of internal tools. The new dashboard is blazingly fast and intuitively designed, saving the team hours every week.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      client: "E-commerce Pro",
      project: "Online Store Platform",
      metric: "5x Order Increase",
      description:
        "Built a premium e-commerce store with elegant interface and seamless checkout experience driving significant revenue growth.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      client: "Auto Marketplace",
      project: "AI-Powered Buy/Sell Platform",
      metric: "200+ Active Listings",
      description:
        "Platform for buying and selling vehicles with AI-powered price estimation to help users get fair market value.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      client: "Brand Showcase",
      project: "Elegant Brand Template",
      metric: "85% Conversion Uplift",
      description:
        "Professional web solution with conversion-focused design patterns that dramatically improved lead generation.",
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

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
            Featured Work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Real results from projects we&apos;ve delivered. A selection of our most successful digital solutions.
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
                  src={study.image || "/placeholder.svg"}
                  alt={study.project}
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
