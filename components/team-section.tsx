"use client"

import { motion } from "framer-motion"

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
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
]

export function TeamSection() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl font-bold mb-4"
          >
            Meet Our Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            A dedicated team of creative professionals working together to deliver outstanding digital solutions.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-secondary rounded-2xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-sm font-medium text-accent mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
