import type { Metadata } from "next"
import { AboutPageClient } from "./about-page-client"

export const metadata: Metadata = {
  title: "About Us - Scaleunities | Digital Agency in Tunisia",
  description:
    "Learn about Scaleunities, a passionate team of digital craftsmen based in Djerba, Tunisia. We deliver world-class web, mobile, and custom digital solutions for clients across the globe.",
  keywords: "about scaleunities, digital agency tunisia, web development team, djerba, tunisian tech company",
  openGraph: {
    title: "About Us - Scaleunities | Digital Agency in Tunisia",
    description: "A passionate team of digital craftsmen based in Tunisia, delivering world-class solutions globally.",
    url: "https://scaleunities.com/about",
    type: "website",
  },
  alternates: {
    canonical: "https://scaleunities.com/about",
  },
}

export default function AboutPage() {
  return <AboutPageClient />
}
