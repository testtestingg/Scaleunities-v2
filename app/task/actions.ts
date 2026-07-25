"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import { getPortalSlug, getSupabaseConfig, isValidPortal } from "@/lib/supabase/config"
import type {
  IntakeFieldType,
  TaskPriority,
  TaskStatus,
  UserRole,
} from "@/lib/task-types"

export type ActionResult = { ok: boolean; message: string }

function fail(message: string): ActionResult {
  return { ok: false, message }
}

async function getActor() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { supabase, user: null, profile: null }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role, is_active")
    .eq("id", user.id)
    .single()

  return { supabase, user, profile }
}

function refreshPortal(portal: string) {
  revalidatePath(`/task/${portal}/dashboard`, "layout")
}

export async function signIn(
  portal: string,
  email: string,
  password: string,
): Promise<ActionResult> {
  if (!isValidPortal(portal)) return fail("This portal link is invalid.")
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  })

  if (error || !data.user) {
    return fail(error?.message || "Unable to sign in.")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_active")
    .eq("id", data.user.id)
    .single()

  if (!profile?.is_active) {
    await supabase.auth.signOut()
    return fail("Your account is not approved for this workspace.")
  }

  redirect(`/task/${portal}/dashboard`)
}

export async function signOut(portal: string) {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect(`/task/${isValidPortal(portal) ? portal : getPortalSlug()}`)
}

export async function requestPasswordReset(
  portal: string,
  email: string,
): Promise<ActionResult> {
  if (!isValidPortal(portal)) return fail("This portal link is invalid.")
  const supabase = await createClient()
  const requestHeaders = await headers()
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host")
  const protocol = requestHeaders.get("x-forwarded-proto") || "https"
  if (!host) return fail("Unable to determine the secure reset address.")
  const safeOrigin = `${protocol}://${host}`
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo: `${safeOrigin}/auth/callback?next=/task/${portal}/reset?mode=update`,
  })

  if (error) return fail(error.message)
  return {
    ok: true,
    message: "If this email belongs to an approved account, a reset link is on its way.",
  }
}

export async function updatePassword(
  portal: string,
  password: string,
): Promise<ActionResult> {
  if (!isValidPortal(portal)) return fail("This portal link is invalid.")
  if (password.length < 8) return fail("Use at least 8 characters.")
  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({ password })
  if (error) return fail(error.message)
  return { ok: true, message: "Password updated. You can return to your dashboard." }
}

export type TaskInput = {
  title: string
  description: string
  businessId: string
  assignedTo: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
}

function validTaskInput(input: TaskInput) {
  return (
    input.title.trim().length >= 2 &&
    input.businessId &&
    input.assignedTo &&
    ["to_do", "in_progress", "under_review", "blocked", "completed", "cancelled"].includes(
      input.status,
    ) &&
    ["low", "medium", "high", "urgent"].includes(input.priority)
  )
}

export async function createTask(
  portal: string,
  input: TaskInput,
): Promise<ActionResult> {
  if (!isValidPortal(portal) || !validTaskInput(input)) {
    return fail("Please complete all required task fields.")
  }
  const { supabase, user, profile } = await getActor()
  if (!user || profile?.role !== "admin") return fail("Only administrators can create tasks.")

  const { error } = await supabase.from("tasks").insert({
    title: input.title.trim(),
    description: input.description.trim(),
    business_id: input.businessId,
    assigned_to: input.assignedTo,
    status: input.status,
    priority: input.priority,
    created_by: user.id,
    due_date: input.dueDate || null,
  })

  if (error) return fail(error.message)
  refreshPortal(portal)
  return { ok: true, message: "Task created." }
}

export async function updateTask(
  portal: string,
  taskId: string,
  input: TaskInput,
): Promise<ActionResult> {
  if (!isValidPortal(portal) || !validTaskInput(input)) {
    return fail("Please complete all required task fields.")
  }
  const { supabase, user, profile } = await getActor()
  if (!user || !profile || !["admin", "project_manager"].includes(profile.role)) {
    return fail("You do not have permission to edit task details.")
  }

  const { error } = await supabase
    .from("tasks")
    .update({
      title: input.title.trim(),
      description: input.description.trim(),
      business_id: input.businessId,
      assigned_to: input.assignedTo,
      status: input.status,
      priority: input.priority,
      due_date: input.dueDate || null,
    })
    .eq("id", taskId)

  if (error) return fail(error.message)
  refreshPortal(portal)
  return { ok: true, message: "Task updated." }
}

