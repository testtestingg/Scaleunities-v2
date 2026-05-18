import Link from "next/link";

export default function TermsOfService() {
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
            Terms of Service
          </h1>
          <p className="text-sm font-mono text-muted-foreground mb-16">Last updated: January 2025</p>

          <div className="space-y-12 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">1. Agreement to Terms</h2>
              <p>By accessing our services or website, you agree to be bound by these Terms. If you do not agree to these terms, please do not use our services.</p>
            </section>

            <section className="border-t border-foreground/10 pt-12">
              <h2 className="text-2xl font-display text-foreground mb-4">2. Project Scope & Deliverables</h2>
              <p>All project scopes, deliverables, and timelines will be explicitly defined in a separate Statement of Work (SOW) or proposal. These Terms govern the general relationship, while the SOW governs specific projects.</p>
            </section>

            <section className="border-t border-foreground/10 pt-12">
              <h2 className="text-2xl font-display text-foreground mb-4">3. Intellectual Property</h2>
              <p>Upon full payment, the client receives full ownership of the custom-built final deliverables. Scaleunities retains the right to showcase the work in our portfolio unless a specific NDA is signed.</p>
            </section>

            <section className="border-t border-foreground/10 pt-12">
              <h2 className="text-2xl font-display text-foreground mb-4">4. Payments & Refunds</h2>
              <p>Payment structures are defined per project. Deposits are non-refundable once work has commenced. Final deliverables are transferred upon receipt of the final invoice payment.</p>
            </section>

            <section className="border-t border-foreground/10 pt-12">
              <h2 className="text-2xl font-display text-foreground mb-4">5. Client Responsibilities</h2>
              <p>Clients agree to provide necessary assets, feedback, and content within agreed-upon timelines. Delays on the client&apos;s end may result in adjusted project delivery dates.</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}