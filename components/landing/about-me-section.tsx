"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function AboutMeSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-350 mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left side - Image */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              {/* Profile image */}
              <img 
                src="https://i.ibb.co/HTp6GWtT/amirdridi.png"
                alt="Amir Dridi"
                className="w-full h-full object-cover"
              />

              {/* Decorative border animation */}
              <div className="absolute inset-0 border border-foreground/20 rounded-2xl" />
              <div
                className="absolute inset-0 rounded-2xl border border-foreground/10 opacity-0 animate-pulse"
                style={{ animation: "pulse 3s ease-in-out infinite" }}
              />
            </div>

            {/* Floating card */}
            <div
              className="absolute -bottom-6 -right-6 bg-background border border-foreground/10 rounded-xl p-6 shadow-lg backdrop-blur-sm"
              style={{
                animation: "float 3s ease-in-out infinite",
              }}
            >
              <div className="text-center">
                <p className="text-3xl font-display">5+</p>
                <p className="text-sm text-muted-foreground mt-1">Years Experience</p>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="mb-8">
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
                <span className="w-8 h-px bg-foreground/30" />
                About Me
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-display tracking-tight mb-8 leading-[1.1]">
              Hi, I'm Amir Dridi
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              I'm an IT freelancer with a passion for building exceptional digital products. With over 5 years of experience in web and mobile development, I've helped businesses of all sizes transform their digital presence and achieve their goals.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              My expertise spans modern web technologies, cloud infrastructure, and user-centric design. I specialize in creating scalable, performant solutions that not only look beautiful but deliver real business value.
            </p>

            {/* Skills Grid */}
            <div className="mb-12 pt-8 border-t border-foreground/10">
              <h3 className="text-sm font-mono text-muted-foreground mb-6 uppercase tracking-wide">Core Expertise</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "React & Next.js",
                  "Mobile Development",
                  "UI/UX Design",
                  "Cloud & DevOps",
                  "Full-Stack Solutions",
                  "Web Performance",
                ].map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-3 p-3 rounded-lg border border-foreground/10 hover:border-foreground/20 transition-colors group"
                  >
                    <span className="text-foreground/40 group-hover:text-foreground/60 transition-colors">✓</span>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-8 border-t border-foreground/10">
              <p className="text-muted-foreground mb-6">
                Ready to work together on your next project?
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-foreground/20 hover:border-foreground hover:bg-foreground/5 transition-all group"
              >
                <span className="text-sm font-medium">Get in Touch</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </section>
  );
}