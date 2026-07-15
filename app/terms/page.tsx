import type { Metadata } from "next"
import { TermsPageClient } from "./terms-page-client"

export const metadata: Metadata = {
  title: "Terms of Service - Scaleunities",
  description:
    "Read the Terms of Service for Scaleunities. These terms govern your use of our website and digital services.",
  robots: "index, follow",
  openGraph: {
    title: "Terms of Service - Scaleunities",
    description: "Terms of Service governing the use of Scaleunities website and digital services.",
    url: "https://scaleunities.com/terms",
    type: "website",
  },
  alternates: {
    canonical: "https://scaleunities.com/terms",
  },
}

export default function TermsPage() {
  return <TermsPageClient />
}
