import Link from "next/link";

export default function MobileAppsPage() {
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
            Mobile<br />Applications.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-16">
            Put your business in your users&apos; pockets. We craft native-feeling, cross-platform mobile applications using React Native that perform flawlessly on both iOS and Android.
          </p>

          <div className="space-y-16">
            <section className="border-t border-foreground/10 pt-12">
              <h2 className="text-2xl font-display text-foreground mb-6">Cross-Platform Power</h2>
              <p className="text-muted-foreground leading-relaxed">
                Why build twice? We utilize React Native to write a single codebase that deploys natively to both Apple and Android stores, cutting development time in half without sacrificing quality.
              </p>
            </section>

            <section className="border-t border-foreground/10 pt-12">
              <h2 className="text-2xl font-display text-foreground mb-6">Fluid Interactions</h2>
              <p className="text-muted-foreground leading-relaxed">
                Mobile apps should feel like an extension of the user's hand. We implement smooth animations, haptic feedback, and intuitive gesture-based navigation that users love.
              </p>
            </section>

            <section className="border-t border-foreground/10 pt-12">
              <h2 className="text-2xl font-display text-foreground mb-6">Backend Integration</h2>
              <p className="text-muted-foreground leading-relaxed">
                A beautiful app needs a powerful brain. We connect your mobile apps to robust cloud backends, real-time databases, and secure authentication systems.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}