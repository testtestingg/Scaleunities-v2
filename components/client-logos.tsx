"use client"

import { useLanguage } from "@/components/language-provider"

export function ClientLogos() {
  const { t } = useLanguage()

  const logos = [
    { name: "Partner 1", src: "/whatsapp1.png" },
    { name: "Partner 2", src: "/whatsapp2.png" },
    { name: "Partner 3", src: "/whatsapp3.png" },
    { name: "Partner 4", src: "/whatsapp4.png" },
    { name: "Partner 5", src: "/whatsapp5.png" },
    { name: "Partner 6", src: "/whatsapp6.png" },
    { name: "Partner 7", src: "/whatsapp7.png" },
  ]

  return (
    <section id="partners" className="py-12 px-6 border-t border-border">
      <div className="container mx-auto">
        <h2 className="font-serif text-2xl md:text-3xl text-center mb-8 text-foreground/60">{t.trustedBy}</h2>
        <div className="flex items-center justify-center gap-10 md:gap-14 flex-wrap opacity-40 grayscale hover:grayscale-0 transition-all duration-300">
          {logos.map((logo) => (
            <div key={logo.name} className="flex items-center justify-center h-24 w-24 md:h-28 md:w-28">
              <img src={logo.src || "/placeholder.svg"} alt={logo.name} className="max-h-full max-w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
