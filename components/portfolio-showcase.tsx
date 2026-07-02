"use client"

import { useLanguage } from "@/components/language-provider"

// Verified fallback screenshots (always load) — used if an Unsplash image fails.
const fallbackShots = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-6laqPMa8FuLJLGY15UqGeDduXqPTnL.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-2SM27flFV2PAGevb0yGPlw5a1VO0Uc.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-auovg1HaxuQFknmxHcpbfOBXQPjAWw.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-1SjePGsMFItZp8FKWs7dh9emmNImMD.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-mlczSZMqTq3CmnCXAs0oV6ITGeKdDV.png",
]

const U = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=70`

// Website / dashboard style visuals.
const websiteShots = [
  U("1467232004584-a241de8bcf5d"),
  U("1460925895917-afdab827c52f"),
  U("1498050108023-c5249f4df085"),
  U("1547658719-da2b51169166"),
  U("1517245386807-bb43f82c33c4"),
  U("1481487196290-c152efe083f5"),
]

// Mobile app style visuals.
const appShots = [
  U("1512941937669-90a1b58e7e9c"),
  U("1526498460520-4c246339dccb"),
  U("1580910051074-3eb694886505"),
  U("1551650975-87deedd944c3"),
  U("1607252650355-f7fd0460ccdb"),
]

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>, fallback: string) {
  const img = e.currentTarget
  if (img.dataset.fallback === "1") return
  img.dataset.fallback = "1"
  img.src = fallback
}

function WebsiteCard({ src, fallback }: { src: string; fallback: string }) {
  return (
    <div className="flex-shrink-0 w-[380px] md:w-[560px]">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5">
        <div className="absolute top-0 left-0 right-0 z-10 flex h-6 items-center gap-1.5 bg-neutral-100/90 px-3 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-yellow-400" />
          <span className="h-2 w-2 rounded-full bg-green-400" />
        </div>
        <img
          src={src}
          onError={(e) => handleImgError(e, fallback)}
          alt="Website template preview"
          loading="lazy"
          className="h-full w-full object-cover object-top pt-6"
        />
      </div>
    </div>
  )
}

function AppCard({ src, fallback }: { src: string; fallback: string }) {
  return (
    <div className="flex-shrink-0 w-[180px] md:w-[220px]">
      <div className="relative aspect-[9/19] overflow-hidden rounded-[2rem] border-[6px] border-neutral-900 bg-neutral-900 shadow-xl">
        <div className="absolute left-1/2 top-1 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-neutral-900" />
        <img
          src={src}
          onError={(e) => handleImgError(e, fallback)}
          alt="App template preview"
          loading="lazy"
          className="h-full w-full rounded-[1.6rem] object-cover object-center"
        />
      </div>
    </div>
  )
}

export function PortfolioShowcase() {
  const { t } = useLanguage()

  return (
    <section className="pt-4 pb-20 overflow-hidden" aria-label="Website and app templates showcase">
      {/* Websites row */}
      <div className="marquee-row marquee-mask relative">
        <p className="container mx-auto mb-4 px-6 text-xs font-semibold uppercase tracking-widest text-[#6B21A8]">
          {t.marquee.websites}
        </p>
        <div className="flex w-max gap-6 animate-marquee-left">
          {[...websiteShots, ...websiteShots].map((src, i) => (
            <WebsiteCard key={`web-${i}`} src={src} fallback={fallbackShots[i % fallbackShots.length]} />
          ))}
        </div>
      </div>

      {/* App templates row */}
      <div className="marquee-row marquee-mask relative mt-10">
        <p className="container mx-auto mb-4 px-6 text-xs font-semibold uppercase tracking-widest text-[#6B21A8]">
          {t.marquee.apps}
        </p>
        <div className="flex w-max gap-6 animate-marquee-right">
          {[...appShots, ...appShots, ...appShots].map((src, i) => (
            <AppCard key={`app-${i}`} src={src} fallback={fallbackShots[i % fallbackShots.length]} />
          ))}
        </div>
      </div>
    </section>
  )
}
