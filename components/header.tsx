"use client"

import Link from "next/link"
import { Button } from "@/components/ui/3d-button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/components/language-provider"

function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage()
  return (
    <div className={`inline-flex items-center rounded-full border border-border bg-secondary/50 p-0.5 text-xs font-semibold ${className}`}>
      {(["en", "fr"] as const).map((code) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`rounded-full px-3 py-1 uppercase transition-colors ${
            lang === code ? "bg-[#6B21A8] text-white" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  )
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="relative flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/scaleunities-logo.png"
              alt="Scaleunities Logo"
              className="h-8 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <Link href="#services" className="text-sm text-foreground hover:text-accent transition-colors">
              {t.nav.services}
            </Link>
            <Link href="#process" className="text-sm text-foreground hover:text-accent transition-colors">
              {t.nav.process}
            </Link>
            <Link href="#testimonials" className="text-sm text-foreground hover:text-accent transition-colors">
              {t.nav.testimonials}
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <LangToggle />
            <Link href="/contact">
              <Button className="rounded-full px-6">{t.nav.getStarted}</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <LangToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border px-6 py-4 space-y-4">
          <Link
            href="#services"
            className="block text-foreground hover:text-accent"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t.nav.services}
          </Link>
          <Link
            href="#process"
            className="block text-foreground hover:text-accent"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t.nav.process}
          </Link>
          <Link
            href="#testimonials"
            className="block text-foreground hover:text-accent"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t.nav.testimonials}
          </Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
            <Button className="rounded-full w-full">{t.nav.getStarted}</Button>
          </Link>
        </div>
      )}
    </header>
  )
}
