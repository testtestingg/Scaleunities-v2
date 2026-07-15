"use client"

import { useLanguage } from "@/components/language-provider"

export function ClientLogos() {
  const { t } = useLanguage()

  const logos = [
    { name: "MBS", src: "/MBS-WHITE-02.png" },
    { name: "Partner 1", src: "/whatsapp1.png" },
    { name: "Partner 2", src: "/whatsapp2.png" },
    { name: "Partner 3", src: "/whatsapp3.png" },
    { name: "Partner 4", src: "/whatsapp4.png" },
    { name: "Partner 5", src: "/whatsapp5.png" },
    { name: "Partner 6", src: "/whatsapp6.png" },
    { name: "Partner 7", src: "/whatsapp7.png" },
  ]

  return (
    <section id="partners" className="py-16 px-6 border-t border-border">
      <div className="container mx-auto max-w-7xl">
        <h2 className="font-serif text-2xl md:text-3xl text-center mb-16 text-foreground/70">
          {t.trustedBy}
        </h2>
        
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-16 md:gap-x-20 lg:gap-x-24">
          {logos.map((logo) => (
            <img 
              key={logo.name}
              src={logo.src || "/placeholder.svg"} 
              alt={logo.name} 
              className="h-16 md:h-24 lg:h-28 w-auto object-contain opacity-50 cursor-pointer transition-all duration-500 ease-out hover:opacity-100 hover:scale-110 hover:-translate-y-2" 
            />
          ))}
        </div>
      </div>
    </section>
  )
}
