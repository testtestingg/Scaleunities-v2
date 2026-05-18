import React from "react"
import type { Metadata, Viewport } from 'next'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script' // 1. Import Next.js Script component
import './globals.css'

const instrumentSans = Instrument_Sans({ 
  subsets: ["latin"],
  variable: '--font-instrument'
});

const instrumentSerif = Instrument_Serif({ 
  subsets: ["latin"],
  weight: "400",
  variable: '--font-instrument-serif'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains'
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 5.0,
  themeColor: '#000000',
}

export const metadata: Metadata = {
  title: 'Digital Solutions Team | Fullstack Dev, Frontend Designer, Manager & Designer',
  description: 'A talented team of 4 professionals: Amir Dridi (Fullstack Developer), Ranim Mourad (Frontend Developer & UI Designer), Ali Ben Said (Manager), and Houssem Ben Cheikh (Designer). We deliver exceptional digital solutions.',
  generator: 'v0.app',
  keywords: 'web development, mobile apps, fullstack developer, frontend designer, UI designer, project manager, digital solutions, Tunisia',
  authors: [{ name: 'Scaleunities Team' }],
  creator: 'Scaleunities',
  publisher: 'Scaleunities',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://scaleunities.com',
    siteName: 'Scaleunities',
    title: 'Digital Solutions Team | Fullstack Dev, Frontend Designer, Manager & Designer',
    description: 'A talented team of 4 professionals delivering exceptional digital solutions.',
    images: [
      {
        url: 'https://i.ibb.co/fVNXP5mS/Techytak-logo.png',
        width: 1200,
        height: 630,
        alt: 'Scaleunities Team',
        type: 'image/png',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Solutions Team | Scaleunities',
    description: 'A talented team delivering exceptional digital solutions.',
    images: ['https://i.ibb.co/fVNXP5mS/Techytak-logo.png'],
  },
  applicationName: 'Scaleunities',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // 2. Add suppressHydrationWarning to html
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <link rel="canonical" href="https://scaleunities.com" />
      </head>
      {/* Facebook Pixel Meta Pixel Code */}
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
      {/* End Facebook Pixel Meta Pixel Code */}
      {/* 3. Add suppressHydrationWarning to body */}
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`} suppressHydrationWarning>
        {/* Facebook Pixel noscript fallback */}
        <noscript>
          <img height="1" width="1" style={{display:'none'}} src="https://www.facebook.com/tr?id=1825468495013391&ev=PageView&noscript=1" />
        </noscript>
        {/* End Facebook Pixel noscript fallback */}
        {children}
        <Analytics />
        <div 
          className="gtranslate_wrapper" 
          style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 999 }}
        ></div>

        {/* 4. Use Next.js Script for settings */}
        <Script id="gtranslate-settings" strategy="beforeInteractive">
          {`
            window.gtranslateSettings = {
              default_language: "en",
              detect_browser_language: true,
              wrapper_selector: ".gtranslate_wrapper",
              flag_style: "3d"
            }
          `}
        </Script>

        {/* 5. Use Next.js Script for the external script */}
        <Script 
          src="//cdn.gtranslate.net/widgets/latest/float.js" 
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
