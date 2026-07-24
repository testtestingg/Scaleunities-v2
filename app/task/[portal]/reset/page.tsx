import Link from "next/link"
import { ResetPasswordPanel } from "@/components/tasks/reset-password-panel"
import { PortalConfiguration } from "@/components/tasks/portal-configuration"
import { isSupabaseConfigured } from "@/lib/supabase/config"

export default async function ResetPasswordPage({
  params,
  searchParams,
}: {
  params: Promise<{ portal: string }>
  searchParams: Promise<{ mode?: string }>
}) {
  const { portal } = await params
  const { mode } = await searchParams
  if (!isSupabaseConfigured()) return <PortalConfiguration portal={portal} />

  return (
    <main className="min-h-screen bg-[#f7f5fa] px-5 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
        <div className="w-full rounded-3xl border border-[#e7e1ed] bg-white p-7 shadow-[0_24px_70px_rgba(45,28,64,0.08)] sm:p-9">
          <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-xl border border-[#e7e1ed] bg-white p-1 shadow-sm">
            <img
              src="/scaleunities-logo.png"
              alt="ScaleUnities logo"
              className="h-full w-full object-contain"
            />
          </div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#6B21A8]">
            ScaleUnities Workspace
          </p>
          <h1 className="font-serif text-4xl text-[#1f1726]">
            {mode === "update" ? "Choose a new password" : "Reset your password"}
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#756b7c]">
            {mode === "update"
              ? "Use a strong password you have not used for this account before."
              : "We will send a secure reset link to your approved team email."}
          </p>
          <ResetPasswordPanel portal={portal} mode={mode === "update" ? "update" : "request"} />
          <Link
            href={`/task/${portal}`}
            className="mt-6 block text-center text-sm font-semibold text-[#6B21A8] hover:underline"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </main>
  )
}
