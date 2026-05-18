import Link from "next/link";

export default function ModernWebsitesPage() {
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
            Services
          </span>
          <h1 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
            Modern<br />Websites.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-16">
            Your website is your digital storefront. We build blazingly fast, responsive, and SEO-optimized sites using Next.js and React that convert visitors into loyal customers.
          </p>

          <div className="space-y-16">
            <section className="border-t border-foreground/10 pt-12">
              <h2 className="text-2xl font-display text-foreground mb-6">Performance First</h2>
              <p className="text-muted-foreground leading-relaxed">
                A slow website costs you money. We build with edge computing, optimized assets, and pristine code to ensure sub-second load times. We aim for perfect Lighthouse scores every time.
              </p>
            </section>

            <section className="border-t border-foreground/10 pt-12">
              <h2 className="text-2xl font-display text-foreground mb-6">Design Systems</h2>
              <p className="text-muted-foreground leading-relaxed">
                No inconsistent gradients or mismatched fonts. We develop scalable design systems using Tailwind CSS that keep your brand cohesive across every single page.
              </p>
            </section>

            <section className="border-t border-foreground/10 pt-12">
              <h2 className="text-2xl font-display text-foreground mb-6">SEO & Scale</h2>
              <p className="text-muted-foreground leading-relaxed">
                Built on top of Next.js, our websites are server-side rendered by default. This means search engines can read your content perfectly, giving you an unmatched advantage in Google rankings.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}