"use client"

import { useLanguage } from "@/components/language-provider"

export function ClientLogos() {
  const { t } = useLanguage()

  const logos = [
    { name: "MBS", src: "/MBS-WHITE-02.png" }, // Added new logo here
    { name: "Partner 1", src: "/whatsapp1.png" },
    { name: "Partner 2", src: "/whatsapp2.png" },
    { name: "Partner 3", src: "/whatsapp3.png" },
    { name: "Partner 4", src: "/whatsapp4.png" },
    { name: "Partner 5", src: "/whatsapp5.png" },
    { name: "Partner 6", src: "/whatsapp6.png" },
    { name: "Partner 7", src: "/whatsapp7.png" },
  ]

  return (
    <section id="partners" className="py-16 px-6 border-t border-border bg-background/50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="font-serif text-2xl md:text-3xl text-center mb-12 text-foreground/80 tracking-wide">
          {t.trustedBy}
        </h2>
        
        {/* Adjusted spacing and alignment */}
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 lg:gap-20">
          {logos.map((logo) => (
            <div 
              key={logo.name} 
              className="group flex items-center justify-center w-28 h-16 md:w-36 md:h-20 transition-transform duration-300 hover:scale-105"
            >
              <img 
                src={logo.src || "/placeholder.svg"} 
                alt={logo.name} 
                // Removed the global grayscale/heavy fade, moved to a clean per-item hover effect
                className="max-h-full max-w-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-sm" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
