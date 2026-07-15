import type { Metadata } from "next"
import { BlogPageClient } from "./blog-page-client"

export const metadata: Metadata = {
  title: "Blog - Scaleunities | Insights on Web Development, Design & Technology",
  description:
    "Read the latest insights, tips, and best practices from our team of digital experts on web development, mobile apps, design, and technology trends.",
  keywords: "web development blog, tech blog, design insights, mobile development tips, SEO guide, digital agency blog",
  openGraph: {
    title: "Blog - Scaleunities",
    description: "Insights, tips, and best practices from our team of digital experts.",
    url: "https://scaleunities.com/blog",
    type: "website",
  },
  alternates: {
    canonical: "https://scaleunities.com/blog",
  },
}

export default function BlogPage() {
  return <BlogPageClient />
}
