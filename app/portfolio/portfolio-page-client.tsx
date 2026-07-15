"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { Reveal } from "@/components/reveal"
import { useLanguage } from "@/components/language-provider"
import { motion, AnimatePresence } from "framer-motion"
import { IconExternalLink } from "@tabler/icons-react"

const portfolioItems = [
  {
    title: "Enterprise Dashboard",
    category: "Dashboards",
    image: "https://i.ibb.co/N2dSjjJ2/Screenshot202026-02-0420201202-kf-DAre90tlz-I1-E54xszim-ZFPcm-J4k-G-1.avif",
    metric: "3x Faster Workflows",
    tech: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "E-Commerce Platform",
    category: "E-Commerce",
    image: "https://i.ibb.co/RTByDdRx/Capture20d-E28099e-CC81cran202025-12-2720a-CC802018.avif",
    metric: "5x Order Increase",
    tech: ["Next.js", "Stripe", "PostgreSQL"],
  },
  {
    title: "Auto Marketplace",
    category: "Websites",
    image: "https://i.ibb.co/BMXmbVy/ezgif-233ce88138c14d32-OW7-FSn-Hs-Lm-VYKw-W7d-EJxk2-O1p-F8-J08.webp",
    metric: "200+ Active Listings",
    tech: ["Next.js", "AI/ML", "Node.js"],
  },
  {
    title: "Brand Showcase",
    category: "Websites",
    image: "https://i.ibb.co/zhSNSwsR/Capture20d-E28099e-CC81cran202026-02-1420a-CC802022.avif",
    metric: "85% Conversion Uplift",
    tech: ["React", "Framer Motion", "Tailwind"],
  },
  {
    title: "Mobile Banking App",
    category: "Mobile Apps",
    image: "https://i.ibb.co/0Vskkjh9/Screenshot-2026-07-02-at-6-20-10-PM.png",
    metric: "4.8 Star Rating",
    tech: ["React Native", "Node.js", "MongoDB"],
  },
  {
    title: "Fitness Tracker",
    category: "Mobile Apps",
    image: "https://i.ibb.co/tTPdQC43/Screenshot-2026-07-02-at-6-21-16-PM.png",
    metric: "10K+ Downloads",
    tech: ["React Native", "Firebase", "HealthKit"],
  },
  {
    title: "Analytics Dashboard",
    category: "Dashboards",
    image: "https://i.ibb.co/k2Bk8sDy/Capture20d-E28099e-CC81cran202026-01-1420a-CC802020.avif",
    metric: "Real-time Insights",
    tech: ["Next.js", "D3.js", "WebSocket"],
  },
  {
    title: "Online Store Template",
    category: "E-Commerce",
    image: "https://i.ibb.co/8T2yGsn/Screenshot202025-12-2920161543-n-XRo-Vr-Ot-DXTElk0t-Nn-Nvs2tub-P8e5-E.avif",
    metric: "150% Revenue Growth",
    tech: ["Shopify", "React", "Node.js"],
  },
]

const categoryMap: Record<string, string> = {
  All: "All",
  Tous: "All",
  Websites: "Websites",
  "Sites web": "Websites",
  "Mobile Apps": "Mobile Apps",
  "Applications mobiles": "Mobile Apps",
  "E-Commerce": "E-Commerce",
  Dashboards: "Dashboards",
  "Tableaux de bord": "Dashboards",
}

export function PortfolioPageClient() {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredItems =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(107,33,168,0.08),transparent_50%)]" />
        <div className="container mx-auto max-w-5xl relative">
          <Reveal>
            <div className="text-center">
              <span className="inline-block rounded-full bg-[rgba(107,33,168,0.1)] px-4 py-1.5 text-sm font-semibold text-[#6B21A8] mb-6">
                {t.nav.portfolio}
              </span>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight mb-6 text-balance">
                {t.portfolio.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t.portfolio.subtitle}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="px-6 pb-8">
        <div className="container mx-auto max-w-6xl">
          <Reveal>
            <div className="flex flex-wrap justify-center gap-2">
              {t.portfolio.categories.map((category) => {
                const mappedCat = categoryMap[category] || category
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(mappedCat)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === mappedCat
                        ? "bg-[#6B21A8] text-white shadow-md"
                        : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {category}
                  </button>
                )
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative bg-background rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                      <span className="inline-block rounded-full bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1">
                        {item.metric}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-serif text-lg font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-xs text-[#6B21A8] font-medium uppercase tracking-wider mb-3">{item.category}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tech.map((tech) => (
                        <span key={tech} className="text-xs bg-secondary/50 text-muted-foreground px-2 py-0.5 rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Reveal>
        <CTASection />
      </Reveal>
      <Footer />
    </main>
  )
}
