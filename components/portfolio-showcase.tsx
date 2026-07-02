"use client"

const websiteShots = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-6laqPMa8FuLJLGY15UqGeDduXqPTnL.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-2SM27flFV2PAGevb0yGPlw5a1VO0Uc.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-auovg1HaxuQFknmxHcpbfOBXQPjAWw.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-1SjePGsMFItZp8FKWs7dh9emmNImMD.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-mlczSZMqTq3CmnCXAs0oV6ITGeKdDV.png",
]

// App-template row reuses the same verified screenshots, presented in phone frames.
const appShots = [...websiteShots].reverse()

function WebsiteCard({ src }: { src: string }) {
  return (
    <div className="flex-shrink-0 w-[380px] md:w-[560px]">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5">
        {/* Browser chrome */}
        <div className="absolute top-0 left-0 right-0 z-10 flex h-6 items-center gap-1.5 bg-neutral-100/90 px-3 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-yellow-400" />
          <span className="h-2 w-2 rounded-full bg-green-400" />
        </div>
        <img src={src || "/placeholder.svg"} alt="Website template preview" className="h-full w-full object-cover object-top pt-6" />
      </div>
    </div>
  )
}

function AppCard({ src }: { src: string }) {
  return (
    <div className="flex-shrink-0 w-[180px] md:w-[220px]">
      <div className="relative aspect-[9/19] overflow-hidden rounded-[2rem] border-[6px] border-neutral-900 bg-neutral-900 shadow-xl">
        {/* Phone notch */}
        <div className="absolute left-1/2 top-1 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-neutral-900" />
        <img src={src || "/placeholder.svg"} alt="App template preview" className="h-full w-full rounded-[1.6rem] object-cover object-top" />
      </div>
    </div>
  )
}

export function PortfolioShowcase() {
  return (
    <section className="pt-4 pb-20 overflow-hidden" aria-label="Website and app templates showcase">
      {/* Websites row */}
      <div className="marquee-row marquee-mask relative">
        <p className="container mx-auto mb-4 px-6 text-xs font-semibold uppercase tracking-widest text-[#6B21A8]">
          Website Templates
        </p>
        <div className="flex w-max gap-6 animate-marquee-left">
          {[...websiteShots, ...websiteShots].map((src, i) => (
            <WebsiteCard key={`web-${i}`} src={src} />
          ))}
        </div>
      </div>

      {/* App templates row */}
      <div className="marquee-row marquee-mask relative mt-10">
        <p className="container mx-auto mb-4 px-6 text-xs font-semibold uppercase tracking-widest text-[#6B21A8]">
          App Templates
        </p>
        <div className="flex w-max gap-6 animate-marquee-right">
          {[...appShots, ...appShots, ...appShots, ...appShots].map((src, i) => (
            <AppCard key={`app-${i}`} src={src} />
          ))}
        </div>
      </div>
    </section>
  )
}
