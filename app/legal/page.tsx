import Link from "next/link";

export default function LegalNotice() {
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
            Legal Notice
          </h1>
          <p className="text-sm font-mono text-muted-foreground mb-16">Last updated: January 2025</p>

          <div className="space-y-12 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">Company Identification</h2>
              <p>Scaleunities is an independent digital design and development studio. We operate as a freelance entity based in Tunis, Tunisia. For official invoicing or legal correspondence, please contact us directly to request our registration details.</p>
            </section>

            <section className="border-t border-foreground/10 pt-12">
              <h2 className="text-2xl font-display text-foreground mb-4">Liability Limitation</h2>
              <p>Scaleunities provides digital services &quot;as is&quot;. We are not liable for indirect, incidental, or consequential damages arising from the use of our delivered websites, apps, or digital products after final handover.</p>
            </section>

            <section className="border-t border-foreground/10 pt-12">
              <h2 className="text-2xl font-display text-foreground mb-4">Third-Party Services</h2>
              <p>Our projects may integrate third-party services (e.g., hosting providers, payment gateways). Scaleunities is not responsible for the terms, downtime, or data practices of these external platforms.</p>
            </section>

            <section className="border-t border-foreground/10 pt-12">
              <h2 className="text-2xl font-display text-foreground mb-4">Dispute Resolution</h2>
              <p>Any disputes arising from our services will first be addressed through good-faith negotiation. If unresolved, the matter will be handled under the jurisdiction of the courts in Tunis, Tunisia.</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}