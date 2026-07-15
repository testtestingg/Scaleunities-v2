import type { Metadata } from "next"
import { PrivacyPageClient } from "./privacy-page-client"

export const metadata: Metadata = {
  title: "Privacy Policy - Scaleunities | GDPR Compliant",
  description:
    "Read the Privacy Policy of Scaleunities. Learn how we collect, process, and protect your personal data in compliance with GDPR and applicable data protection laws.",
  robots: "index, follow",
  openGraph: {
    title: "Privacy Policy - Scaleunities",
    description: "How we collect, process, and protect your personal data in compliance with GDPR.",
    url: "https://scaleunities.com/privacy",
    type: "website",
  },
  alternates: {
    canonical: "https://scaleunities.com/privacy",
  },
}

export default function PrivacyPage() {
  return <PrivacyPageClient />
}