export async function updateTaskStatus(
  portal: string,
  taskId: string,
  status: TaskStatus,
): Promise<ActionResult> {
  if (!isValidPortal(portal)) return fail("This portal link is invalid.")
  const { supabase, user } = await getActor()
  if (!user) return fail("Your session has expired. Sign in again.")

  const { error } = await supabase.from("tasks").update({ status }).eq("id", taskId)
  if (error) return fail(error.message)
  refreshPortal(portal)
  return { ok: true, message: "Status updated." }
}

export async function archiveTask(portal: string, taskId: string): Promise<ActionResult> {
  if (!isValidPortal(portal)) return fail("This portal link is invalid.")
  const { supabase, profile } = await getActor()
  if (profile?.role !== "admin") return fail("Only administrators can archive tasks.")
  const { error } = await supabase
    .from("tasks")
    .update({ archived_at: new Date().toISOString() })
    .eq("id", taskId)
  if (error) return fail(error.message)
  refreshPortal(portal)
  return { ok: true, message: "Task archived." }
}

export async function deleteTask(portal: string, taskId: string): Promise<ActionResult> {
  if (!isValidPortal(portal)) return fail("This portal link is invalid.")
  const { supabase, profile } = await getActor()
  if (profile?.role !== "admin") return fail("Only administrators can delete tasks.")
  const { error } = await supabase.from("tasks").delete().eq("id", taskId)
  if (error) return fail(error.message)
  refreshPortal(portal)
  return { ok: true, message: "Task deleted." }
}

export async function addComment(
  portal: string,
  taskId: string,
  body: string,
  isPmNote: boolean,
): Promise<ActionResult> {
  if (!isValidPortal(portal) || !body.trim()) return fail("Write a comment first.")
  const { supabase, user, profile } = await getActor()
  if (!user || !profile) return fail("Your session has expired. Sign in again.")

  const { error } = await supabase.from("task_comments").insert({
    task_id: taskId,
    author_id: user.id,
    body: body.trim(),
    is_pm_note: isPmNote && ["admin", "project_manager"].includes(profile.role),
  })
  if (error) return fail(error.message)
  refreshPortal(portal)
  return { ok: true, message: "Comment added." }
}

export async function createBusiness(
  portal: string,
  name: string,
  color: string,
): Promise<ActionResult> {
  if (!isValidPortal(portal) || name.trim().length < 2) {
    return fail("Enter a business name.")
  }
  const { supabase, user, profile } = await getActor()
  if (!user || profile?.role !== "admin") {
    return fail("Only administrators can add businesses.")
  }
  const { error } = await supabase.from("businesses").insert({
    name: name.trim(),
    color,
    created_by: user.id,
  })
  if (error) return fail(error.message)
  refreshPortal(portal)
  return { ok: true, message: "Business added." }
}

export async function deleteBusiness(
  portal: string,
  businessId: string,
): Promise<ActionResult> {
  if (!isValidPortal(portal)) return fail("This portal link is invalid.")
  const { supabase, profile } = await getActor()
  if (!profile || !["admin", "project_manager"].includes(profile.role)) {
    return fail("Only administrators and project managers can remove businesses.")
  }

  const { error } = await supabase
    .from("businesses")
    .update({ is_active: false })
    .eq("id", businessId)

  if (error) return fail(error.message)
  refreshPortal(portal)
  return { ok: true, message: "Business removed from the active workspace." }
}

export async function updateProfileRole(
  portal: string,
  profileId: string,
  role: UserRole,
): Promise<ActionResult> {
  if (!isValidPortal(portal)) return fail("This portal link is invalid.")
  const { supabase, user, profile } = await getActor()
  if (!user || profile?.role !== "admin") {
    return fail("Only administrators can change roles.")
  }
  if (profileId === user.id && role !== "admin") {
    return fail("You cannot remove your own administrator access.")
  }
  const { error } = await supabase.from("profiles").update({ role }).eq("id", profileId)
  if (error) return fail(error.message)
  refreshPortal(portal)
  return { ok: true, message: "Role updated." }
}

