"use client"

import { useState, useTransition } from "react"
import { requestPasswordReset, updatePassword } from "@/app/task/actions"

export function ResetPasswordPanel({
  portal,
  mode,
}: {
  portal: string
  mode: "request" | "update"
}) {
  const [message, setMessage] = useState("")
  const [success, setSuccess] = useState(false)
  const [pending, startTransition] = useTransition()

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    startTransition(async () => {
      const result =
        mode === "update"
          ? await updatePassword(portal, String(form.get("password") || ""))
          : await requestPasswordReset(
              portal,
              String(form.get("email") || ""),
            )
      setSuccess(result.ok)
      setMessage(result.message)
    })
  }

  return (
    <form onSubmit={submit} className="mt-7 space-y-4">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-[#342b3a]">
          {mode === "update" ? "New password" : "Team email"}
        </span>
        <input
          required
          minLength={mode === "update" ? 8 : undefined}
          type={mode === "update" ? "password" : "email"}
          name={mode === "update" ? "password" : "email"}
          autoComplete={mode === "update" ? "new-password" : "email"}
          className="h-12 w-full rounded-xl border border-[#ddd5e3] px-4 text-sm outline-none transition focus:border-[#6B21A8] focus:ring-4 focus:ring-[#6B21A8]/10"
        />
      </label>
      {message && (
        <p
          role="status"
          className={`rounded-xl px-4 py-3 text-sm ${
            success ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
          }`}
        >
          {message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="h-12 w-full rounded-xl bg-[#6B21A8] text-sm font-bold text-white transition hover:bg-[#571a89] disabled:opacity-60"
      >
        {pending
          ? "Please wait…"
          : mode === "update"
            ? "Update password"
            : "Send reset link"}
      </button>
    </form>
  )
}
