"use client";

import { useEffect, useRef, useState } from "react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Amir Dridi",
    role: "Fullstack Developer",
    bio: "Specialized in building scalable web applications with modern technologies. Expert in both frontend and backend development.",
    image: "https://i.ibb.co/VY2qN385/Whats-App-Image-2026-03-23-at-22-13-42.jpg",
  },
  {
    name: "Ranim Mourad",
    role: "Frontend Developer & UI Designer",
    bio: "Creative designer with a passion for building beautiful and intuitive user interfaces. Transforms ideas into stunning visual experiences.",
    image: "https://i.ibb.co/RTmfhRtG/Whats-App-Image-2026-02-04-at-15-31-08.jpg",
  },
  {
    name: "Ali Ben Said",
    role: "Project Manager",
    bio: "Ensures smooth project execution and excellent client communication. Dedicated to delivering projects on time and within scope.",
    image: "https://i.ibb.co/HmmQ9qc/Whats-App-Image-2025-10-17-at-22-07-14.jpg",
  },
  {
    name: "Houssem Ben Cheikh",
    role: "Designer",
    bio: "Crafts innovative designs that captivate users. Specializes in UX/UI design, branding, and visual storytelling.",
    image: "https://i.ibb.co/bgBXhkXN/1763386283657.png",
  },
];

export function TeamSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background pointer-events-none" />

      <div className="max-w-350 mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <div
            className={`inline-block mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10">
              <span className="text-sm font-medium">Meet Our Team</span>
            </div>
          </div>

          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Talented Team,{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Exceptional Results
            </span>
          </h2>

          <p
            className={`text-lg text-foreground/60 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            A dedicated team of creative professionals working together to deliver outstanding digital solutions.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${isVisible ? index * 100 : 0}ms`,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card background */}
              <div className="relative h-full">
                {/* Gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-foreground/10 to-foreground/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Main card */}
                <div className="relative bg-background/40 backdrop-blur-sm border border-foreground/10 rounded-2xl p-6 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative mb-6 overflow-hidden rounded-xl aspect-square bg-foreground/5">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-sm font-medium bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                      {member.role}
                    </p>
                    <p className="text-sm text-foreground/60 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