async function requireIntakeAdmin(portal: string) {
  if (!isValidPortal(portal)) return null
  const actor = await getActor()
  if (!actor.user || actor.profile?.role !== "admin") return null
  return actor
}

export async function startIntakeSubmission(
  portal: string,
): Promise<ActionResult & { submissionId?: string }> {
  const actor = await requireIntakeAdmin(portal)
  if (!actor?.user) return fail("Only administrators can start a field intake.")

  const { data, error } = await actor.supabase
    .from("intake_submissions")
    .insert({ created_by: actor.user.id })
    .select("id")
    .single()

  if (error || !data) return fail(error?.message || "Unable to start the form.")
  refreshPortal(portal)
  return { ok: true, message: "Form started.", submissionId: data.id }
}

export async function saveIntakeAnswer(
  portal: string,
  submissionId: string,
  fieldId: string,
  fieldKey: string,
  value: unknown,
): Promise<ActionResult> {
  const actor = await requireIntakeAdmin(portal)
  if (!actor) return fail("Only administrators can save field intake responses.")

  const { error } = await actor.supabase.from("intake_answers").upsert(
    {
      submission_id: submissionId,
      field_id: fieldId,
      value,
    },
    { onConflict: "submission_id,field_id" },
  )
  if (error) return fail(error.message)

  if (fieldKey === "business_name" && typeof value === "string" && value.trim()) {
    const { error: nameError } = await actor.supabase
      .from("intake_submissions")
      .update({ display_name: value.trim() })
      .eq("id", submissionId)
    if (nameError) return fail(nameError.message)
  }

  refreshPortal(portal)
  return { ok: true, message: "Response saved." }
}

export async function saveIntakeAnswers(
  portal: string,
  submissionId: string,
  answers: Array<{ fieldId: string; fieldKey: string; value: unknown }>,
): Promise<ActionResult> {
  const actor = await requireIntakeAdmin(portal)
  if (!actor || !answers.length || answers.length > 100) {
    return fail("Unable to save these field intake responses.")
  }

  const { error } = await actor.supabase.from("intake_answers").upsert(
    answers.map((answer) => ({
      submission_id: submissionId,
      field_id: answer.fieldId,
      value: answer.value,
    })),
    { onConflict: "submission_id,field_id" },
  )
  if (error) return fail(error.message)

  const businessName = answers.find(
    (answer) =>
      answer.fieldKey === "business_name" &&
      typeof answer.value === "string" &&
      answer.value.trim(),
  )
  if (businessName && typeof businessName.value === "string") {
    const { error: nameError } = await actor.supabase
      .from("intake_submissions")
      .update({ display_name: businessName.value.trim() })
      .eq("id", submissionId)
    if (nameError) return fail(nameError.message)
  }

  refreshPortal(portal)
  return { ok: true, message: "Responses saved." }
}

export async function completeIntakeSubmission(
  portal: string,
  submissionId: string,
): Promise<ActionResult> {
  const actor = await requireIntakeAdmin(portal)
  if (!actor) return fail("Only administrators can submit field intake responses.")
  const { error } = await actor.supabase
    .from("intake_submissions")
    .update({ status: "submitted", submitted_at: new Date().toISOString() })
    .eq("id", submissionId)
  if (error) return fail(error.message)
  refreshPortal(portal)
  return { ok: true, message: "Business intake submitted." }
}

export type IntakeFieldInput = {
  sectionNumber: number
  sectionTitle: string
  fieldOrder: number
  label: string
  placeholder: string
  fieldType: IntakeFieldType
  options: string[]
  required: boolean
}

function validIntakeField(input: IntakeFieldInput) {
  return (
    Number.isInteger(input.sectionNumber) &&
    input.sectionNumber > 0 &&
    input.sectionTitle.trim().length >= 2 &&
    input.label.trim().length >= 2 &&
    Number.isFinite(input.fieldOrder)
  )
}

