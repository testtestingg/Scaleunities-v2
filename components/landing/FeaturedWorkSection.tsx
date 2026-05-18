"use client";

import { useEffect, useRef, useState } from "react";

// --- Built-in Lazy Video Component ---
function LazyVideo(props: React.ComponentProps<"video">) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!isInView) {
    return (
      <div 
        ref={containerRef} 
        className={`${props.className || ""} bg-black`} 
      />
    );
  }

  return <video preload="metadata" {...props} />;
}

// --- Main Section Component ---
const portfolioItem = {
  title: "Enterprise Dashboard Redesign",
  quote:
    "Scaleunities completely transformed our internal tools. The new dashboard is blazingly fast and intuitively designed, saving our team hours every week.",
  author: "Fatima Khelil",
  role: "Operations Director",
  company: "TechFlow Systems",
  metric: "3x Faster Workflows",
  videoUrl: "/video1.mov",
};

export function FeaturedWorkSection() {
  return (
    <section id="templates" className="relative py-32 overflow-hidden bg-foreground/2">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-linear-to-r from-transparent via-foreground/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12 justify-between items-end mb-16">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Featured Product Design
            </span>
            <h2 className="text-4xl lg:text-5xl font-display tracking-tight text-foreground mb-6">
              {portfolioItem.title}
            </h2>
            <blockquote className="text-xl text-muted-foreground leading-relaxed border-l-2 border-foreground/20 pl-6">
              &ldquo;{portfolioItem.quote}&rdquo;
            </blockquote>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="w-14 h-14 rounded-full bg-foreground/10 border border-foreground/20 flex items-center justify-center">
              <span className="font-display text-xl text-foreground">
                {portfolioItem.author.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-medium text-foreground">{portfolioItem.author}</p>
              <p className="text-sm text-muted-foreground">
                {portfolioItem.role}, {portfolioItem.company}
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-8 lg:mt-12">
          <div className="w-full rounded-xl overflow-hidden border border-foreground/20 bg-background shadow-2xl ring-1 ring-foreground/5">
            <div className="h-10 border-b border-foreground/10 bg-foreground/3 flex items-center px-4 gap-2 relative">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 px-4 py-1 rounded-md bg-background border border-foreground/10 text-[10px] font-mono text-muted-foreground items-center gap-2 hidden sm:flex">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                liwan.com.kw
              </div>
            </div>

            <LazyVideo
              src={portfolioItem.videoUrl}
              className="w-full aspect-video bg-black"
              autoPlay={false}
              muted={true}
              loop={true}
              playsInline={true}
            />
          </div>

          <div className="absolute -bottom-6 -right-2 lg:-right-8 p-6 lg:p-8 rounded-xl border border-foreground/20 bg-background/80 backdrop-blur-md shadow-xl max-w-62.5 lg:max-w-xs">
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-2">
              Key Result
            </span>
            <p className="font-display text-2xl lg:text-3xl text-foreground">
              {portfolioItem.metric}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}