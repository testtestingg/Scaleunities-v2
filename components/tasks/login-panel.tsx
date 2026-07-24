"use client"

import Link from "next/link"
import { useState, useTransition } from "react"
import { ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react"
import { signIn } from "@/app/task/actions"

export function LoginPanel({
  portal,
  initialError,
}: {
  portal: string
  initialError?: string
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState(initialError || "")
  const [pending, startTransition] = useTransition()

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setMessage("")
    startTransition(async () => {
      const result = await signIn(
        portal,
        String(form.get("email") || ""),
        String(form.get("password") || ""),
      )
      if (!result.ok) setMessage(result.message)
    })
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f5fa]">
      <div className="absolute inset-y-0 left-0 hidden w-[46%] bg-[#24162d] lg:block" />
      <div className="relative mx-auto grid min-h-screen max-w-[1480px] lg:grid-cols-[0.85fr_1fr]">
        <section className="relative hidden flex-col justify-between overflow-hidden p-14 text-white lg:flex">
          <div className="absolute -left-24 top-32 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -left-4 top-52 h-96 w-96 rounded-full border border-white/5" />
          <div className="relative flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8b3bc4] font-serif text-xl">
              S
            </div>
            <span className="text-lg font-semibold tracking-tight">ScaleUnities</span>
          </div>
          <div className="relative max-w-lg">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#c59be0]">
              Private team workspace
            </p>
            <h1 className="font-serif text-6xl leading-[1.02]">
              Clear work.
              <br />
              Shared momentum.
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-white/65">
              Plan client work, keep ownership clear, and move every deliverable forward
              from one focused workspace.
            </p>
          </div>
          <div className="relative flex items-center gap-3 text-sm text-white/55">
            <ShieldCheck className="h-4 w-4 text-[#c59be0]" />
            Approved ScaleUnities accounts only
          </div>
        </section>

        <section className="flex items-center justify-center px-5 py-10 sm:px-10">
          <div className="w-full max-w-md">
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6B21A8] font-serif text-xl text-white">
                S
              </div>
              <span className="text-lg font-semibold text-[#281d30]">ScaleUnities</span>
            </div>
            <div className="rounded-3xl border border-[#e7e1ed] bg-white p-7 shadow-[0_24px_70px_rgba(45,28,64,0.08)] sm:p-10">
              <div className="mb-8">
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0e7f6] text-[#6B21A8]">
                  <LockKeyhole className="h-5 w-5" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6B21A8]">
                  Team access
                </p>
                <h2 className="mt-2 font-serif text-4xl text-[#1f1726]">Welcome back</h2>
                <p className="mt-3 text-sm leading-6 text-[#756b7c]">
                  Sign in with your approved team account.
                </p>
              </div>

              <form onSubmit={submit} className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#342b3a]">Email</span>
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="name@scaleunities.com"
                    className="h-12 w-full rounded-xl border border-[#ddd5e3] bg-white px-4 text-sm outline-none transition focus:border-[#6B21A8] focus:ring-4 focus:ring-[#6B21A8]/10"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#342b3a]">Password</span>
                  <span className="relative block">
                    <input
                      required
                      minLength={8}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      className="h-12 w-full rounded-xl border border-[#ddd5e3] bg-white px-4 pr-12 text-sm outline-none transition focus:border-[#6B21A8] focus:ring-4 focus:ring-[#6B21A8]/10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#857a8c] hover:bg-[#f5f1f7]"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </span>
                </label>

                {message && (
                  <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                    {message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={pending}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#6B21A8] text-sm font-bold text-white transition hover:bg-[#571a89] disabled:cursor-wait disabled:opacity-60"
                >
                  {pending ? "Signing in…" : "Sign in"}
                  {!pending && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>

              <Link
                href={`/task/${portal}/reset`}
                className="mt-6 block text-center text-sm font-semibold text-[#6B21A8] hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
            <p className="mt-6 text-center text-xs leading-5 text-[#8d8493]">
              This is a private system. Access attempts are limited to approved accounts.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
