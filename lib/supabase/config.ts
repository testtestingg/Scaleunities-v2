export const PORTAL_SLUG = "scale-team-f465d132131c1f650acca68f"

export function getPortalSlug() {
  return PORTAL_SLUG
}

export function isValidPortal(portal: string) {
  return portal === getPortalSlug()
}

export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!url || !anonKey) {
    throw new Error(
      "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and a Supabase public key.",
    )
  }

  return { url, anonKey }
}
