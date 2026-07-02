"use client"

import { useState } from "react"
import { IconChevronDown } from "@tabler/icons-react"
import { motion } from "framer-motion"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "What services does Scaleunities offer?",
      answer:
        "We offer modern website development, mobile app development (iOS & Android), e-commerce solutions, custom digital platforms, UI/UX design, SEO optimization, and ongoing technical support.",
    },
    {
      question: "What's your typical project timeline?",
      answer:
        "Most projects take 1-4 weeks from kickoff to launch, depending on scope. Simple websites can be delivered within 48 hours, while complex platforms may take longer. We provide detailed timelines during our discovery phase.",
    },
    {
      question: "What technologies do you use?",
      answer:
        "We work with modern technologies including React, Next.js, TypeScript, React Native, Node.js, PostgreSQL, Supabase, AWS, Tailwind CSS, and more. We choose the best stack for each project's needs.",
    },
    {
      question: "Do you provide ongoing support after launch?",
      answer:
        "Yes! All our plans include post-launch support. We offer bug fixes, security updates, performance monitoring, content updates, and regular check-ins to ensure your solution continues to perform at its best.",
    },
    {
      question: "What are your pricing options?",
      answer:
        "We offer three tiers: Basic (200 TND), Professional (800 TND), and Enterprise (1,500 TND). Each tier includes different features and support levels. Custom quotes are available for unique projects.",
    },
    {
      question: "Where is your team located?",
      answer:
        "Our team is based in Tunis, Tunisia. We work with clients globally and are available Monday through Friday, 9:00 AM - 6:00 PM CET. We communicate fluently in English, French, and Arabic.",
    },
  ]

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl font-bold mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Everything you need to know about working with Scaleunities.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="border border-border rounded-xl overflow-hidden bg-secondary"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-background/50 transition-colors"
              >
                <span className="font-semibold text-lg pr-8">{faq.question}</span>
                <IconChevronDown
                  className={`w-5 h-5 flex-shrink-0 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                />
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-5 text-muted-foreground leading-relaxed"
                >
                  {faq.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
