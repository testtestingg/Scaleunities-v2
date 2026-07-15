"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"

// Website / dashboard style image links
const websiteShots = [
  "https://i.ibb.co/N2dSjjJ2/Screenshot202026-02-0420201202-kf-DAre90tlz-I1-E54xszim-ZFPcm-J4k-G-1.avif",
  "https://i.ibb.co/RTByDdRx/Capture20d-E28099e-CC81cran202025-12-2720a-CC802018.avif",
  "https://i.ibb.co/BMXmbVy/ezgif-233ce88138c14d32-OW7-FSn-Hs-Lm-VYKw-W7d-EJxk2-O1p-F8-J08.webp",
  "https://i.ibb.co/zhSNSwsR/Capture20d-E28099e-CC81cran202026-02-1420a-CC802022.avif",
  "https://i.ibb.co/k2Bk8sDy/Capture20d-E28099e-CC81cran202026-01-1420a-CC802020.avif",
  "https://i.ibb.co/N6yMrPHs/dpl-2v13bh-ZJi-GUn-Bx-WUhvm-Whuuj-GDdt-Ie4-HD2-Rr7khza-Cw-QPUYXjk-PVg1p-BSS.avif",
  "https://i.ibb.co/ycqqwMGv/Screenshot202025-09-0720at2013.avif",
  "https://i.ibb.co/8T2yGsn/Screenshot202025-12-2920161543-n-XRo-Vr-Ot-DXTElk0t-Nn-Nvs2tub-P8e5-E.avif",
  "https://i.ibb.co/j96gyHwz/Screenshot-2026-05-17-at-5.avif",
  "https://i.ibb.co/twjJ79b2/Screenshot-2026-01-17-at-11.avif",
]

// Mobile app style image links
const appShots = [
  "https://i.ibb.co/0Vskkjh9/Screenshot-2026-07-02-at-6-20-10-PM.png",
  "https://i.ibb.co/tTPdQC43/Screenshot-2026-07-02-at-6-21-16-PM.png",
  "https://i.ibb.co/0VJSS1fS/Screenshot-2026-07-02-at-6-22-08-PM.png",
  "https://i.ibb.co/fGxqKNnx/Screenshot-2026-07-02-at-6-24-40-PM.png",
  "https://i.ibb.co/DgYbZNFG/Screenshot-2026-07-02-at-6-32-37-PM.png",
]

function WebsiteCard({ src, priority = false }: { src: string; priority?: boolean }) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="flex-shrink-0 w-[85vw] sm:w-[380px] md:w-[560px] snap-center">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5 group bg-neutral-200 dark:bg-neutral-800">
        
        {/* Loading Skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 animate-pulse bg-neutral-300 dark:bg-neutral-700" />
        )}

        <div className="absolute top-0 left-0 right-0 z-10 flex h-6 items-center gap-1.5 bg-neutral-100/90 px-3 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-yellow-400" />
          <span className="h-2 w-2 rounded-full bg-green-400" />
        </div>
        
        <img
          src={src}
          alt="Website template preview"
          /* Intentionally omitted loading="lazy" so animations don't break loading */
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          onLoad={() => setIsLoaded(true)}
          className={`h-full w-full object-cover object-top pt-6 transition-all duration-700 md:group-hover:scale-105 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  )
}

function AppCard({ src, priority = false }: { src: string; priority?: boolean }) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="flex-shrink-0 w-[55vw] sm:w-[180px] md:w-[220px] snap-center">
      <div className="relative aspect-[9/19] overflow-hidden rounded-[2rem] border-[6px] border-neutral-900 bg-neutral-900 shadow-xl group">
        
        {/* Loading Skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 animate-pulse bg-neutral-800" />
        )}

        <div className="absolute left-1/2 top-1 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-neutral-900" />
        
        <img
          src={src}
          alt="App template preview"
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          onLoad={() => setIsLoaded(true)}
          className={`h-full w-full rounded-[1.6rem] object-cover object-center transition-all duration-700 md:group-hover:scale-105 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  )
}

export function PortfolioShowcase() {
  const { t } = useLanguage()

  return (
    <section className="pt-4 pb-20 overflow-hidden" aria-label="Website and app templates showcase">
      
      {/* Websites Row */}
      <div className="marquee-row marquee-mask relative w-full overflow-x-auto md:overflow-hidden snap-x snap-mandatory no-scrollbar pb-6 md:pb-0">
        <p className="container mx-auto mb-4 px-6 text-xs font-semibold uppercase tracking-widest text-[#6B21A8]">
          {t.marquee.websites}
        </p>
        {/* Mobile: Flex scroll | Desktop: CSS Marquee */}
        <div className="flex w-max gap-6 px-6 md:animate-marquee-left">
          {[...websiteShots, ...websiteShots].map((src, i) => (
            <WebsiteCard key={`web-${i}`} src={src} priority={i < 2} />
          ))}
        </div>
      </div>

      {/* Apps Row */}
      <div className="marquee-row marquee-mask relative mt-10 w-full overflow-x-auto md:overflow-hidden snap-x snap-mandatory no-scrollbar pb-6 md:pb-0">
        <p className="container mx-auto mb-4 px-6 text-xs font-semibold uppercase tracking-widest text-[#6B21A8]">
          {t.marquee.apps}
        </p>
        {/* Mobile: Flex scroll | Desktop: CSS Marquee */}
        <div className="flex w-max gap-6 px-6 md:animate-marquee-right">
          {[...appShots, ...appShots, ...appShots].map((src, i) => (
            <AppCard key={`app-${i}`} src={src} priority={i < 3} />
          ))}
        </div>
      </div>

    </section>
  )
}
