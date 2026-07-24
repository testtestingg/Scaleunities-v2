import { Database, ShieldCheck } from "lucide-react"

export function PortalConfiguration({ portal }: { portal: string }) {
  return (
    <main className="min-h-screen bg-[#f7f5fa] px-5 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-xl items-center">
        <section className="w-full rounded-3xl border border-[#e7e1ed] bg-white p-7 shadow-[0_24px_70px_rgba(45,28,64,0.08)] sm:p-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0e7f6] text-[#6B21A8]">
            <Database className="h-6 w-6" />
          </div>
          <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#6B21A8]">
            ScaleUnities Workspace
          </p>
          <h1 className="mt-2 font-serif text-4xl text-[#1f1726]">
            One connection step remains
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#756b7c]">
            The private portal is deployed correctly, but this deployment cannot find its
            Supabase URL or public key yet. Add the two Supabase values in Vercel, then
            redeploy the latest version.
          </p>
          <div className="mt-6 rounded-2xl border border-[#e6ddeb] bg-[#faf7fc] p-4">
            <p className="text-xs font-bold text-[#45384d]">Accepted variable names</p>
            <ul className="mt-3 space-y-2 text-xs leading-5 text-[#6e6374]">
              <li>
                URL: <code className="font-semibold text-[#6B21A8]">NEXT_PUBLIC_SUPABASE_URL</code>{" "}
                or <code className="font-semibold text-[#6B21A8]">SUPABASE_URL</code>
              </li>
              <li>
                Key: <code className="font-semibold text-[#6B21A8]">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>,{" "}
                <code className="font-semibold text-[#6B21A8]">NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code>,{" "}
                or their non-public equivalents
              </li>
            </ul>
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-xl bg-emerald-50 px-4 py-3 text-xs leading-5 text-emerald-800">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
            The portal remains private and no task data is exposed while the connection is
            incomplete.
          </div>
          <p className="mt-5 break-all text-[10px] text-[#9a909f]">
            Portal ID: {portal}
          </p>
        </section>
      </div>
    </main>
  )
}
