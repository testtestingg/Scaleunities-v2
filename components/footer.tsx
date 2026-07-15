"use client"

import Link from "next/link"
import { IconBrandLinkedin, IconBrandFacebook, IconBrandInstagram, IconMail, IconMapPin, IconBrandWhatsapp } from "@tabler/icons-react"
import { useLanguage } from "@/components/language-provider"

export function Footer() {
  const { t } = useLanguage()

  const socialLinks = [
    { name: "Facebook", href: "https://www.facebook.com/scaleunities/", icon: IconBrandFacebook },
    { name: "Instagram", href: "https://www.instagram.com/scaleunities/", icon: IconBrandInstagram },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/scaleunities/about/",
      icon: IconBrandLinkedin,
    },
  ]

  return (
    <footer className="bg-background border-t border-border" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/scaleunities-logo.png"
                alt="Scaleunities Logo"
                className="h-16 w-auto object-contain -my-2 origin-left"
              />
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm max-w-xs">{t.footer.tagline}</p>
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-[#6B21A8] hover:bg-[rgba(107,33,168,0.1)] transition-all"
                  aria-label={link.name}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">{t.footer.quickLinks}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-[#6B21A8] transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-muted-foreground hover:text-[#6B21A8] transition-colors">
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-sm text-muted-foreground hover:text-[#6B21A8] transition-colors">
                  {t.nav.portfolio}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-[#6B21A8] transition-colors">
                  {t.nav.blog}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">{t.footer.legal}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-[#6B21A8] transition-colors">
                  {t.footer.termsOfService}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-[#6B21A8] transition-colors">
                  {t.footer.privacyPolicy}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">{t.footer.contact}</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@scaleunities.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#6B21A8] transition-colors"
                >
                  <IconMail className="w-4 h-4 flex-shrink-0" />
                  contact@scaleunities.com
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <IconMapPin className="w-4 h-4 flex-shrink-0" />
                  {t.footer.location}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Scaleunities. {t.footer.rights}
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:text-[#6B21A8] transition-colors">
              {t.footer.termsOfService}
            </Link>
            <Link href="/privacy" className="hover:text-[#6B21A8] transition-colors">
              {t.footer.privacyPolicy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