export async function createIntakeField(
  portal: string,
  input: IntakeFieldInput,
): Promise<ActionResult> {
  const actor = await requireIntakeAdmin(portal)
  if (!actor || !validIntakeField(input)) return fail("Complete the question details.")
  const baseKey = input.label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "")
    .slice(0, 42)
  const fieldKey = `${baseKey || "question"}_${crypto.randomUUID().slice(0, 8)}`
  const { error } = await actor.supabase.from("intake_form_fields").insert({
    section_number: input.sectionNumber,
    section_title: input.sectionTitle.trim(),
    field_order: input.fieldOrder,
    field_key: fieldKey,
    label: input.label.trim(),
    placeholder: input.placeholder.trim(),
    field_type: input.fieldType,
    options: input.options,
    required: input.required,
  })
  if (error) return fail(error.message)
  refreshPortal(portal)
  return { ok: true, message: "Question added." }
}

export async function updateIntakeField(
  portal: string,
  fieldId: string,
  input: IntakeFieldInput,
): Promise<ActionResult> {
  const actor = await requireIntakeAdmin(portal)
  if (!actor || !validIntakeField(input)) return fail("Complete the question details.")
  const { error } = await actor.supabase
    .from("intake_form_fields")
    .update({
      section_number: input.sectionNumber,
      section_title: input.sectionTitle.trim(),
      field_order: input.fieldOrder,
      label: input.label.trim(),
      placeholder: input.placeholder.trim(),
      field_type: input.fieldType,
      options: input.options,
      required: input.required,
    })
    .eq("id", fieldId)
  if (error) return fail(error.message)
  refreshPortal(portal)
  return { ok: true, message: "Question updated." }
}

export async function removeIntakeField(
  portal: string,
  fieldId: string,
): Promise<ActionResult> {
  const actor = await requireIntakeAdmin(portal)
  if (!actor) return fail("Only administrators can remove questions.")
  const { error } = await actor.supabase
    .from("intake_form_fields")
    .update({ is_active: false })
    .eq("id", fieldId)
  if (error) return fail(error.message)
  refreshPortal(portal)
  return { ok: true, message: "Question removed from the form." }
}

export async function createIntakeUploadTarget(
  portal: string,
  submissionId: string,
  fieldId: string,
  fileName: string,
  fileSize: number,
): Promise<
  ActionResult & {
    path?: string
    token?: string
    supabaseUrl?: string
    anonKey?: string
  }
> {
  const actor = await requireIntakeAdmin(portal)
  if (!actor?.user) return fail("Only administrators can upload intake files.")
  if (fileSize <= 0 || fileSize > 10 * 1024 * 1024) {
    return fail("Each file must be smaller than 10 MB.")
  }
  const safeName =
    fileName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9._-]+/g, "-")
      .slice(-100) || "file"
  const path = `${actor.user.id}/${submissionId}/${fieldId}/${crypto.randomUUID()}-${safeName}`
  const { data, error } = await actor.supabase.storage
    .from("business-intake")
    .createSignedUploadUrl(path)
  if (error || !data) return fail(error?.message || "Unable to prepare the upload.")
  const { url, anonKey } = getSupabaseConfig()
  return {
    ok: true,
    message: "Upload ready.",
    path,
    token: data.token,
    supabaseUrl: url,
    anonKey,
  }
}

export async function recordIntakeFile(
  portal: string,
  submissionId: string,
  fieldId: string,
  storagePath: string,
  fileName: string,
  mimeType: string,
  fileSize: number,
): Promise<ActionResult> {
  const actor = await requireIntakeAdmin(portal)
  if (!actor?.user) return fail("Only administrators can record intake files.")
  const expectedPrefix = `${actor.user.id}/${submissionId}/${fieldId}/`
  if (!storagePath.startsWith(expectedPrefix) || fileSize > 10 * 1024 * 1024) {
    return fail("Invalid upload metadata.")
  }
  const { error } = await actor.supabase.from("intake_files").insert({
    submission_id: submissionId,
    field_id: fieldId,
    storage_path: storagePath,
    file_name: fileName,
    mime_type: mimeType || null,
    file_size: fileSize,
    uploaded_by: actor.user.id,
  })
  if (error) return fail(error.message)
  refreshPortal(portal)
  return { ok: true, message: "File saved." }
}
