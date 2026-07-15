import type React from "react"
import type { Metadata, Viewport } from "next"
import { Instrument_Serif, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import { LanguageProvider } from "@/components/language-provider"
import "./globals.css"

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 5.0,
  themeColor: "#6B21A8",
}

export const metadata: Metadata = {
  title: {
    default: "Scaleunities - Digital Solutions Agency | Web, Mobile & Custom Development",
    template: "%s | Scaleunities",
  },
  description:
    "Scaleunities is a digital solutions agency based in Tunisia. We build modern websites, mobile apps, e-commerce platforms, and custom digital solutions for clients worldwide. Expert team fluent in English, French, and Arabic.",
  generator: "Next.js",
  keywords: [
    "web development",
    "mobile apps",
    "digital agency",
    "Tunisia",
    "Djerba",
    "Scaleunities",
    "fullstack developer",
    "frontend designer",
    "UI designer",
    "e-commerce",
    "SEO optimization",
    "React",
    "Next.js",
    "agence digitale tunisie",
    "developpement web",
    "application mobile",
    "creation site web",
  ],
  authors: [{ name: "Scaleunities Team", url: "https://scaleunities.com" }],
  creator: "Scaleunities",
  publisher: "Scaleunities",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_FR"],
    url: "https://scaleunities.com",
    siteName: "Scaleunities",
    title: "Scaleunities - Digital Solutions Agency",
    description:
      "Expert digital solutions agency based in Tunisia. We build modern websites, mobile apps, and custom solutions for businesses worldwide.",
    images: [
      {
        url: "https://i.ibb.co/fVNXP5mS/Techytak-logo.png",
        width: 1200,
        height: 630,
        alt: "Scaleunities - Digital Solutions Agency",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scaleunities - Digital Solutions Agency",
    description: "Expert digital solutions agency based in Tunisia. Modern websites, mobile apps, and custom solutions.",
    images: ["https://i.ibb.co/fVNXP5mS/Techytak-logo.png"],
  },
  applicationName: "Scaleunities",
  alternates: {
    canonical: "https://scaleunities.com",
  },
  category: "technology",
}

// JSON-LD Structured Data for SEO
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Scaleunities",
  url: "https://scaleunities.com",
  logo: "https://scaleunities.com/scaleunities-logo.png",
  description: "Digital solutions agency based in Djerba, Tunisia. Web development, mobile apps, and custom digital solutions.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Djerba",
    addressCountry: "TN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@scaleunities.com",
    contactType: "customer service",
    availableLanguage: ["English", "French", "Arabic"],
  },
  sameAs: [
    "https://www.facebook.com/scaleunities/",
    "https://www.instagram.com/scaleunities/",
    "https://www.linkedin.com/company/scaleunities/about/",
  ],
  knowsLanguage: ["en", "fr", "ar"],
  areaServed: [
    { "@type": "Country", name: "Tunisia" },
    { "@type": "Country", name: "France" },
    { "@type": "Place", name: "Worldwide" },
  ],
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Scaleunities",
  url: "https://scaleunities.com",
  inLanguage: ["en", "fr"],
  potentialAction: {
    "@type": "SearchAction",
    target: "https://scaleunities.com/?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Scaleunities",
  url: "https://scaleunities.com",
  telephone: "",
  email: "contact@scaleunities.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Djerba",
    addressCountry: "TN",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  priceRange: "$$",
  serviceType: ["Web Development", "Mobile App Development", "E-Commerce Solutions", "UI/UX Design", "SEO Optimization"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <link rel="canonical" href="https://scaleunities.com" />
        <link rel="alternate" hrefLang="en" href="https://scaleunities.com" />
        <link rel="alternate" hrefLang="fr" href="https://scaleunities.com" />
        <link rel="alternate" hrefLang="x-default" href="https://scaleunities.com" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      {/* Facebook Pixel */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1825468495013391');
          fbq('track', 'PageView');
        `}
      </Script>
      <body
        className={`${inter.variable} ${instrumentSerif.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {/* Facebook Pixel noscript fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1825468495013391&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
