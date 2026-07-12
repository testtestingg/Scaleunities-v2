"use client"

import Link from "next/link"
import { IconBrandLinkedin, IconBrandFacebook, IconBrandInstagram, IconMail, IconMapPin } from "@tabler/icons-react"
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
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/scaleunities-logo.png"
                alt="Scaleunities Logo"
                /* Increased height significantly, balanced by negative margin */
                className="h-20 w-auto object-contain -my-4 origin-left"
              />
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md">{t.footer.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#services" className="text-muted-foreground hover:text-accent transition-colors">
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link href="#process" className="text-muted-foreground hover:text-accent transition-colors">
                  {t.nav.process}
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-muted-foreground hover:text-accent transition-colors">
                  {t.nav.testimonials}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">{t.footer.contact}</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@scaleunities.com"
                  className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                >
                  <IconMail className="w-4 h-4" />
                  contact@scaleunities.com
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2 text-muted-foreground">
                  <IconMapPin className="w-4 h-4" />
                  {t.footer.location}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Scaleunities Team. {t.footer.rights}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label={link.name}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
