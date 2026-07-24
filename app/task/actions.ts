"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import { getPortalSlug, isValidPortal } from "@/lib/supabase/config"
import type { TaskPriority, TaskStatus, UserRole } from "@/lib/task-types"

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
