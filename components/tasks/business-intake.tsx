"use client"

import { createClient as createBrowserSupabaseClient } from "@supabase/supabase-js"
import { useMemo, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  FileSpreadsheet,
  FileUp,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react"
import {
  completeIntakeSubmission,
  createIntakeField,
  createIntakeUploadTarget,
  recordIntakeFile,
  removeIntakeField,
  saveIntakeAnswers,
  startIntakeSubmission,
  updateIntakeField,
  type ActionResult,
  type IntakeFieldInput,
} from "@/app/task/actions"
import type {
  IntakeAnswer,
  IntakeField,
  IntakeFieldType,
  IntakeFile,
  IntakeSubmission,
} from "@/lib/task-types"

type FileAnswer = {
  name: string
  path: string
  size: number
  type: string
}

const fieldTypeLabels: Record<IntakeFieldType, string> = {
  text: "Texte court",
  email: "E-mail",
  tel: "Téléphone",
  url: "Lien",
  textarea: "Texte long",
  radio: "Choix unique",
  checkbox: "Choix multiple",
  time_range: "Plage horaire",
  file: "Fichier",
  number: "Nombre",
  date: "Date",
}

function initialValue(field: IntakeField) {
  if (field.field_type === "checkbox" || field.field_type === "file") return []
  if (field.field_type === "time_range") {
    return {
      start: String(field.config.defaultStart || "08:00"),
      end: String(field.config.defaultEnd || "18:00"),
    }
  }
  return ""
}

function hasValue(value: unknown) {
  if (Array.isArray(value)) return value.length > 0
  if (value && typeof value === "object") {
    return Object.values(value).some((item) => String(item || "").trim())
  }
  return String(value || "").trim().length > 0
}

export function BusinessIntakeForm({
  portal,
  fields,
}: {
  portal: string
  fields: IntakeField[]
}) {
  const activeFields = fields.filter((field) => field.is_active)
  const [submissionId, setSubmissionId] = useState<string | null>(null)
  const [page, setPage] = useState(-1)
  const [answers, setAnswers] = useState<Record<string, unknown>>({})
  const [busy, setBusy] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const [complete, setComplete] = useState(false)
  const currentFields =
    page < 0
      ? []
      : activeFields.filter((field) =>
          page === 0 ? field.section_number <= 4 : field.section_number >= 5,
        )

  async function start() {
    setBusy(true)
    setError("")
    const result = await startIntakeSubmission(portal)
    setBusy(false)
    if (!result.ok || !result.submissionId) {
      setError(result.message)
      return
    }
    setSubmissionId(result.submissionId)
    setPage(0)
  }

  async function next() {
    if (!currentFields.length || !submissionId) return
    for (const field of currentFields) {
      const value = answers[field.id] ?? initialValue(field)
      if (field.required && !hasValue(value)) {
        setError(`« ${field.label} » est obligatoire.`)
        return
      }
    }
    setBusy(true)
    setError("")
    const saved = await saveIntakeAnswers(
      portal,
      submissionId,
      currentFields.map((field) => ({
        fieldId: field.id,
        fieldKey: field.field_key,
        value: answers[field.id] ?? initialValue(field),
      })),
    )
    if (!saved.ok) {
      setBusy(false)
      setError(saved.message)
      return
    }
    if (page === 1) {
      const submitted = await completeIntakeSubmission(portal, submissionId)
      setBusy(false)
      if (!submitted.ok) {
        setError(submitted.message)
        return
      }
      setComplete(true)
      return
    }
    setBusy(false)
    setPage(1)
  }

  async function uploadFiles(field: IntakeField, files: FileList | null) {
    if (!files || !submissionId) return
    setUploading(true)
    setError("")
    const existing = Array.isArray(answers[field.id])
      ? (answers[field.id] as FileAnswer[]).slice()
      : []
    const selected = field.config.multiple ? Array.from(files) : [files[0]]
    for (const file of selected) {
      if (!file) continue
      if (file.size > 10 * 1024 * 1024) {
        setError(`${file.name} dépasse la limite de 10 Mo.`)
        continue
      }
      const target = await createIntakeUploadTarget(
        portal,
        submissionId,
        field.id,
        file.name,
        file.size,
      )
      if (
        !target.ok ||
        !target.path ||
        !target.token ||
        !target.supabaseUrl ||
        !target.anonKey
      ) {
        setError(target.message)
        continue
      }
      const uploadClient = createBrowserSupabaseClient(
        target.supabaseUrl,
        target.anonKey,
        { auth: { persistSession: false, autoRefreshToken: false } },
      )
      const { error: uploadError } = await uploadClient.storage
        .from("business-intake")
        .uploadToSignedUrl(target.path, target.token, file, {
          contentType: file.type || "application/octet-stream",
        })
      if (uploadError) {
        setError(uploadError.message)
        continue
      }
      const recorded = await recordIntakeFile(
        portal,
        submissionId,
        field.id,
        target.path,
        file.name,
        file.type,
        file.size,
      )
      if (!recorded.ok) {
        setError(recorded.message)
        continue
      }
      existing.push({
        name: file.name,
        path: target.path,
        size: file.size,
        type: file.type,
      })
    }
    setAnswers((values) => ({ ...values, [field.id]: existing }))
    setUploading(false)
  }

  if (complete) {
    return (
      <section className="mx-auto flex min-h-[62vh] max-w-2xl items-center justify-center">
        <div className="w-full rounded-3xl border border-[#ddd3e3] bg-white p-8 text-center shadow-[0_24px_80px_rgba(45,28,64,0.08)] sm:p-12">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <h2 className="mt-6 font-serif text-5xl text-[#251b2c]">Formulaire enregistré</h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#786e7e]">
            Les informations et médias sont sauvegardés dans l’espace privé ScaleUnities.
          </p>
          <button
            onClick={() => {
              setSubmissionId(null)
              setAnswers({})
              setPage(-1)
              setComplete(false)
            }}
            className="mt-8 rounded-xl bg-[#6B21A8] px-6 py-3 text-sm font-bold text-white"
          >
            Commencer une nouvelle visite
          </button>
        </div>
      </section>
    )
  }

  if (page < 0) {
    return (
      <section className="relative mx-auto overflow-hidden rounded-3xl bg-[#24162d] px-7 py-12 text-white sm:px-12 sm:py-16">
        <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full border border-white/10" />
        <div className="relative max-w-3xl">
          <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#d5b8e7]">
            Business field intake
          </span>
          <h2 className="mt-6 font-serif text-5xl leading-tight sm:text-7xl">
            Une conversation.
            <br />
            Toutes les informations.
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
            Remplissez le formulaire avec le responsable du commerce. Les réponses sont
            sauvegardées étape par étape et restent privées.
          </p>
          {error && <p className="mt-5 rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-100">{error}</p>}
          <button
            onClick={start}
            disabled={busy || !activeFields.length}
            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#2a1933] transition hover:bg-[#f2eaf7] disabled:opacity-50"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Commencer
            {!busy && <ArrowRight className="h-4 w-4" />}
          </button>
          <p className="mt-4 text-xs text-white/40">{activeFields.length} questions · sauvegarde privée</p>
        </div>
      </section>
    )
  }

  const pageSections = currentFields.reduce<
    Array<{ number: number; title: string; fields: IntakeField[] }>
  >((sections, field) => {
    const existing = sections.find((section) => section.number === field.section_number)
    if (existing) {
      existing.fields.push(field)
    } else {
      sections.push({
        number: field.section_number,
        title: field.section_title,
        fields: [field],
      })
    }
    return sections
  }, [])
  const progress = (page + 1) * 50
  return (
    <section className="mx-auto max-w-6xl">
      <div className="mb-6">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.14em] text-[#8e8493]">
          <span>Partie {page + 1} sur 2</span>
          <span>{currentFields.length} questions</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#e6deea]">
          <div className="h-full rounded-full bg-[#6B21A8] transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="space-y-5">
        {pageSections.map((section) => (
          <div
            key={section.number}
            className="overflow-hidden rounded-3xl border border-[#e4dce8] bg-white shadow-[0_24px_80px_rgba(45,28,64,0.06)]"
          >
            <header className="border-b border-[#eee8f1] bg-[#faf8fb] px-6 py-5 sm:px-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#6B21A8]">
                Section {section.number}
              </p>
              <h2 className="mt-1 font-serif text-3xl text-[#281e2f]">{section.title}</h2>
            </header>
            <div className="grid gap-x-8 gap-y-10 px-6 py-7 sm:px-8 sm:py-9 lg:grid-cols-2">
              {section.fields.map((field) => {
                const value = answers[field.id] ?? initialValue(field)
                const questionNumber =
                  activeFields.findIndex((activeField) => activeField.id === field.id) + 1
                return (
                  <div key={field.id} className="min-w-0">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 text-xs font-bold text-[#6B21A8]">
                        {questionNumber} →
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-serif text-2xl leading-tight text-[#281e2f] sm:text-3xl">
                          {field.label}
                          {field.required && <span className="ml-2 text-[#8b3fc0]">*</span>}
                        </h3>
                        {field.placeholder && field.field_type !== "text" && (
                          <p className="mt-2 text-xs text-[#8a808f]">{field.placeholder}</p>
                        )}
                        <div className="mt-5">
                          <IntakeInput
                            field={field}
                            value={value}
                            setValue={(nextValue) =>
                              setAnswers((values) => ({
                                ...values,
                                [field.id]: nextValue,
                              }))
                            }
                            uploading={uploading}
                            onFiles={(files) => uploadFiles(field, files)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {error && <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <div className="mt-5 rounded-2xl border border-[#e4dce8] bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setError("")
              setPage(0)
            }}
            disabled={page === 0 || busy}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-[#6e6374] disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" /> Retour
          </button>
          <button
            type="button"
            onClick={next}
            disabled={busy || uploading}
            className="inline-flex items-center gap-2 rounded-xl bg-[#6B21A8] px-6 py-3 text-sm font-bold text-white disabled:opacity-50"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            {page === 1 ? "Envoyer" : "Suivant"}
          </button>
        </div>
      </div>
    </section>
  )
}

function IntakeInput({
  field,
  value,
  setValue,
  uploading,
  onFiles,
}: {
  field: IntakeField
  value: unknown
  setValue: (value: unknown) => void
  uploading: boolean
  onFiles: (files: FileList | null) => void
}) {
  const inputClass =
    "w-full border-0 border-b-2 border-[#cfc3d5] bg-transparent px-0 py-3 text-xl text-[#302537] outline-none placeholder:text-[#b2a8b7] focus:border-[#6B21A8] sm:text-2xl"
  if (field.field_type === "radio") {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {field.options.map((option, optionIndex) => (
          <button
            key={option}
            type="button"
            onClick={() => setValue(option)}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
              value === option
                ? "border-[#6B21A8] bg-[#f3eaf8] text-[#5c1c8c]"
                : "border-[#ded6e3] hover:border-[#a976c8] hover:bg-[#fbf8fc]"
            }`}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-current text-xs">
              {String.fromCharCode(65 + optionIndex)}
            </span>
            {option}
          </button>
        ))}
      </div>
    )
  }
  if (field.field_type === "checkbox") {
    const selected = Array.isArray(value) ? (value as string[]) : []
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {field.options.map((option) => {
          const checked = selected.includes(option)
          return (
            <button
              key={option}
              type="button"
              onClick={() =>
                setValue(
                  checked
                    ? selected.filter((item) => item !== option)
                    : [...selected, option],
                )
              }
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                checked
                  ? "border-[#6B21A8] bg-[#f3eaf8] text-[#5c1c8c]"
                  : "border-[#ded6e3] hover:border-[#a976c8]"
              }`}
            >
              <span className={`flex h-6 w-6 items-center justify-center rounded-md border ${checked ? "bg-[#6B21A8] text-white" : ""}`}>
                {checked && <Check className="h-3.5 w-3.5" />}
              </span>
              {option}
            </button>
          )
        })}
      </div>
    )
  }
  if (field.field_type === "textarea") {
    return (
      <textarea
        value={String(value || "")}
        onChange={(event) => setValue(event.target.value)}
        placeholder={field.placeholder}
        className={`${inputClass} min-h-32 resize-y`}
      />
    )
  }
  if (field.field_type === "time_range") {
    const range = (value || { start: "08:00", end: "18:00" }) as {
      start: string
      end: string
    }
    return (
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <input
          type="time"
          value={range.start}
          onChange={(event) => setValue({ ...range, start: event.target.value })}
          className="h-14 rounded-xl border border-[#d9cfde] px-4 text-lg outline-none focus:border-[#6B21A8]"
        />
        <span className="text-sm font-semibold text-[#8c8291]">à</span>
        <input
          type="time"
          value={range.end}
          onChange={(event) => setValue({ ...range, end: event.target.value })}
          className="h-14 rounded-xl border border-[#d9cfde] px-4 text-lg outline-none focus:border-[#6B21A8]"
        />
      </div>
    )
  }
  if (field.field_type === "file") {
    const uploaded = Array.isArray(value) ? (value as FileAnswer[]) : []
    return (
      <div>
        <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#cfc3d5] bg-[#faf7fc] p-6 text-center transition hover:border-[#6B21A8]">
          {uploading ? <Loader2 className="h-8 w-8 animate-spin text-[#6B21A8]" /> : <UploadCloud className="h-8 w-8 text-[#6B21A8]" />}
          <span className="mt-3 text-sm font-bold text-[#45394c]">
            {uploading ? "Téléversement…" : "Choisir ou déposer des fichiers"}
          </span>
          <span className="mt-1 text-xs text-[#948a99]">10 Mo maximum par fichier</span>
          <input
            type="file"
            multiple={Boolean(field.config.multiple)}
            accept={String(field.config.accept || "*/*")}
            onChange={(event) => onFiles(event.target.files)}
            className="sr-only"
            disabled={uploading}
          />
        </label>
        {uploaded.length > 0 && (
          <div className="mt-3 space-y-2">
            {uploaded.map((file) => (
              <div key={file.path} className="flex items-center gap-3 rounded-xl bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-800">
                <FileUp className="h-4 w-4" />
                <span className="min-w-0 flex-1 truncate">{file.name}</span>
                <span>{(file.size / 1024 / 1024).toFixed(1)} Mo</span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
  return (
    <input
      type={field.field_type}
      value={String(value || "")}
      onChange={(event) => setValue(event.target.value)}
      placeholder={field.placeholder}
      className={inputClass}
      step={field.field_type === "number" ? "0.01" : undefined}
    />
  )
}

export function IntakeBuilder({
  portal,
  fields,
}: {
  portal: string
  fields: IntakeField[]
}) {
  const router = useRouter()
  const [editor, setEditor] = useState<IntakeField | "new" | null>(null)
  const [defaults, setDefaults] = useState<{ section: number; title: string; order: number } | null>(null)
  const [notice, setNotice] = useState<ActionResult | null>(null)
  const [pending, startTransition] = useTransition()
  const active = fields.filter((field) => field.is_active)
  const sections = useMemo(() => {
    const map = new Map<number, { title: string; fields: IntakeField[] }>()
    active.forEach((field) => {
      if (!map.has(field.section_number)) {
        map.set(field.section_number, { title: field.section_title, fields: [] })
      }
      map.get(field.section_number)?.fields.push(field)
    })
    return Array.from(map.entries())
  }, [active])

  function run(action: () => Promise<ActionResult>, close = false) {
    startTransition(async () => {
      const result = await action()
      setNotice(result)
      if (result.ok) {
        if (close) setEditor(null)
        router.refresh()
      }
    })
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[#e5dde9] bg-white p-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-serif text-2xl">Questions du formulaire</h2>
          <p className="mt-1 text-xs text-[#8a808f]">{active.length} questions actives · modifications réservées à Hala</p>
        </div>
        <button
          onClick={() => {
            const lastSection = sections.length ? sections[sections.length - 1] : null
            setDefaults({
              section: lastSection?.[0] || 1,
              title: lastSection?.[1].title || "Nouvelle section",
              order: Math.max(0, ...(lastSection?.[1].fields.map((field) => field.field_order) || [])) + 10,
            })
            setEditor("new")
          }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6B21A8] px-4 py-2.5 text-sm font-bold text-white"
        >
          <Plus className="h-4 w-4" /> Ajouter une question
        </button>
      </div>
      {notice && (
        <p className={`rounded-xl px-4 py-3 text-sm ${notice.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
          {notice.message}
        </p>
      )}
      {sections.map(([sectionNumber, section]) => (
        <section key={sectionNumber} className="overflow-hidden rounded-2xl border border-[#e5dde9] bg-white">
          <header className="flex items-center justify-between border-b border-[#eee8f1] bg-[#faf8fb] px-5 py-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6B21A8]">Section {sectionNumber}</p>
              <h3 className="mt-1 font-serif text-2xl">{section.title}</h3>
            </div>
            <button
              onClick={() => {
                setDefaults({
                  section: sectionNumber,
                  title: section.title,
                  order: Math.max(0, ...section.fields.map((field) => field.field_order)) + 10,
                })
                setEditor("new")
              }}
              className="rounded-lg border border-[#ddd4e2] p-2 text-[#6B21A8]"
              aria-label={`Ajouter une question à ${section.title}`}
            >
              <Plus className="h-4 w-4" />
            </button>
          </header>
          <div className="divide-y divide-[#f0ebf2]">
            {section.fields.map((field) => (
              <div key={field.id} className="flex items-center gap-4 px-5 py-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f1e9f6] text-xs font-bold text-[#6B21A8]">
                  {field.field_order}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[#352a3b]">{field.label}</p>
                  <p className="mt-1 text-[10px] text-[#918797]">
                    {fieldTypeLabels[field.field_type]}{field.required ? " · obligatoire" : ""}
                  </p>
                </div>
                <button onClick={() => setEditor(field)} className="rounded-lg p-2 text-[#827788] hover:bg-[#f2ebf6] hover:text-[#6B21A8]" aria-label={`Modifier ${field.label}`}>
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  disabled={pending}
                  onClick={() => window.confirm(`Supprimer la question « ${field.label} » ?`) && run(() => removeIntakeField(portal, field.id))}
                  className="rounded-lg p-2 text-[#9b919f] hover:bg-red-50 hover:text-red-600"
                  aria-label={`Supprimer ${field.label}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}
      {editor && (
        <FieldEditor
          field={editor === "new" ? null : editor}
          defaults={defaults}
          pending={pending}
          onClose={() => setEditor(null)}
          onSave={(input) =>
            run(
              () =>
                editor === "new"
                  ? createIntakeField(portal, input)
                  : updateIntakeField(portal, editor.id, input),
              true,
            )
          }
        />
      )}
    </div>
  )
}

function FieldEditor({
  field,
  defaults,
  pending,
  onClose,
  onSave,
}: {
  field: IntakeField | null
  defaults: { section: number; title: string; order: number } | null
  pending: boolean
  onClose: () => void
  onSave: (input: IntakeFieldInput) => void
}) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#170e1d]/55 p-4">
      <button className="absolute inset-0" onClick={onClose} aria-label="Fermer" />
      <section className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-[#eee8f1] px-6 py-5">
          <h2 className="font-serif text-3xl">{field ? "Modifier la question" : "Nouvelle question"}</h2>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-[#f3eef5]"><X className="h-5 w-5" /></button>
        </header>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            const form = new FormData(event.currentTarget)
            onSave({
              sectionNumber: Number(form.get("sectionNumber")),
              sectionTitle: String(form.get("sectionTitle") || ""),
              fieldOrder: Number(form.get("fieldOrder")),
              label: String(form.get("label") || ""),
              placeholder: String(form.get("placeholder") || ""),
              fieldType: String(form.get("fieldType")) as IntakeFieldType,
              options: String(form.get("options") || "").split("\n").map((item) => item.trim()).filter(Boolean),
              required: form.get("required") === "on",
            })
          }}
          className="space-y-4 p-6"
        >
          <div className="grid grid-cols-2 gap-3">
            <EditorField label="N° section"><input name="sectionNumber" type="number" min="1" defaultValue={field?.section_number || defaults?.section || 1} className="form-input" required /></EditorField>
            <EditorField label="Ordre"><input name="fieldOrder" type="number" min="1" defaultValue={field?.field_order || defaults?.order || 10} className="form-input" required /></EditorField>
          </div>
          <EditorField label="Titre de section"><input name="sectionTitle" defaultValue={field?.section_title || defaults?.title || ""} className="form-input" required /></EditorField>
          <EditorField label="Question"><input name="label" defaultValue={field?.label || ""} className="form-input" required /></EditorField>
          <EditorField label="Aide ou exemple"><input name="placeholder" defaultValue={field?.placeholder || ""} className="form-input" /></EditorField>
          <EditorField label="Type">
            <select name="fieldType" defaultValue={field?.field_type || "text"} className="form-input">
              {Object.entries(fieldTypeLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </EditorField>
          <EditorField label="Choix (un par ligne)">
            <textarea name="options" defaultValue={field?.options.join("\n") || ""} className="form-input min-h-28 py-3" />
          </EditorField>
          <label className="flex items-center gap-3 rounded-xl bg-[#faf8fb] p-4 text-sm font-semibold">
            <input type="checkbox" name="required" defaultChecked={field?.required} className="accent-[#6B21A8]" />
            Réponse obligatoire
          </label>
          <div className="flex justify-end gap-2 border-t border-[#eee8f1] pt-5">
            <button type="button" onClick={onClose} className="rounded-xl border border-[#ddd5e3] px-4 py-2.5 text-sm font-bold">Annuler</button>
            <button disabled={pending} className="rounded-xl bg-[#6B21A8] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50">
              {pending ? "Enregistrement…" : "Enregistrer"}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

function EditorField({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-xs font-bold text-[#514757]">{label}</span>{children}</label>
}

export function IntakeSubmissions({
  fields,
  submissions,
  answers,
  files,
}: {
  fields: IntakeField[]
  submissions: IntakeSubmission[]
  answers: IntakeAnswer[]
  files: IntakeFile[]
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<"submitted" | "draft">("submitted")
  const selected = submissions.find((submission) => submission.id === selectedId)
  const sortedFields = [...fields].sort(
    (a, b) => a.section_number - b.section_number || a.field_order - b.field_order,
  )
  const answerMap = useMemo(() => {
    const map = new Map<string, Map<string, unknown>>()
    answers.forEach((answer) => {
      if (!map.has(answer.submission_id)) map.set(answer.submission_id, new Map())
      map.get(answer.submission_id)?.set(answer.field_id, answer.value)
    })
    return map
  }, [answers])
  const visibleSubmissions = submissions.filter(
    (submission) => submission.status === statusFilter,
  )
  const businessNameField = fields.find((field) => field.field_key === "business_name")

  function submissionName(submission: IntakeSubmission) {
    const savedName = businessNameField
      ? answerMap.get(submission.id)?.get(businessNameField.id)
      : null
    return typeof savedName === "string" && savedName.trim()
      ? savedName.trim()
      : submission.display_name
  }

  function exportCsv() {
    const headers = ["Entreprise", "Statut", "Créé le", "Envoyé le", ...sortedFields.map((field) => field.label)]
    const rows = visibleSubmissions.map((submission) => {
      const values = answerMap.get(submission.id)
      return [
        submissionName(submission),
        submission.status,
        submission.created_at,
        submission.submitted_at || "",
        ...sortedFields.map((field) => formatExportValue(values?.get(field.id))),
      ]
    })
    const csv = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\r\n")
    const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `scaleunities-business-intake-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="mb-5 flex flex-col justify-between gap-4 rounded-2xl border border-[#e5dde9] bg-white p-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-serif text-2xl">Réponses collectées</h2>
          <p className="mt-1 text-xs text-[#8a808f]">
            {submissions.filter((submission) => submission.status === "submitted").length} formulaires envoyés · import direct dans Google Sheets
          </p>
        </div>
        <button onClick={exportCsv} disabled={!visibleSubmissions.length} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#167C4A] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-40">
          <FileSpreadsheet className="h-4 w-4" /> Télécharger CSV
        </button>
      </div>
      <div className="mb-4 inline-flex rounded-xl border border-[#e5dde9] bg-white p-1">
        {([
          ["submitted", "Formulaires envoyés"],
          ["draft", "Brouillons"],
        ] as const).map(([value, label]) => {
          const count = submissions.filter((submission) => submission.status === value).length
          return (
            <button
              key={value}
              onClick={() => {
                setStatusFilter(value)
                setSelectedId(null)
              }}
              className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
                statusFilter === value
                  ? "bg-[#6B21A8] text-white"
                  : "text-[#776c7d] hover:bg-[#f5f0f7]"
              }`}
            >
              {label} ({count})
            </button>
          )
        })}
      </div>
      <section className="overflow-hidden rounded-2xl border border-[#e5dde9] bg-white">
        <div className="hidden overflow-x-auto sm:block">
          <table className="w-full text-left">
            <thead className="bg-[#faf8fb] text-[10px] font-bold uppercase tracking-[0.12em] text-[#8d8392]">
              <tr><th className="px-5 py-4">Entreprise</th><th className="px-4 py-4">Statut</th><th className="px-4 py-4">Date</th><th className="px-4 py-4">Fichiers</th><th className="px-5 py-4 text-right">Voir</th></tr>
            </thead>
            <tbody className="divide-y divide-[#f0ebf2]">
              {visibleSubmissions.map((submission) => (
                <tr key={submission.id}>
                  <td className="px-5 py-4 text-sm font-bold">{submissionName(submission)}</td>
                  <td className="px-4 py-4"><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${submission.status === "submitted" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{submission.status === "submitted" ? "Envoyé" : "Brouillon"}</span></td>
                  <td className="px-4 py-4 text-xs text-[#7f7584]">{new Date(submission.created_at).toLocaleDateString("fr-FR")}</td>
                  <td className="px-4 py-4 text-xs text-[#7f7584]">{files.filter((file) => file.submission_id === submission.id).length}</td>
                  <td className="px-5 py-4 text-right"><button onClick={() => setSelectedId(submission.id)} className="rounded-lg p-2 text-[#6B21A8] hover:bg-[#f1e9f6]"><ChevronRight className="h-4 w-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="divide-y divide-[#f0ebf2] sm:hidden">
          {visibleSubmissions.map((submission) => (
            <button key={submission.id} onClick={() => setSelectedId(submission.id)} className="flex w-full items-center justify-between p-4 text-left">
              <span><span className="block text-sm font-bold">{submissionName(submission)}</span><span className="mt-1 block text-xs text-[#8d8392]">{new Date(submission.created_at).toLocaleDateString("fr-FR")}</span></span>
              <ChevronRight className="h-4 w-4 text-[#6B21A8]" />
            </button>
          ))}
        </div>
        {!visibleSubmissions.length && (
          <div className="px-5 py-16 text-center text-sm text-[#908695]">
            {statusFilter === "submitted"
              ? "Aucun formulaire envoyé pour le moment."
              : "Aucun brouillon pour le moment."}
          </div>
        )}
      </section>
      {selected && (
        <div className="fixed inset-0 z-[90] flex justify-end bg-[#170e1d]/50">
          <button className="absolute inset-0" onClick={() => setSelectedId(null)} aria-label="Fermer" />
          <aside className="relative h-full w-full max-w-xl overflow-y-auto bg-[#faf8fb] p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between">
              <div><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#6B21A8]">Fiche entreprise</p><h2 className="mt-2 font-serif text-4xl">{submissionName(selected)}</h2></div>
              <button onClick={() => setSelectedId(null)} className="rounded-lg p-2 hover:bg-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-7 space-y-3">
              {sortedFields.map((field) => {
                const answer = answerMap.get(selected.id)?.get(field.id)
                if (!hasValue(answer)) return null
                return (
                  <div key={field.id} className="rounded-xl border border-[#e5dde9] bg-white p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[#918797]">{field.label}</p>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[#514757]">{formatExportValue(answer)}</p>
                  </div>
                )
              })}
              {!sortedFields.some((field) =>
                hasValue(answerMap.get(selected.id)?.get(field.id)),
              ) && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                  {selected.status === "draft"
                    ? "Ce brouillon a été créé, mais aucune réponse n’a encore été enregistrée."
                    : "Aucune réponse n’est visible pour ce formulaire. Appliquez la migration de visibilité des réponses, puis actualisez la page."}
                </div>
              )}
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}

function formatExportValue(value: unknown) {
  if (value == null) return ""
  if (Array.isArray(value)) {
    return value
      .map((item) =>
        item && typeof item === "object" && "name" in item
          ? String((item as { name: unknown }).name)
          : String(item),
      )
      .join(" | ")
  }
  if (typeof value === "object") {
    const range = value as { start?: string; end?: string }
    if (range.start || range.end) return `${range.start || ""} - ${range.end || ""}`
    return JSON.stringify(value)
  }
  return String(value)
}
