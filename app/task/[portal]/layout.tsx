import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { isValidPortal } from "@/lib/supabase/config"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Team Workspace",
  description: "Private ScaleUnities team workspace",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  referrer: "no-referrer",
}

export default async function PortalLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ portal: string }>
}) {
  const { portal } = await params
  if (!isValidPortal(portal)) notFound()
  return children
}
