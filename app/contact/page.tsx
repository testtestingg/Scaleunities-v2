import type { Metadata } from "next"
import { ContactPageClient } from "./contact-page-client"

export const metadata: Metadata = {
  title: "Contact Us - Scaleunities | Get a Free Project Consultation",
  description:
    "Get in touch with Scaleunities for your web development, mobile app, or digital project. We offer free consultations and respond within 24 hours. Based in Djerba, Tunisia.",
  keywords: "contact scaleunities, free consultation, web development quote, mobile app quote, digital agency contact, tunisia",
  openGraph: {
    title: "Contact Us - Scaleunities",
    description: "Get a free project consultation. We respond within 24 hours.",
    url: "https://scaleunities.com/contact",
    type: "website",
  },
  alternates: {
    canonical: "https://scaleunities.com/contact",
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
