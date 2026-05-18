import Link from "next/link";

const projectLogos = [
  "/whatsapp1.png",
  "/whatsapp2.png",
  "/whatsapp3.png",
  "/whatsapp4.png",
  "/whatsapp5.png",
  "/whatsapp6.png",
  "/whatsapp7.png",
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-24">
      <h1 className="text-4xl md:text-5xl font-bold text-black mb-20 tracking-tight">
        Our Projects
      </h1>
      
      {/* Logos Side by Side */}
      <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16 lg:gap-24 max-w-6xl">
        {projectLogos.map((src, index) => (
          <div key={index} className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
            <img
              src={src}
              alt={`Project logo ${index + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* Back Button */}
      <Link 
        href="/" 
        className="mt-20 text-lg text-gray-500 hover:text-black transition-colors font-medium"
      >
        ← Back to Home
      </Link>
    </main>
  );
}