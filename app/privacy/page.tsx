import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-350 mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-16 group">
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          Back to Home
        </Link>

        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Legal
          </span>
          <h1 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
            Privacy Policy
          </h1>
          <p className="text-sm font-mono text-muted-foreground mb-16">Last updated: January 2025</p>

          <div className="space-y-12 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">1. Information We Collect</h2>
              <p>We believe in minimal data collection. We only gather what is strictly necessary to deliver our services—your name, email, and project details. We do not harvest personal data silently.</p>
            </section>

            <section className="border-t border-foreground/10 pt-12">
              <h2 className="text-2xl font-display text-foreground mb-4">2. How We Use Your Data</h2>
              <p>Your data is used exclusively to communicate about your project, send invoices, and improve our services. We never sell, rent, or share your personal information with third-party marketers.</p>
            </section>

            <section className="border-t border-foreground/10 pt-12">
              <h2 className="text-2xl font-display text-foreground mb-4">3. Cookies & Analytics</h2>
              <p>We use minimal, privacy-respecting analytics to understand how our website performs. We avoid invasive tracking cookies and do not participate in cross-site tracking.</p>
            </section>

            <section className="border-t border-foreground/10 pt-12">
              <h2 className="text-2xl font-display text-foreground mb-4">4. Data Security</h2>
              <p>We implement industry-standard security protocols to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
            </section>

            <section className="border-t border-foreground/10 pt-12">
              <h2 className="text-2xl font-display text-foreground mb-4">5. Contact</h2>
              <p>If you have questions about this policy, reach out at <a href="mailto:hello@techytak.com" className="text-foreground hover:underline">hello@techytak.com</a>.</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}