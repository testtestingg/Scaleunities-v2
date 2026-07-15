"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Reveal } from "@/components/reveal"
import { useLanguage } from "@/components/language-provider"
import { motion, AnimatePresence } from "framer-motion"
import { IconClock, IconArrowRight, IconCalendar } from "@tabler/icons-react"

const categoryColorMap: Record<string, string> = {
  Development: "bg-blue-100 text-blue-700",
  Developpement: "bg-blue-100 text-blue-700",
  Design: "bg-pink-100 text-pink-700",
  Business: "bg-green-100 text-green-700",
  Technology: "bg-purple-100 text-purple-700",
  Technologie: "bg-purple-100 text-purple-700",
}

const categoryMap: Record<string, string> = {
  All: "All",
  Tous: "All",
  Development: "Development",
  Developpement: "Development",
  Design: "Design",
  Business: "Business",
  Technology: "Technology",
  Technologie: "Technology",
}

export function BlogPageClient() {
  const { t, lang } = useLanguage()
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredPosts =
    activeCategory === "All"
      ? t.blog.posts
      : t.blog.posts.filter((post) => {
          const mappedPostCat = categoryMap[post.category] || post.category
          return mappedPostCat === activeCategory
        })

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(107,33,168,0.08),transparent_50%)]" />
        <div className="container mx-auto max-w-5xl relative">
          <Reveal>
            <div className="text-center">
              <span className="inline-block rounded-full bg-[rgba(107,33,168,0.1)] px-4 py-1.5 text-sm font-semibold text-[#6B21A8] mb-6">
                {t.nav.blog}
              </span>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight mb-6 text-balance">
                {t.blog.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t.blog.subtitle}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-6 pb-8">
        <div className="container mx-auto max-w-5xl">
          <Reveal>
            <div className="flex flex-wrap justify-center gap-2">
              {t.blog.categories.map((category) => {
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

      {/* Blog Grid */}
      <section className="py-12 px-6 pb-20">
        <div className="container mx-auto max-w-5xl">
          <motion.div layout className="grid md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, index) => {
                const colorClass = categoryColorMap[post.category] || "bg-gray-100 text-gray-700"
                return (
                  <motion.article
                    key={post.title}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group bg-background rounded-2xl border border-border p-6 md:p-8 hover:shadow-lg hover:border-[#6B21A8]/20 transition-all duration-300 cursor-pointer"
                  >
                    {/* Category & Meta */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${colorClass}`}>
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <IconClock className="w-3.5 h-3.5" />
                        {post.readTime} {t.blog.minRead}
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="font-serif text-xl md:text-2xl font-semibold mb-3 group-hover:text-[#6B21A8] transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <IconCalendar className="w-3.5 h-3.5" />
                        {formatDate(post.date)}
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-[#6B21A8] group-hover:gap-2 transition-all">
                        {t.blog.readMore}
                        <IconArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </motion.article>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
