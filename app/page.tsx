import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { PortfolioShowcase } from "@/components/portfolio-showcase"
import { ClientLogos } from "@/components/client-logos"
import { StatsSection } from "@/components/stats-section"
import { ServicesSection } from "@/components/services-section"
import { TeamSection } from "@/components/team-section"
import { CaseStudiesSection } from "@/components/case-studies-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ApproachSection } from "@/components/approach-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { Reveal } from "@/components/reveal"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <PortfolioShowcase />
      <Reveal>
        <ClientLogos />
      </Reveal>
      <Reveal>
        <StatsSection />
      </Reveal>
      <Reveal>
        <ServicesSection />
      </Reveal>
      <Reveal>
        <TeamSection />
      </Reveal>
      <Reveal>
        <CaseStudiesSection />
      </Reveal>
      <Reveal>
        <TestimonialsSection />
      </Reveal>
      <Reveal>
        <ApproachSection />
      </Reveal>
      <Reveal>
        <FAQSection />
      </Reveal>
      <Reveal>
        <CTASection />
      </Reveal>
      <Footer />
    </main>
  )
}
