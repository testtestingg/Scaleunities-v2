import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found | Scaleunities",
  robots: "noindex, follow",
}

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(107,33,168,0.12),transparent_60%)]" />

      <p className="font-serif text-8xl md:text-9xl font-normal text-[#6B21A8]">404</p>

      <h1 className="mt-4 font-serif text-3xl md:text-4xl text-foreground">
        This page took a detour.
      </h1>

      <p className="mt-4 max-w-md text-muted-foreground leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on track.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-[#6B21A8] px-8 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-[#581c87]"
        >
          Back to home
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-border bg-transparent px-8 py-3 text-base font-semibold text-foreground transition-colors hover:bg-neutral-100"
        >
          Contact us
        </Link>
      </div>
    </main>
  )
}
