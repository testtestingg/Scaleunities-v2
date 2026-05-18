"use client";
   
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Templates data with video sources
const templates = [ 
  {
    id: 1,
    name: "E-commerce Pro",
    description: "Clean and minimalist E-commerce template",
    videoUrl: "/video2.mov",
  },
  {
    id: 2,
    name: "Elegant Showcase Template for Brands",
    description: "Professional web solution",
    videoUrl: "/video3.mov",
  },
  {
    id: 3,
    name: "Modern Gen Z Energy Drink Landing Page",
    description: "Creative Landing Page",
    videoUrl: "/video4.mov",
  },
];

export function TrustedCompaniesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Play video when index changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay prevented, user interaction needed
      });
    }
  }, [currentIndex]);

  // Auto-play carousel
  useEffect(() => {
    if (autoPlay) {
      autoPlayIntervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % templates.length);
      }, 5000);
    }
    return () => {
      if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
    };
  }, [autoPlay]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + templates.length) % templates.length);
    setAutoPlay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % templates.length);
    setAutoPlay(false);
  };

  const handleTouchStart = useRef(0);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const touchStart = handleTouchStart.current;
    const difference = touchStart - touchEnd;

    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
    setAutoPlay(false);
  };

  return (
    <section id="featured-work" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-350 mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`text-center mb-16 lg:mb-24 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Templates We've Crafted
            <span className="w-8 h-px bg-foreground/30" />
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
            Our Best Template
            <br />
            Designs & Experiences
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of modern, responsive templates built for growth.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Video Display */}
          <div
            className="relative rounded-2xl overflow-hidden bg-black/50 max-w-2xl mx-auto aspect-video mb-8 lg:mb-12 touch-pan-y flex items-center justify-center p-4"
            onTouchStart={(e) => (handleTouchStart.current = e.touches[0].clientX)}
            onTouchEnd={handleTouchEnd}
          >
            <div className="w-full h-full rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                key={templates[currentIndex].videoUrl}
                src={templates[currentIndex].videoUrl}
                className="w-full h-full object-contain"
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Template Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <div
                className={`transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <h3 className="text-2xl lg:text-3xl font-display text-white mb-2">
                  {templates[currentIndex].name}
                </h3>
                <p className="text-sm lg:text-base text-white/80">
                  {templates[currentIndex].description}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mb-8 lg:mb-12">
            <div className="flex gap-3">
              <button
                onClick={goToPrevious}
                className="p-3 rounded-full border border-foreground/20 hover:border-foreground/40 transition-all duration-300 hover:bg-foreground/5 group"
                aria-label="Previous template"
              >
                <ChevronLeft className="w-5 h-5 transition-transform group-hover:scale-110" />
              </button>
              <button
                onClick={goToNext}
                className="p-3 rounded-full border border-foreground/20 hover:border-foreground/40 transition-all duration-300 hover:bg-foreground/5 group"
                aria-label="Next template"
              >
                <ChevronRight className="w-5 h-5 transition-transform group-hover:scale-110" />
              </button>
            </div>

            {/* Slide Counter */}
            <div className="text-sm text-muted-foreground font-mono">
              <span className="text-foreground font-semibold">{currentIndex + 1}</span> / {templates.length}
            </div>
          </div>

          {/* Thumbnail Dots */}
          <div className="flex justify-center gap-3 flex-wrap">
            {templates.map((template, index) => (
              <button
                key={template.id}
                onClick={() => {
                  setCurrentIndex(index);
                  setAutoPlay(false);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-foreground w-8"
                    : "bg-foreground/30 w-2 hover:bg-foreground/50"
                }`}
                aria-label={`Go to template ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile Swipe Indicator */}
          <div className="text-center mt-8 lg:hidden text-xs text-muted-foreground">
            ← Swipe left or right →
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10" />
    </section>
  );
}