"use client"

import { useRef, useEffect, useState } from "react"
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

function WebsiteCard({ src }: { src: string }) {
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
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={`h-full w-full object-cover object-top pt-6 transition-all duration-700 group-hover:scale-105 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  )
}

function AppCard({ src }: { src: string }) {
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
          onLoad={() => setIsLoaded(true)}
          className={`h-full w-full rounded-[1.6rem] object-cover object-center transition-all duration-700 group-hover:scale-105 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  )
}

// Custom Smooth JS Marquee
function SmoothMarquee({ 
  children, 
  direction = "left", 
  speed = 1 
}: { 
  children: React.ReactNode, 
  direction?: "left" | "right", 
  speed?: number 
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const hoverRef = useRef(false)
  const isDragging = useRef(false)
  const currentSpeed = useRef(speed)

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    let animationFrameId: number
    let lastTimestamp = performance.now()

    // Initialize position so right scroll doesn't snap instantly on load
    setTimeout(() => {
      if (direction === "right" && scroller) {
        scroller.scrollLeft = scroller.scrollWidth / 3
      }
    }, 100)

    const step = (timestamp: number) => {
      const deltaTime = timestamp - lastTimestamp
      lastTimestamp = timestamp

      // Target speed goes to 0 if hovered or manually dragging
      const targetSpeed = (hoverRef.current || isDragging.current) ? 0 : speed
      
      // Smooth deceleration/acceleration interpolation
      currentSpeed.current += (targetSpeed - currentSpeed.current) * 0.08

      // Apply scroll loop only if we aren't dragging and speed isn't effectively zero
      if (Math.abs(currentSpeed.current) > 0.05 && !isDragging.current) {
        const moveAmount = (currentSpeed.current * deltaTime) / 16
        const setWidth = scroller.scrollWidth / 3

        if (direction === "left") {
          scroller.scrollLeft += moveAmount
          if (scroller.scrollLeft >= setWidth) {
            scroller.scrollLeft -= setWidth // reset seamlessly
          }
        } else {
          scroller.scrollLeft -= moveAmount
          if (scroller.scrollLeft <= 0) {
            scroller.scrollLeft += setWidth // reset seamlessly
          }
        }
      }
      animationFrameId = requestAnimationFrame(step)
    }

    animationFrameId = requestAnimationFrame(step)

    return () => cancelAnimationFrame(animationFrameId)
  }, [direction, speed])

  return (
    <div
      ref={scrollerRef}
      className="flex overflow-x-auto no-scrollbar w-full snap-x snap-mandatory sm:snap-none"
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
      onTouchStart={() => { hoverRef.current = true; isDragging.current = true; }}
      onTouchEnd={() => { hoverRef.current = false; isDragging.current = false; }}
      onPointerDown={() => { isDragging.current = true; }}
      onPointerUp={() => { isDragging.current = false; }}
      onPointerLeave={() => { isDragging.current = false; }}
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <div className="flex w-max gap-6 px-4 pb-4">
        {/* We mount the children 3 times to ensure it loops smoothly without gaps */}
        <div className="flex gap-6">{children}</div>
        <div className="flex gap-6">{children}</div>
        <div className="flex gap-6">{children}</div>
      </div>
    </div>
  )
}

export function PortfolioShowcase() {
  const { t } = useLanguage()

  return (
    <section className="pt-4 pb-20 overflow-hidden" aria-label="Website and app templates showcase">
      
      {/* Websites row */}
      <div className="marquee-mask relative">
        <p className="container mx-auto mb-4 px-6 text-xs font-semibold uppercase tracking-widest text-[#6B21A8]">
          {t.marquee.websites}
        </p>
        <SmoothMarquee direction="left" speed={1.2}>
          {websiteShots.map((src, i) => (
            <WebsiteCard key={`web-${i}`} src={src} />
          ))}
        </SmoothMarquee>
      </div>

      {/* App templates row */}
      <div className="marquee-mask relative mt-10">
        <p className="container mx-auto mb-4 px-6 text-xs font-semibold uppercase tracking-widest text-[#6B21A8]">
          {t.marquee.apps}
        </p>
        <SmoothMarquee direction="right" speed={1.2}>
          {appShots.map((src, i) => (
            <AppCard key={`app-${i}`} src={src} />
          ))}
        </SmoothMarquee>
      </div>

    </section>
  )
}
