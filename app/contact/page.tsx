import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { ArrowUpRight, Mail, MapPin, MessageCircle } from "lucide-react";

const socialLinks = [
  { 
    name: "Facebook", 
    href: "https://www.facebook.com/scaleunities/",
    handle: "@scaleunities"
  },
  { 
    name: "Instagram", 
    href: "https://www.instagram.com/scaleunities",
    handle: "@scaleunities"
  },
  { 
    name: "LinkedIn", 
    href: "https://www.linkedin.com/company/scaleunities/",
    handle: "Scaleunities"
  },
  { 
    name: "Messenger", 
    href: "https://m.me/Scaleunities",
    handle: "Scaleunities"
  },
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "contact.scaleunities@gmail.com",
    href: "mailto:contact.scaleunities@gmail.com",
    description: "For project inquiries and collaborations"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Tunis, Tunisia",
    href: null,
    description: "Available for remote work worldwide"
  },
  {
    icon: MessageCircle,
    label: "Messenger",
    value: "Scaleunities",
    href: "https://m.me/Scaleunities",
    description: "Quick questions? Chat with us directly"
  },
];

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay" role="main">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="max-w-350 mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-8xl font-display tracking-tight mb-6 leading-[0.95]">
              Let&apos;s talk
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-350l">
              Have a project in mind? We&apos;d love to hear about it. Reach out through any of the channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-350 mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="border border-foreground/10 rounded-2xl p-8 lg:p-10 hover:border-foreground/20 transition-colors"
              >
                <div className="flex flex-col gap-5">
                  <div className="p-3 bg-foreground/5 rounded-xl w-fit">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      {item.label}
                    </h3>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-xl font-display hover:underline underline-offset-4 inline-flex items-center gap-2"
                      >
                        {item.value}
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    ) : (
                      <p className="text-xl font-display">
                        {item.value}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground mt-3">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-350 mx-auto px-6 lg:px-12">
          <div className="border border-foreground/10 rounded-2xl p-8 lg:p-12">
            <h2 className="text-2xl lg:text-3xl font-display mb-2">Follow Us</h2>
            <p className="text-muted-foreground mb-10 max-w-md">
              Stay updated with our latest projects and insights on social media.
            </p>
            
            <div className="space-y-0">
              {socialLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between py-6 group hover:px-4 transition-all duration-300 ${
                    index < socialLinks.length - 1 ? "border-b border-foreground/10" : ""
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <span className="text-sm text-muted-foreground w-24">
                      {link.name}
                    </span>
                    <span className="text-lg font-display group-hover:translate-x-2 transition-transform duration-300">
                      {link.handle}
                    </span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-350 mx-auto px-6 lg:px-12">
          <div className="bg-foreground text-background rounded-2xl p-8 lg:p-16 text-center">
            <h2 className="text-3xl lg:text-5xl font-display tracking-tight mb-4">
              Ready to start?
            </h2>
            <p className="text-lg text-background/70 mb-8 max-w-lg mx-auto">
              Send us an email and we&apos;ll get back to you within 24 hours.
            </p>
            <a
              href="mailto:contact.scaleunities@gmail.com"
              className="inline-flex items-center gap-2 bg-background text-foreground px-8 h-14 text-base rounded-full hover:bg-background/90 transition-colors"
            >
              Send Email
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}