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
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 5.0,
  themeColor: "#6B21A8",
}

export const metadata: Metadata = {
  title: "Scaleunities - Digital Solutions Agency | Web, Mobile & Custom Development",
  description:
    "A talented team of 4 professionals: Amir Dridi (Fullstack Developer), Ranim Mourad (Frontend Developer & UI Designer), Ali Ben Said (Manager), and Houssem Ben Cheikh (Designer). We deliver exceptional digital solutions.",
  generator: "v0.app",
  keywords:
    "web development, mobile apps, fullstack developer, frontend designer, UI designer, project manager, digital solutions, Tunisia, Scaleunities",
  authors: [{ name: "Scaleunities Team" }],
  creator: "Scaleunities",
  publisher: "Scaleunities",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://scaleunities.com",
    siteName: "Scaleunities",
    title: "Scaleunities - Digital Solutions Agency",
    description: "A talented team of 4 professionals delivering exceptional digital solutions.",
    images: [
      {
        url: "https://i.ibb.co/fVNXP5mS/Techytak-logo.png",
        width: 1200,
        height: 630,
        alt: "Scaleunities Team",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scaleunities - Digital Solutions Agency",
    description: "A talented team delivering exceptional digital solutions.",
    images: ["https://i.ibb.co/fVNXP5mS/Techytak-logo.png"],
  },
  applicationName: "Scaleunities",
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
