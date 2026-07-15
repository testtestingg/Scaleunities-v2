import type { Metadata } from "next"
import { PortfolioPageClient } from "./portfolio-page-client"

export const metadata: Metadata = {
  title: "Portfolio - Scaleunities | Our Work & Case Studies",
  description:
    "Explore our portfolio of successful web development, mobile app, and digital solution projects. See how we've helped businesses grow their digital presence.",
  keywords: "portfolio, web development projects, mobile app showcase, case studies, digital solutions portfolio",
  openGraph: {
    title: "Our Portfolio - Scaleunities",
    description: "Explore our latest projects crafted with precision, creativity, and deep understanding of our clients' goals.",
    url: "https://scaleunities.com/portfolio",
    type: "website",
  },
  alternates: {
    canonical: "https://scaleunities.com/portfolio",
  },
}

export default function PortfolioPage() {
  return <PortfolioPageClient />
}
