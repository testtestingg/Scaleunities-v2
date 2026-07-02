"use client"

import { TestimonialSlider, type Testimonial } from "@/components/ui/testimonial-slider"
import { useLanguage } from "@/components/language-provider"

// Names and photos stay constant across languages; quote/role come from translations.
const people = [
  { name: "Robin Zimmermann", image: "	https://www.42heilbronn.de/files/images/2025/Team_complete/Robin.png" },
  { name: "Rahma Ammouri", image: "https://i.ibb.co/gLxCHt43/Screenshot-2026-07-02-at-7-08-19-PM.png" },
  { name: "Farhang Yarbakht", image: "https://i.ibb.co/ZsDhXGS/Screenshot-2026-07-02-at-7-07-25-PM.png" },
]

export function TestimonialsSection() {
  const { t } = useLanguage()

  const testimonials: Testimonial[] = people.map((p, i) => ({
    image: p.image,
    name: p.name,
    quote: t.testimonials.items[i].quote,
    role: t.testimonials.items[i].role,
    rating: 5,
  }))

  return (
    <section id="testimonials" className="py-32 px-4 bg-background overflow-visible">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">{t.testimonials.title}</h2>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">{t.testimonials.subtitle}</p>
        </div>
        <TestimonialSlider testimonials={testimonials} />
      </div>
    </section>
  )
}
