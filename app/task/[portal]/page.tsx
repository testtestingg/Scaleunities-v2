import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { LoginPanel } from "@/components/tasks/login-panel"

export default async function PortalLoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ portal: string }>
  searchParams: Promise<{ error?: string }>
}) {
  const { portal } = await params
  const query = await searchParams
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) redirect(`/task/${portal}/dashboard`)

  return <LoginPanel portal={portal} initialError={query.error} />
}
