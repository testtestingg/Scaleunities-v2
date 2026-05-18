import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { InfrastructureSection } from "@/components/landing/infrastructure-section";
import { MetricsSection } from "@/components/landing/metrics-section";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { SecuritySection } from "@/components/landing/security-section";
import { DevelopersSection } from "@/components/landing/developers-section";
import dynamic from "next/dynamic";
import { TrustedCompaniesSection } from "@/components/landing/trusted-companies-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";
import { PageClient } from "./page-client";
import { TeamSection } from "@/components/landing/team-section";
import { TrustedBySection } from "@/components/landing/trusted-by-section"; // <-- ADDED

// Dynamically import heavy components for better initial load
const FeaturedWorkSection = dynamic(() => import("@/components/landing/FeaturedWorkSection").then(mod => ({ default: mod.FeaturedWorkSection })), {
  loading: () => <div className="h-96 bg-foreground/5 rounded-lg animate-pulse" />,
  ssr: true
});

export default function Home() {
  return (
    <PageClient>
      <main className="relative min-h-screen overflow-x-hidden noise-overlay" role="main">
        <Navigation />
        <HeroSection />
        <section>
          <TeamSection />
        </section>
        <section>
          <FeaturesSection />
        </section>
        <section>
          <HowItWorksSection />
        </section>
        <section>
          <TrustedCompaniesSection />
        </section>
        <section>
          <InfrastructureSection />
        </section>
        <section>
          <MetricsSection />
        </section>
        <section>
          <IntegrationsSection />
        </section>
        <section>
          <SecuritySection />
        </section>
        <section>
          <DevelopersSection />
        </section>
        <section>
          <FeaturedWorkSection />
        </section>
        
        {/* ADDED NEW TRUSTED BY SECTION HERE */}
        <TrustedBySection />

        <section>
          <CtaSection />
        </section>
        <FooterSection />
      </main>
    </PageClient>
  );
}