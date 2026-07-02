import { TestimonialSlider, type Testimonial } from "@/components/ui/testimonial-slider"

const testimonials: Testimonial[] = [
  {
    image: "/placeholder.svg?height=400&width=400",
    quote:
      "Scaleunities completely transformed our internal tools. The new dashboard is blazingly fast and intuitively designed, saving our team hours every week. Their attention to detail is unmatched.",
    name: "Fatima Khelil",
    role: "Operations Director, TechFlow Systems",
    rating: 5,
  },
  {
    image: "/placeholder.svg?height=400&width=400",
    quote:
      "Working with the Scaleunities team has been a game-changer. They delivered a beautiful, responsive website that has significantly increased our online presence and customer engagement.",
    name: "Ahmed Ben Ali",
    role: "CEO, Digital Growth Agency",
    rating: 5,
  },
  {
    image: "/placeholder.svg?height=400&width=400",
    quote:
      "The team at Scaleunities doesn't just build websites—they build growth engines. Their strategic approach and technical expertise helped us achieve a 5x ROI on our digital investment.",
    name: "Sarah Mitchell",
    role: "Marketing Director, Nexus Partners",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-32 px-4 bg-background overflow-visible">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">What Our Clients Say</h2>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take our word for it—hear from the businesses we&apos;ve helped grow.
          </p>
        </div>
        <TestimonialSlider testimonials={testimonials} />
      </div>
    </section>
  )
}
