export const DEFAULT_PORTAL_SLUG = "internal-portal-su-7c4f19b8a2d64e51"

export function getPortalSlug() {
  return process.env.TASK_PORTAL_SLUG || DEFAULT_PORTAL_SLUG
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
