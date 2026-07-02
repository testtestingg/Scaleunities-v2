"use client"

import { useLanguage } from "@/components/language-provider"

// Website / dashboard style image links
const websiteShots = [
  "https://static.vecteezy.com/system/resources/thumbnails/001/183/471/small_2x/online-shopping-website-templates-for-food-delivery.jpg",
  "https://static.vecteezy.com/system/resources/thumbnails/004/725/571/small_2x/team-developer-work-for-website-development-for-website-template-or-landing-homepage-free-vector.jpg",
  "https://static.vecteezy.com/system/resources/thumbnails/001/183/473/small_2x/online-shopping-website-template-with-laptop.jpg",
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

function WebsiteCard({ src }: { src: string }) {
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
          alt="Website template preview"
          loading="lazy"
          className="h-full w-full object-cover object-top pt-6"
        />
      </div>
    </div>
  )
}

function AppCard({ src }: { src: string }) {
  return (
    <div className="flex-shrink-0 w-[180px] md:w-[220px]">
      <div className="relative aspect-[9/19] overflow-hidden rounded-[2rem] border-[6px] border-neutral-900 bg-neutral-900 shadow-xl">
        <div className="absolute left-1/2 top-1 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-neutral-900" />
        <img
          src={src}
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
            <WebsiteCard key={`web-${i}`} src={src} />
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
            <AppCard key={`app-${i}`} src={src} />
          ))}
        </div>
      </div>
    </section>
  )
}
