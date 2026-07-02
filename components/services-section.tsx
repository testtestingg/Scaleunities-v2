"use client"

import { motion } from "framer-motion"

export function ServicesSection() {
  const services = [
    {
      title: "Modern Websites",
      description: "Responsive, stunning websites that look great on all devices and deliver real results for your business.",
    },
    {
      title: "Mobile Apps",
      description: "Custom mobile applications for iOS and Android platforms with seamless user experience.",
    },
    {
      title: "Custom Solutions",
      description: "Tailored digital solutions including e-commerce, business tools, and platforms built to your needs.",
    },
    {
      title: "Expert Support",
      description: "Dedicated support and maintenance to keep your digital presence running smoothly 24/7.",
    },
  ]

  return (
    <section id="services" className="py-20 px-4 sm:px-6 w-full bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-foreground mb-4 tracking-tight"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-lg sm:text-xl text-muted-foreground"
          >
            Everything your business needs to succeed in the digital world.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-secondary/30 rounded-3xl p-8 flex flex-col min-h-[220px] transition-all duration-300 hover:bg-secondary/50 hover:shadow-lg"
            >
              {/* Service Number */}
              <div className="text-accent font-serif text-5xl font-bold mb-4 opacity-20">
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Service Title */}
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">{service.title}</h3>

              {/* Service Description */}
              <p className="text-muted-foreground leading-relaxed mt-auto">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
