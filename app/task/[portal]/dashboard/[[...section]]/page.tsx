import { redirect } from "next/navigation"
import { AlertTriangle } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import type {
  Activity,
  Business,
  Comment,
  DashboardData,
  Profile,
  Task,
} from "@/lib/task-types"
import { TaskWorkspace } from "@/components/tasks/task-workspace"

export const dynamic = "force-dynamic"

const validSections = new Set(["overview", "my-tasks", "all-tasks", "businesses", "team"])

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ portal: string; section?: string[] }>
}) {
  const { portal, section } = await params
  const currentSection = section?.[0] || "overview"
  if (!validSections.has(currentSection)) redirect(`/task/${portal}/dashboard`)

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect(`/task/${portal}`)

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, email, role, is_active, avatar_color")
    .eq("id", user.id)
    .single()

  if (!profile?.is_active) {
    await supabase.auth.signOut()
    redirect(`/task/${portal}?error=Your%20account%20is%20not%20approved`)
  }

  if (
    (currentSection === "all-tasks" && profile.role === "member") ||
    (currentSection === "team" && profile.role !== "admin")
  ) {
    redirect(`/task/${portal}/dashboard/my-tasks`)
  }

  const [profilesResult, businessesResult, tasksResult, commentsResult, activityResult] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("id, full_name, email, role, is_active, avatar_color")
        .eq("is_active", true)
        .order("full_name"),
      supabase
        .from("businesses")
        .select("id, name, color, is_active, created_at")
        .eq("is_active", true)
        .order("name"),
      supabase
        .from("tasks")
        .select(
          "id, task_id, title, description, status, priority, due_date, created_at, updated_at, archived_at, business:businesses(id,name,color), assignee:profiles!tasks_assigned_to_fkey(id,full_name,email,avatar_color), creator:profiles!tasks_created_by_fkey(id,full_name,email,avatar_color)",
        )
        .is("archived_at", null)
        .order("updated_at", { ascending: false }),
      supabase
        .from("task_comments")
        .select(
          "id, task_id, body, is_pm_note, created_at, author:profiles!task_comments_author_id_fkey(id,full_name,avatar_color)",
        )
        .order("created_at", { ascending: true }),
      supabase
        .from("task_activity")
        .select(
          "id, action, details, created_at, actor:profiles!task_activity_actor_id_fkey(id,full_name,avatar_color), task:tasks(id,task_id,title)",
        )
        .order("created_at", { ascending: false })
        .limit(20),
    ])

  const firstError =
    profilesResult.error ||
    businessesResult.error ||
    tasksResult.error ||
    commentsResult.error ||
    activityResult.error

  if (firstError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f5fa] p-6">
        <div className="max-w-lg rounded-3xl border border-amber-200 bg-white p-8 text-center">
          <AlertTriangle className="mx-auto h-9 w-9 text-amber-600" />
          <h1 className="mt-4 font-serif text-3xl text-[#241b2b]">Workspace setup required</h1>
          <p className="mt-3 text-sm leading-6 text-[#746a7a]">
            The account is authenticated, but the task database is not ready yet. Run the
            supplied Supabase migration, then refresh this page.
          </p>
        </div>
      </main>
    )
  }

  const data: DashboardData = {
    profile: profile as Profile,
    profiles: (profilesResult.data || []) as Profile[],
    businesses: (businessesResult.data || []) as Business[],
    tasks: (tasksResult.data || []) as unknown as Task[],
    comments: (commentsResult.data || []) as unknown as Comment[],
    activities: (activityResult.data || []) as unknown as Activity[],
  }

  return <TaskWorkspace portal={portal} section={currentSection} data={data} />
}
