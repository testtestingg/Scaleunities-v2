"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedSphere } from "./animated-sphere";

const words = ["elevate", "grow", "succeed", "scale"];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Animated sphere background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-150 h-150 lg:w-200 lg:h-200 opacity-40 pointer-events-none">
        <AnimatedSphere />
      </div>
      
      {/* Subtle grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-foreground/10"
            style={{
              top: `${12.5 * (i + 1)}%`,
              left: 0,
              right: 0,
            }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-foreground/10"
            style={{
              left: `${8.33 * (i + 1)}%`,
              top: 0,
              bottom: 0,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-350 mx-auto px-6 lg:px-12 py-32 lg:py-40">
        {/* Eyebrow */}
        <div 
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
            <span className="w-8 h-px bg-foreground/30" />
            IT Freelancer
          </span>
        </div>
        
        {/* Main headline */}
        <div className="mb-12">
          <h1 
            className={`text-[clamp(2rem,7vw,5.5rem)] font-display leading-[0.9] tracking-tight transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block">Elevate Your Brand.</span>
            <span className="block">
              Master the{" "}
              <span className="relative inline-block">
                <span 
                  key={wordIndex}
                  className="inline-flex"
                >
                  {words[wordIndex].split("").map((char, i) => (
                    <span
                      key={`${wordIndex}-${i}`}
                      className="inline-block animate-char-in"
                      style={{
                        animationDelay: `${i * 50}ms`,
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-foreground/10" />
              </span>
              {" "}Future
            </span>
          </h1>
        </div>
        
        {/* Description */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-end">
          <div>
            <p 
              className={`text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-350l transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Expert IT solutions tailored to your needs. I specialize in building modern websites, mobile apps, and custom digital solutions to help your business thrive.
            </p>
            
            {/* CTAs */}
            <div 
              className={`flex flex-col sm:flex-row items-start gap-4 transition-all duration-700 delay-300 mt-8 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Link href="/contact" prefetch={true}>
                <Button 
                  size="lg" 
                  className="bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base rounded-full group"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-8 text-base rounded-full border-foreground/20 hover:bg-foreground/5"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
        
      </div>
      
      {/* Stats marquee - full width outside container */}
      <div 
        className={`absolute bottom-6 left-0 right-0 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex gap-16 marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16">
              {[
                { value: "React & Next.js", label: "" },
                { value: "PostgreSQL", label: "" },
                { value: "AWS Cloud", label: "" },
                { value: "React Native", label: "" },
                { value: "Web3 & AI", label: "" },
                { value: "UI/UX Design", label: "" },
                { value: "Node.js", label: "" },
                { value: "Security", label: "" },
                { value: "Performance", label: "" },
              ].map((stat) => (
                <div key={`${stat.value}-${i}`} className="flex items-baseline gap-4">
                  <span className="text-2xl lg:text-3xl font-display whitespace-nowrap">{stat.value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Scroll indicator */}
      
    </section>
  );
}
