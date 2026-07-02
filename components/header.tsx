"use client"

import Link from "next/link"
import { Button } from "@/components/ui/3d-button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="relative flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-semibold">
            <img
              src="https://i.ibb.co/fVNXP5mS/Techytak-logo.png"
              alt="Scaleunities Logo"
              className="h-8 w-auto"
            />
            <span className="font-serif">Scaleunities</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <Link href="#services" className="text-sm text-foreground hover:text-accent transition-colors">
              Services
            </Link>
            <Link href="#process" className="text-sm text-foreground hover:text-accent transition-colors">
              Process
            </Link>
            <Link href="#pricing" className="text-sm text-foreground hover:text-accent transition-colors">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm text-foreground hover:text-accent transition-colors">
              Testimonials
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link href="/contact">
              <Button className="rounded-full px-6">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
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
            Services
          </Link>
          <Link
            href="#process"
            className="block text-foreground hover:text-accent"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Process
          </Link>
          <Link
            href="#pricing"
            className="block text-foreground hover:text-accent"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="#testimonials"
            className="block text-foreground hover:text-accent"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Testimonials
          </Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
            <Button className="rounded-full w-full">Get Started</Button>
          </Link>
        </div>
      )}
    </header>
  )
}
