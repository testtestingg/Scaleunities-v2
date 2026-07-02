"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"

const caseImages = [
  "/video1.mp4",
  "https://static.vecteezy.com/system/resources/thumbnails/002/459/314/small/shopping-online-store-for-sale-mobile-ecommerce-3d-blue-background-shop-online-on-mobile-app-24-hours-shopping-cart-credit-card-minimal-store-online-device-3d-rendered-free-vector.jpg", 
  "https://static.vecteezy.com/system/resources/thumbnails/076/303/452/small/premium-download-illustration-of-buy-cap-online-vector.jpg",
  "https://static.vecteezy.com/system/resources/thumbnails/007/163/082/small/landing-page-illustration-of-a-young-woman-relaxing-in-a-comfortable-chair-with-pink-color-free-vector.jpg",
]

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
          {caseStudies.map((study, index) => {
            // Check if the source is a video file
            const isVideo = study.image?.endsWith(".mp4") || study.image?.endsWith(".webm")

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-secondary rounded-2xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-300"
              >
                {/* Changed aspect-[3/2] to aspect-video (16:9) */}
                <div className="aspect-video overflow-hidden bg-neutral-900/5">
                  {isVideo ? (
                    <video
                      src={study.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <img
                      src={study.image}
                      alt={study.project}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="p-8">
                  <div className="text-sm font-semibold text-accent mb-2">{study.client}</div>
                  <h3 className="font-serif text-2xl font-bold mb-3">{study.project}</h3>
                  <div className="text-3xl font-bold text-accent mb-4">{study.metric}</div>
                  <p className="text-muted-foreground leading-relaxed">{study.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
