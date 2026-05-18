"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    description: "Perfect for small projects",
    price: { monthly: 200, annual: 200 },
    features: [
      "Responsive Website",
      "Basic SEO",
      "Mobile Friendly",
      "Contact Form",
    ],
    cta: "Contact Us",
    popular: false,
  },
  {
    name: "Professional",
    description: "For growing businesses",
    price: { monthly: 800, annual: 800 },
    features: [
      "Advanced Website",
      "Premium SEO",
      "Content Management",
      "Analytics Integration",
      "E-commerce Ready",
      "Team Collaboration",
    ],
    cta: "Contact Us",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large-scale solutions",
    price: { monthly: 1500, annual: 1500 },
    features: [
      "Custom Solution",
      "Advanced SEO",
      "Mobile App",
      "Full Integration",
      "24/7 Support",
      "Custom Features",
      "Dedicated Team",
    ],
    cta: "Contact Us",
    popular: false,
  },
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="relative py-32 lg:py-40 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-6">
            Pricing
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground mb-6">
            Pricing
            <br />
            <span className="text-stroke">Plans</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-350l">
            Professional solutions at affordable prices. Choose the perfect plan for your business.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center gap-4 mb-16">
          <span
            className={`text-sm transition-colors ${
              !isAnnual ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            TND
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-px bg-foreground/10">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`relative p-8 lg:p-12 bg-background ${
                plan.popular ? "md:-my-4 md:py-12 lg:py-16 border-2 border-foreground" : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-8 px-3 py-1 bg-foreground text-primary-foreground text-xs font-mono uppercase tracking-widest">
                  Most Popular
                </span>
              )}

              {/* Plan Header */}
              <div className="mb-8">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-3xl text-foreground mt-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-8 pb-8 border-b border-foreground/10">
                {plan.price.monthly !== null ? (
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-5xl lg:text-6xl text-foreground">
                      {plan.price.monthly}
                    </span>
                    <span className="text-muted-foreground">TND</span>
                  </div>
                ) : (
                  <span className="font-display text-4xl text-foreground">Custom</span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-foreground mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full py-4 flex items-center justify-center gap-2 text-sm font-medium transition-all group ${
                  plan.popular
                    ? "bg-foreground text-primary-foreground hover:bg-foreground/90"
                    : "border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="mt-12 text-center text-sm text-muted-foreground">
          All prices in TND (Tunisian Dinar). Custom quotes available for enterprise solutions.{" "}
          <a href="#" className="underline underline-offset-4 hover:text-foreground transition-colors">
            Contact us
          </a>
        </p>
      </div>
    </section>
  );
}
