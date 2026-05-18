import Link from "next/link";

export default function CompanyPage() {
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
            Who we are
          </span>
          <h1 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
            A Digital<br />Craft Studio.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-16">
            Scaleunities isn&apos;t just an agency; we are a collective of elite designers, engineers, and strategists based in Tunis. We don&apos;t just build websites—we engineer digital experiences that drive growth.
          </p>

          <div className="space-y-16">
            <section className="border-t border-foreground/10 pt-12">
              <h2 className="text-2xl font-display text-foreground mb-6">Our Philosophy</h2>
              <p className="text-muted-foreground leading-relaxed">
                In a world of templates and drag-and-drop builders, we believe in the power of custom craftsmanship. Every pixel, every line of code, and every interaction is meticulously designed to serve a specific business purpose. We blend minimalist aesthetics with brutalist performance.
              </p>
            </section>

            <section className="border-t border-foreground/10 pt-12">
              <h2 className="text-2xl font-display text-foreground mb-6">The Numbers</h2>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-4xl font-display text-foreground mb-2">5+</p>
                  <p className="text-sm font-mono text-muted-foreground uppercase tracking-wide">Years of Excellence</p>
                </div>
                <div>
                  <p className="text-4xl font-display text-foreground mb-2">50+</p>
                  <p className="text-sm font-mono text-muted-foreground uppercase tracking-wide">Projects Delivered</p>
                </div>
                <div>
                  <p className="text-4xl font-display text-foreground mb-2">100%</p>
                  <p className="text-sm font-mono text-muted-foreground uppercase tracking-wide">Client Satisfaction</p>
                </div>
                <div>
                  <p className="text-4xl font-display text-foreground mb-2">24/7</p>
                  <p className="text-sm font-mono text-muted-foreground uppercase tracking-wide">Dedicated Support</p>
                </div>
              </div>
            </section>

            <section className="border-t border-foreground/10 pt-12">
              <h2 className="text-2xl font-display text-foreground mb-6">Our Location</h2>
              <p className="text-muted-foreground leading-relaxed">
                Proudly operating from Tunis, Tunisia. We leverage global talent and local precision to deliver world-class infrastructure at competitive speeds.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}