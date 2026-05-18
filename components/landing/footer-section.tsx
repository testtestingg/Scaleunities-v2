"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatedWave } from "./animated-wave";

const footerLinks = {
  Services: [
    { name: "Services", href: "#services", isHeading: true },
    { name: "Modern Websites", href: "/modern-websites" },
    { name: "Mobile Apps", href: "/mobile-apps" },
    { name: "Custom Solutions", href: "#process" },
  ],
  Company: [
    { name: "Company", href: "/company", isHeading: true },
    { name: "About", href: "#" },              
    { name: "Projects", href: "#portfolio" },   // Now points to Portfolio
    { name: "Partners", href: "#partners" },
  ],
  Legal: [
    { name: "Legal", href: "/legal", isHeading: true },
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Contact", href: "/contact" }, 
  ],
};

const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/scaleunities/" },
  { name: "Instagram", href: "https://www.instagram.com/scaleunities/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/scaleunities/about/" },
];

export function FooterSection() {
  return (
    <footer className="relative border-t border-foreground/10">
      <div className="absolute inset-0 h-64 opacity-20 pointer-events-none overflow-hidden">
        <AnimatedWave />
      </div>
      
      <div className="relative z-10 max-w-350 mx-auto px-6 lg:px-12">
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            <div className="col-span-2">
              <a href="#" className="inline-flex items-center gap-2 mb-6">
                <img 
                  src="https://i.ibb.co/fVNXP5mS/Techytak-logo.png" 
                  alt="Scaleunities Logo" 
                  className="h-10 w-auto object-contain"
                />
              </a>

              <p className="text-muted-foreground leading-relaxed mb-8 max-w-xs">
                Talented team of digital professionals crafting exceptional digital solutions for your business.
              </p>

              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className={`inline-flex items-center gap-2 transition-colors ${
                          "isHeading" in link 
                            ? "text-sm font-medium text-foreground" 
                            : "text-sm text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="py-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Scaleunities Team. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              📍 Tunis, Tunisia
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}