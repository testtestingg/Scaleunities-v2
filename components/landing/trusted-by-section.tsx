const projectLogos = [
  "/whatsapp1.png",
  "/whatsapp2.png",
  "/whatsapp3.png",
  "/whatsapp4.png",
  "/whatsapp5.png",
  "/whatsapp6.png",
  "/whatsapp7.png",
];

export function TrustedBySection() {
  return (
    <section id="partners" className="py-24 px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <span className="inline-flex items-center gap-3 text-sm font-mono text-gray-500 mb-6">
          <span className="w-8 h-px bg-gray-300" />
          Our Partners
        </span>
        <h2 className="text-4xl lg:text-5xl font-display tracking-tight text-black mb-16">
          Trusted By
        </h2>
        
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16 lg:gap-24">
          {projectLogos.map((src, index) => (
            <div key={index} className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
              <img
                src={src}
                alt={`Partner logo ${index + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}