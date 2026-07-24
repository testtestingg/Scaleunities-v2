import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getPortalSlug } from "@/lib/supabase/config"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")
  const requestedNext = url.searchParams.get("next")
  const safeFallback = `/task/${getPortalSlug()}`
  const next =
    requestedNext?.startsWith(`/task/${getPortalSlug()}`) ? requestedNext : safeFallback

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) return NextResponse.redirect(new URL(next, url.origin))
  }

  return NextResponse.redirect(
    new URL(`${safeFallback}?error=Unable%20to%20complete%20authentication`, url.origin),
  )
}
