"use client"

import { Button } from "@/components/ui/3d-button"
import { IconCheck } from "@tabler/icons-react"
import { motion } from "framer-motion"
import Link from "next/link"

export function PricingSection() {
  const plans = [
    {
      name: "Basic",
      price: "200",
      period: "TND",
      description: "Perfect for small projects and getting started with a professional online presence.",
      features: [
        "Responsive Website",
        "Basic SEO Optimization",
        "Mobile Friendly Design",
        "Contact Form Integration",
      ],
    },
    {
      name: "Professional",
      price: "800",
      period: "TND",
      description: "For growing businesses that need advanced features and premium design.",
      features: [
        "Advanced Website Design",
        "Premium SEO Setup",
        "Content Management System",
        "Analytics Integration",
        "E-commerce Ready",
        "Team Collaboration Tools",
      ],
      featured: true,
    },
    {
      name: "Enterprise",
      price: "1,500",
      period: "TND",
      description: "For large-scale solutions with custom features and dedicated support.",
      features: [
        "Custom Solution Development",
        "Advanced SEO & Analytics",
        "Mobile App Development",
        "Full Integration Suite",
        "24/7 Dedicated Support",
        "Custom Feature Development",
        "Dedicated Team Member",
      ],
    },
  ]

  return (
    <section id="pricing" className="py-24 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl font-bold mb-4"
          >
            Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Professional solutions at affordable prices. All prices in TND (Tunisian Dinar).
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`rounded-2xl p-8 border-2 ${
                plan.featured ? "bg-background border-[#6B21A8] shadow-lg scale-105" : "bg-background border-border"
              }`}
            >
              {plan.featured && (
                <div className="text-xs font-bold text-[#6B21A8] uppercase tracking-wider mb-4">Most Popular</div>
              )}
              <h3 className="font-serif text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-2">{plan.period}</span>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">{plan.description}</p>
              <Link href="/contact">
                <Button stretch className="mb-6 rounded-full">
                  Contact Us
                </Button>
              </Link>
              <div className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <IconCheck className="w-5 h-5 text-[#6B21A8] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-muted-foreground">
          All prices in TND (Tunisian Dinar). Custom quotes available for enterprise solutions.{" "}
          <Link href="/contact" className="underline underline-offset-4 hover:text-foreground transition-colors">
            Contact us
          </Link>
        </p>
      </div>
    </section>
  )
}
