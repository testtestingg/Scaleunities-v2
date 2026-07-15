import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-background">
      <div className="text-center max-w-lg">
        <div className="w-24 h-24 rounded-full bg-[rgba(107,33,168,0.1)] flex items-center justify-center mx-auto mb-8">
          <span className="font-serif text-4xl text-[#6B21A8]">404</span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">Page Not Found</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-[#6B21A8] text-white px-8 py-3 font-medium hover:bg-[#6B21A8]/90 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </main>
  )
}
