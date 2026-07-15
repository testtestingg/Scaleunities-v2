import type { Metadata } from "next"
import { ServicesPageClient } from "./services-page-client"

export const metadata: Metadata = {
  title: "Services - Scaleunities | Web Development, Mobile Apps & Digital Solutions",
  description:
    "Explore our comprehensive digital services: web development, mobile apps, e-commerce, UI/UX design, SEO, and ongoing support. Tailored solutions for businesses in Tunisia and internationally.",
  keywords: "web development services, mobile app development, e-commerce solutions, UI UX design, SEO optimization, digital agency services, tunisia",
  openGraph: {
    title: "Our Services - Scaleunities",
    description: "Comprehensive digital solutions tailored to your business needs. From concept to deployment, we deliver excellence.",
    url: "https://scaleunities.com/services",
    type: "website",
  },
  alternates: {
    canonical: "https://scaleunities.com/services",
  },
}

export default function ServicesPage() {
  return <ServicesPageClient />
}
