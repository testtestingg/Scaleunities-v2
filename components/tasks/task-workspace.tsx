"use client"

import Link from "next/link"
import { useMemo, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import {
  Activity,
  Archive,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  ClipboardList,
  Clock3,
  Filter,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Trash2,
  UserRound,
  Users,
  X,
} from "lucide-react"
import {
  addComment,
  archiveTask,
  createBusiness,
  createTask,
  deleteTask,
  signOut,
  updateProfileRole,
  updateTask,
  updateTaskStatus,
  type ActionResult,
  type TaskInput,
} from "@/app/task/actions"
import type {
  Business,
  DashboardData,
  Task,
  TaskPriority,
  TaskStatus,
  UserRole,
} from "@/lib/task-types"

const statusLabels: Record<TaskStatus, string> = {
  to_do: "To Do",
  in_progress: "In Progress",
  under_review: "Under Review",
  blocked: "Blocked",
  completed: "Completed",
  cancelled: "Cancelled",
}

const priorityLabels: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
}

const statusStyles: Record<TaskStatus, string> = {
  to_do: "bg-slate-100 text-slate-700",
  in_progress: "bg-blue-50 text-blue-700",
  under_review: "bg-violet-50 text-violet-700",
  blocked: "bg-amber-50 text-amber-800",
  completed: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-zinc-100 text-zinc-500",
}

const priorityStyles: Record<TaskPriority, string> = {
  low: "text-slate-500",
  medium: "text-blue-600",
  high: "text-orange-600",
  urgent: "text-red-600",
}

function formatDate(value: string | null, includeTime = false) {
  if (!value) return "No due date"
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...(includeTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  }).format(new Date(value))
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function isOverdue(task: Task) {
  if (!task.due_date || task.status === "completed" || task.status === "cancelled") return false
  return new Date(`${task.due_date}T23:59:59`) < new Date()
}

function Avatar({
  name,
  color,
  size = "md",
}: {
  name: string
  color?: string
  size?: "sm" | "md" | "lg"
}) {
  const sizes = { sm: "h-7 w-7 text-[10px]", md: "h-9 w-9 text-xs", lg: "h-11 w-11 text-sm" }
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-bold text-white ${sizes[size]}`}
      style={{ backgroundColor: color || "#6B21A8" }}
      title={name}
    >
      {initials(name)}
    </span>
  )
}

export function TaskWorkspace({
  portal,
  section,
  data,
}: {
  portal: string
  section: string
  data: DashboardData
}) {
  const router = useRouter()
  const [mobileNav, setMobileNav] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [editorTask, setEditorTask] = useState<Task | "new" | null>(null)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [personFilter, setPersonFilter] = useState("all")
  const [businessFilter, setBusinessFilter] = useState("all")
  const [notice, setNotice] = useState<ActionResult | null>(null)
  const [pending, startTransition] = useTransition()

  const isManager = ["admin", "project_manager"].includes(data.profile.role)
  const selectedTask = data.tasks.find((task) => task.id === selectedTaskId) || null

  const navigation = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, show: true },
    { id: "my-tasks", label: "My Tasks", icon: ClipboardList, show: true },
    { id: "all-tasks", label: "All Tasks", icon: CircleDot, show: isManager },
    { id: "businesses", label: "Businesses", icon: BriefcaseBusiness, show: true },
    { id: "team", label: "Team Members", icon: Users, show: data.profile.role === "admin" },
  ].filter((item) => item.show)

  function runAction(action: () => Promise<ActionResult>, onSuccess?: () => void) {
    setNotice(null)
    startTransition(async () => {
      const result = await action()
      setNotice(result)
      if (result.ok) {
        onSuccess?.()
        router.refresh()
      }
    })
  }

  const visibleTasks = useMemo(() => {
    let tasks =
      section === "my-tasks"
        ? data.tasks.filter((task) => task.assignee?.id === data.profile.id)
        : data.tasks

    if (section === "overview") return tasks

    const term = search.trim().toLowerCase()
    return tasks.filter((task) => {
      const matchesSearch =
        !term ||
        [task.task_id, task.title, task.description, task.business?.name]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(term))
      return (
        matchesSearch &&
        (statusFilter === "all" || task.status === statusFilter) &&
        (personFilter === "all" || task.assignee?.id === personFilter) &&
        (businessFilter === "all" || task.business?.id === businessFilter)
      )
    })
  }, [
    businessFilter,
    data.profile.id,
    data.tasks,
    personFilter,
    search,
    section,
    statusFilter,
  ])

  const pageTitles: Record<string, [string, string]> = {
    overview: ["Good work starts with clarity.", "Here is what is moving across ScaleUnities today."],
    "my-tasks": ["My Tasks", "Everything currently assigned to you."],
    "all-tasks": ["All Tasks", "Monitor and coordinate work across the whole team."],
    businesses: ["Businesses", "The clients and internal projects connected to team work."],
    team: ["Team Members", "Manage access and responsibilities for approved accounts."],
  }

  const [title, subtitle] = pageTitles[section] || pageTitles.overview

  return (
    <main className="min-h-screen bg-[#f7f5fa] text-[#281f2e]">
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[272px] flex-col border-r border-white/10 bg-[#24162d] text-white transition-transform duration-200 lg:translate-x-0 ${
          mobileNav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <Link href={`/task/${portal}/dashboard`} className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white p-1 shadow-sm">
              <img
                src="/scaleunities-logo.png"
                alt="ScaleUnities logo"
                className="h-full w-full object-contain"
              />
            </span>
            <span>
              <span className="block text-sm font-bold">ScaleUnities</span>
              <span className="block text-[10px] uppercase tracking-[0.16em] text-white/45">
                Team Workspace
              </span>
            </span>
          </Link>
          <button className="lg:hidden" onClick={() => setMobileNav(false)} aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-4 py-7">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
            Workspace
          </p>
          {navigation.map((item) => {
            const Icon = item.icon
            const active = section === item.id
            const href =
              item.id === "overview"
                ? `/task/${portal}/dashboard`
                : `/task/${portal}/dashboard/${item.id}`
            return (
              <Link
                key={item.id}
                href={href}
                onClick={() => setMobileNav(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-white text-[#2c1b35]"
                    : "text-white/65 hover:bg-white/8 hover:text-white"
                }`}
              >
                <Icon className={`h-[18px] w-[18px] ${active ? "text-[#6B21A8]" : ""}`} />
                {item.label}
                {item.id === "my-tasks" && (
                  <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[10px]">
                    {data.tasks.filter((task) => task.assignee?.id === data.profile.id).length}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <Avatar
              name={data.profile.full_name}
              color={data.profile.avatar_color}
              size="md"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{data.profile.full_name}</p>
              <p className="truncate text-[11px] capitalize text-white/45">
                {data.profile.role.replace("_", " ")}
              </p>
            </div>
          </div>
          <button
            onClick={() => startTransition(() => signOut(portal))}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/55 transition hover:bg-white/8 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      {mobileNav && (
        <button
          className="fixed inset-0 z-40 bg-[#170e1d]/55 lg:hidden"
          onClick={() => setMobileNav(false)}
          aria-label="Close navigation"
        />
      )}

      <div className="lg:pl-[272px]">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#e9e3ed] bg-[#f7f5fa]/90 px-5 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-4">
            <button
              className="rounded-xl border border-[#ded6e4] bg-white p-2.5 lg:hidden"
              onClick={() => setMobileNav(true)}
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8f8595]">
                {new Intl.DateTimeFormat("en", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                }).format(new Date())}
              </p>
              <p className="mt-1 text-sm font-semibold text-[#372b3d]">
                {section === "overview" ? `Hello, ${data.profile.full_name}` : title}
              </p>
            </div>
          </div>
          {data.profile.role === "admin" && (
            <button
              onClick={() => setEditorTask("new")}
              className="flex h-10 items-center gap-2 rounded-xl bg-[#6B21A8] px-4 text-sm font-bold text-white transition hover:bg-[#571a89]"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New task</span>
            </button>
          )}
        </header>

        <div className="mx-auto max-w-[1500px] p-5 sm:p-8 lg:p-10">
          <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              {section === "overview" && (
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#6B21A8]">
                  Daily overview
                </p>
              )}
              <h1 className="font-serif text-4xl leading-tight text-[#241b2b] sm:text-5xl">
                {title}
              </h1>
              <p className="mt-3 text-sm leading-6 text-[#7c7282]">{subtitle}</p>
            </div>
            {isManager && section === "overview" && (
              <Link
                href={`/task/${portal}/dashboard/all-tasks`}
                className="flex items-center gap-2 text-sm font-bold text-[#6B21A8]"
              >
                View all work <ArrowUpRight className="h-4 w-4" />
              </Link>
            )}
          </section>

          {notice && (
            <div
              className={`mb-6 flex items-center justify-between rounded-xl border px-4 py-3 text-sm ${
                notice.ok
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
              role="status"
            >
              <span>{notice.message}</span>
              <button onClick={() => setNotice(null)} aria-label="Dismiss message">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {section === "overview" && (
            <Overview
              data={data}
              portal={portal}
              onOpenTask={setSelectedTaskId}
              onOpenEditor={setEditorTask}
            />
          )}
          {(section === "my-tasks" || section === "all-tasks") && (
            <TaskList
              tasks={visibleTasks}
              data={data}
              search={search}
              setSearch={setSearch}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              personFilter={personFilter}
              setPersonFilter={setPersonFilter}
              businessFilter={businessFilter}
              setBusinessFilter={setBusinessFilter}
              showPeople={section === "all-tasks"}
              onOpenTask={setSelectedTaskId}
              onEditTask={setEditorTask}
              onStatus={(taskId, status) =>
                runAction(() => updateTaskStatus(portal, taskId, status))
              }
            />
          )}
          {section === "businesses" && (
            <BusinessesView
              businesses={data.businesses}
              tasks={data.tasks}
              canCreate={data.profile.role === "admin"}
              pending={pending}
              onCreate={(name, color) =>
                runAction(() => createBusiness(portal, name, color))
              }
            />
          )}
          {section === "team" && (
            <TeamView
              data={data}
              pending={pending}
              onRole={(id, role) =>
                runAction(() => updateProfileRole(portal, id, role))
              }
            />
          )}
        </div>
      </div>

      {selectedTask && (
        <TaskDetail
          task={selectedTask}
          data={data}
          pending={pending}
          onClose={() => setSelectedTaskId(null)}
          onEdit={() => {
            setSelectedTaskId(null)
            setEditorTask(selectedTask)
          }}
          onStatus={(status) =>
            runAction(() => updateTaskStatus(portal, selectedTask.id, status))
          }
          onComment={(body, isPmNote) =>
            runAction(() => addComment(portal, selectedTask.id, body, isPmNote))
          }
          onArchive={() =>
            runAction(() => archiveTask(portal, selectedTask.id), () =>
              setSelectedTaskId(null),
            )
          }
          onDelete={() =>
            runAction(() => deleteTask(portal, selectedTask.id), () =>
              setSelectedTaskId(null),
            )
          }
        />
      )}

      {editorTask && (
        <TaskEditor
          task={editorTask}
          data={data}
          pending={pending}
          onClose={() => setEditorTask(null)}
          onSave={(input) =>
            runAction(
              () =>
                editorTask === "new"
                  ? createTask(portal, input)
                  : updateTask(portal, editorTask.id, input),
              () => setEditorTask(null),
            )
          }
        />
      )}
    </main>
  )
}

function Overview({
  data,
  portal,
  onOpenTask,
  onOpenEditor,
}: {
  data: DashboardData
  portal: string
  onOpenTask: (id: string) => void
  onOpenEditor: (task: Task | "new") => void
}) {
  const tasks = data.tasks
  const metrics = [
    { label: "Total tasks", value: tasks.length, icon: ClipboardList, tone: "text-[#6B21A8] bg-[#f0e7f6]" },
    { label: "In progress", value: tasks.filter((task) => task.status === "in_progress").length, icon: Clock3, tone: "text-blue-700 bg-blue-50" },
    { label: "Completed", value: tasks.filter((task) => task.status === "completed").length, icon: CheckCircle2, tone: "text-emerald-700 bg-emerald-50" },
    { label: "Overdue", value: tasks.filter(isOverdue).length, icon: CalendarDays, tone: "text-red-700 bg-red-50" },
  ]
  const activeTasks =
    data.profile.role === "member"
      ? tasks.filter((task) => task.assignee?.id === data.profile.id).slice(0, 6)
      : tasks.slice(0, 6)

  return (
    <div className="space-y-7">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, icon: Icon, tone }) => (
          <article key={label} className="rounded-2xl border border-[#e7e1eb] bg-white p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-[#887f8d]">{label}</p>
                <p className="mt-3 font-serif text-4xl text-[#2a2030]">{value}</p>
              </div>
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}>
                <Icon className="h-5 w-5" />
              </span>
            </div>
          </article>
        ))}
      </section>

      <div className="grid gap-7 xl:grid-cols-[1.7fr_0.8fr]">
        <section className="overflow-hidden rounded-2xl border border-[#e7e1eb] bg-white">
          <div className="flex items-center justify-between border-b border-[#eee9f1] px-5 py-4 sm:px-6">
            <div>
              <h2 className="font-serif text-2xl">Priority work</h2>
              <p className="mt-1 text-xs text-[#8a818f]">Recently updated active tasks</p>
            </div>
            {data.profile.role === "admin" && (
              <button
                onClick={() => onOpenEditor("new")}
                className="rounded-lg border border-[#ded5e4] px-3 py-2 text-xs font-bold text-[#6B21A8]"
              >
                Add task
              </button>
            )}
          </div>
          {activeTasks.length ? (
            <div className="divide-y divide-[#f0ebf2]">
              {activeTasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => onOpenTask(task.id)}
                  className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4 text-left transition hover:bg-[#fbf9fc] sm:px-6"
                >
                  <span className="h-9 w-1 rounded-full" style={{ backgroundColor: task.business?.color || "#6B21A8" }} />
                  <span className="min-w-0">
                    <span className="mb-1 flex items-center gap-2">
                      <span className="text-[10px] font-bold tracking-wide text-[#918797]">{task.task_id}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusStyles[task.status]}`}>
                        {statusLabels[task.status]}
                      </span>
                    </span>
                    <span className="block truncate text-sm font-bold text-[#302637]">{task.title}</span>
                    <span className="mt-1 block text-xs text-[#8c8391]">{task.business?.name}</span>
                  </span>
                  {task.assignee && <Avatar name={task.assignee.full_name} color={task.assignee.avatar_color} size="sm" />}
                </button>
              ))}
            </div>
          ) : (
            <EmptyState label="No active tasks yet" />
          )}
        </section>

        <section className="rounded-2xl border border-[#e7e1eb] bg-white p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl">Recent activity</h2>
              <p className="mt-1 text-xs text-[#8a818f]">Latest team updates</p>
            </div>
            <Activity className="h-5 w-5 text-[#6B21A8]" />
          </div>
          <div className="space-y-5">
            {data.activities.slice(0, 7).map((item) => (
              <div key={item.id} className="flex gap-3">
                <Avatar
                  name={item.actor?.full_name || "System"}
                  color={item.actor?.avatar_color || "#8b8090"}
                  size="sm"
                />
                <div className="min-w-0">
                  <p className="text-xs leading-5 text-[#554b5b]">
                    <span className="font-bold">{item.actor?.full_name || "System"}</span>{" "}
                    {activityLabel(item.action)}{" "}
                    <button
                      onClick={() => item.task && onOpenTask(item.task.id)}
                      className="font-semibold text-[#6B21A8] hover:underline"
                    >
                      {item.task?.task_id}
                    </button>
                  </p>
                  <p className="mt-0.5 text-[10px] text-[#9b929f]">{formatDate(item.created_at, true)}</p>
                </div>
              </div>
            ))}
            {!data.activities.length && <EmptyState label="Activity will appear here" compact />}
          </div>
          <Link href={`/task/${portal}/dashboard/my-tasks`} className="mt-6 flex items-center gap-1 text-xs font-bold text-[#6B21A8]">
            Open my tasks <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </section>
      </div>

      {data.profile.role !== "member" && (
        <section className="rounded-2xl border border-[#e7e1eb] bg-white p-5 sm:p-6">
          <h2 className="font-serif text-2xl">Team workload</h2>
          <p className="mt-1 text-xs text-[#8a818f]">Open tasks currently assigned to each person</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {data.profiles.map((profile) => {
              const assigned = tasks.filter(
                (task) => task.assignee?.id === profile.id && task.status !== "completed",
              )
              const completed = tasks.filter(
                (task) => task.assignee?.id === profile.id && task.status === "completed",
              ).length
              return (
                <div key={profile.id} className="rounded-xl border border-[#ece7ef] p-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={profile.full_name} color={profile.avatar_color} />
                    <div>
                      <p className="text-sm font-bold">{profile.full_name}</p>
                      <p className="text-[10px] capitalize text-[#8f8594]">{profile.role.replace("_", " ")}</p>
                    </div>
                  </div>
                  <div className="mt-5 flex items-end justify-between">
                    <div>
                      <p className="font-serif text-3xl">{assigned.length}</p>
                      <p className="text-[10px] text-[#8f8594]">open tasks</p>
                    </div>
                    <p className="text-xs font-semibold text-emerald-700">{completed} done</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}

function TaskList({
  tasks,
  data,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  personFilter,
  setPersonFilter,
  businessFilter,
  setBusinessFilter,
  showPeople,
  onOpenTask,
  onEditTask,
  onStatus,
}: {
  tasks: Task[]
  data: DashboardData
  search: string
  setSearch: (value: string) => void
  statusFilter: string
  setStatusFilter: (value: string) => void
  personFilter: string
  setPersonFilter: (value: string) => void
  businessFilter: string
  setBusinessFilter: (value: string) => void
  showPeople: boolean
  onOpenTask: (id: string) => void
  onEditTask: (task: Task) => void
  onStatus: (id: string, status: TaskStatus) => void
}) {
  const canEdit = ["admin", "project_manager"].includes(data.profile.role)
  return (
    <section className="overflow-hidden rounded-2xl border border-[#e7e1eb] bg-white">
      <div className="border-b border-[#eee9f1] p-4 sm:p-5">
        <div className="flex flex-col gap-3 xl:flex-row">
          <label className="relative min-w-0 flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a909f]" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by task ID, title or business…"
              className="h-11 w-full rounded-xl border border-[#e1dae6] bg-[#fbfafc] pl-10 pr-4 text-sm outline-none focus:border-[#6B21A8]"
            />
          </label>
          <div className="grid grid-cols-2 gap-2 sm:flex">
            <FilterSelect value={statusFilter} onChange={setStatusFilter} label="All statuses">
              {Object.entries(statusLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </FilterSelect>
            <FilterSelect value={businessFilter} onChange={setBusinessFilter} label="All businesses">
              {data.businesses.map((business) => (
                <option key={business.id} value={business.id}>{business.name}</option>
              ))}
            </FilterSelect>
            {showPeople && (
              <FilterSelect value={personFilter} onChange={setPersonFilter} label="All people">
                {data.profiles.map((profile) => (
                  <option key={profile.id} value={profile.id}>{profile.full_name}</option>
                ))}
              </FilterSelect>
            )}
          </div>
        </div>
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[940px] text-left">
          <thead className="bg-[#faf8fb] text-[10px] font-bold uppercase tracking-[0.12em] text-[#8d8392]">
            <tr>
              <th className="px-5 py-3.5">Task</th>
              <th className="px-4 py-3.5">Business</th>
              <th className="px-4 py-3.5">Assigned</th>
              <th className="px-4 py-3.5">Status</th>
              <th className="px-4 py-3.5">Priority</th>
              <th className="px-4 py-3.5">Due date</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0ebf2]">
            {tasks.map((task) => (
              <tr key={task.id} className="group transition hover:bg-[#fbf9fc]">
                <td className="max-w-[310px] px-5 py-4">
                  <button onClick={() => onOpenTask(task.id)} className="block w-full text-left">
                    <span className="block text-[10px] font-bold tracking-wide text-[#6B21A8]">{task.task_id}</span>
                    <span className="mt-1 block truncate text-sm font-bold text-[#312738]">{task.title}</span>
                  </button>
                </td>
                <td className="px-4 py-4 text-xs font-semibold text-[#5f5565]">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: task.business?.color || "#aaa" }} />
                    {task.business?.name || "—"}
                  </span>
                </td>
                <td className="px-4 py-4">
                  {task.assignee && (
                    <span className="flex items-center gap-2 text-xs font-semibold">
                      <Avatar name={task.assignee.full_name} color={task.assignee.avatar_color} size="sm" />
                      {task.assignee.full_name}
                    </span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <select
                    value={task.status}
                    onChange={(event) => onStatus(task.id, event.target.value as TaskStatus)}
                    className={`rounded-full border-0 px-2.5 py-1 text-[11px] font-bold outline-none ${statusStyles[task.status]}`}
                    aria-label={`Status for ${task.task_id}`}
                  >
                    {Object.entries(statusLabels)
                      .filter(([value]) =>
                        data.profile.role === "member"
                          ? ["to_do", "in_progress", "completed"].includes(value)
                          : true,
                      )
                      .map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </td>
                <td className={`px-4 py-4 text-xs font-bold ${priorityStyles[task.priority]}`}>
                  {priorityLabels[task.priority]}
                </td>
                <td className={`px-4 py-4 text-xs font-medium ${isOverdue(task) ? "text-red-600" : "text-[#6f6575]"}`}>
                  {formatDate(task.due_date)}
                </td>
                <td className="px-5 py-4 text-right">
                  <button
                    onClick={() => (canEdit ? onEditTask(task) : onOpenTask(task.id))}
                    className="rounded-lg p-2 text-[#877d8c] hover:bg-[#f0e8f5] hover:text-[#6B21A8]"
                    aria-label={canEdit ? `Edit ${task.task_id}` : `Open ${task.task_id}`}
                  >
                    {canEdit ? <Settings2 className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-[#f0ebf2] md:hidden">
        {tasks.map((task) => (
          <button key={task.id} onClick={() => onOpenTask(task.id)} className="w-full p-4 text-left">
            <span className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#6B21A8]">{task.task_id}</span>
              <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${statusStyles[task.status]}`}>
                {statusLabels[task.status]}
              </span>
            </span>
            <span className="mt-2 block text-sm font-bold">{task.title}</span>
            <span className="mt-3 flex items-center justify-between text-xs text-[#83798a]">
              <span>{task.business?.name}</span>
              <span className={isOverdue(task) ? "text-red-600" : ""}>{formatDate(task.due_date)}</span>
            </span>
          </button>
        ))}
      </div>
      {!tasks.length && <EmptyState label="No tasks match these filters" />}
    </section>
  )
}

function FilterSelect({
  value,
  onChange,
  label,
  children,
}: {
  value: string
  onChange: (value: string) => void
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="relative">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full appearance-none rounded-xl border border-[#e1dae6] bg-white pl-3 pr-9 text-xs font-semibold text-[#5d5363] outline-none focus:border-[#6B21A8] sm:w-auto"
      >
        <option value="all">{label}</option>
        {children}
      </select>
      <Filter className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#998f9d]" />
    </label>
  )
}

function BusinessesView({
  businesses,
  tasks,
  canCreate,
  pending,
  onCreate,
}: {
  businesses: Business[]
  tasks: Task[]
  canCreate: boolean
  pending: boolean
  onCreate: (name: string, color: string) => void
}) {
  const [showForm, setShowForm] = useState(false)
  return (
    <div>
      <div className="mb-5 flex justify-end">
        {canCreate && (
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 rounded-xl bg-[#6B21A8] px-4 py-2.5 text-sm font-bold text-white">
            <Plus className="h-4 w-4" /> Add business
          </button>
        )}
      </div>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {businesses.map((business) => {
          const connected = tasks.filter((task) => task.business?.id === business.id)
          const open = connected.filter((task) => task.status !== "completed" && task.status !== "cancelled").length
          return (
            <article key={business.id} className="rounded-2xl border border-[#e7e1eb] bg-white p-5">
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl text-white" style={{ backgroundColor: business.color }}>
                  <BriefcaseBusiness className="h-5 w-5" />
                </span>
                <MoreHorizontal className="h-5 w-5 text-[#9b929f]" />
              </div>
              <h2 className="mt-5 font-serif text-2xl">{business.name}</h2>
              <div className="mt-6 grid grid-cols-2 border-t border-[#eee9f1] pt-4">
                <div>
                  <p className="font-serif text-2xl">{connected.length}</p>
                  <p className="text-[10px] uppercase tracking-wide text-[#918797]">Total tasks</p>
                </div>
                <div>
                  <p className="font-serif text-2xl">{open}</p>
                  <p className="text-[10px] uppercase tracking-wide text-[#918797]">Open now</p>
                </div>
              </div>
            </article>
          )
        })}
      </section>
      {showForm && (
        <SimpleModal title="Add a business" onClose={() => setShowForm(false)}>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              const form = new FormData(event.currentTarget)
              onCreate(String(form.get("name")), String(form.get("color")))
              setShowForm(false)
            }}
            className="space-y-4"
          >
            <Field label="Business or project name">
              <input required name="name" className="form-input" placeholder="Client or internal project" />
            </Field>
            <Field label="Label colour">
              <input name="color" type="color" defaultValue="#6B21A8" className="h-11 w-full rounded-xl border border-[#ded7e2] p-1" />
            </Field>
            <ModalActions pending={pending} onCancel={() => setShowForm(false)} submitLabel="Add business" />
          </form>
        </SimpleModal>
      )}
    </div>
  )
}

function TeamView({
  data,
  pending,
  onRole,
}: {
  data: DashboardData
  pending: boolean
  onRole: (id: string, role: UserRole) => void
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#e7e1eb] bg-white">
      <div className="border-b border-[#eee9f1] px-5 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-[#6B21A8]" />
          <div>
            <h2 className="font-serif text-2xl">Approved team accounts</h2>
            <p className="text-xs text-[#8a818f]">New accounts are invited from Supabase Authentication.</p>
          </div>
        </div>
      </div>
      <div className="divide-y divide-[#f0ebf2]">
        {data.profiles.map((profile) => {
          const assigned = data.tasks.filter((task) => task.assignee?.id === profile.id)
          return (
            <div key={profile.id} className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <Avatar name={profile.full_name} color={profile.avatar_color} size="lg" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{profile.full_name}</p>
                  <p className="truncate text-xs text-[#8b8290]">{profile.email}</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <span className="text-xs text-[#8b8290]">{assigned.length} assigned</span>
                <select
                  disabled={pending}
                  value={profile.role}
                  onChange={(event) => onRole(profile.id, event.target.value as UserRole)}
                  className="h-10 rounded-xl border border-[#ded7e2] bg-white px-3 text-xs font-semibold capitalize outline-none"
                >
                  <option value="admin">Administrator</option>
                  <option value="project_manager">Project manager</option>
                  <option value="member">Team member</option>
                </select>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function TaskDetail({
  task,
  data,
  pending,
  onClose,
  onEdit,
  onStatus,
  onComment,
  onArchive,
  onDelete,
}: {
  task: Task
  data: DashboardData
  pending: boolean
  onClose: () => void
  onEdit: () => void
  onStatus: (status: TaskStatus) => void
  onComment: (body: string, isPmNote: boolean) => void
  onArchive: () => void
  onDelete: () => void
}) {
  const [comment, setComment] = useState("")
  const [isPmNote, setIsPmNote] = useState(false)
  const comments = data.comments.filter((item) => item.task_id === task.id)
  const canManage = ["admin", "project_manager"].includes(data.profile.role)
  return (
    <div className="fixed inset-0 z-[70] flex justify-end bg-[#170e1d]/45" role="dialog" aria-modal="true">
      <button className="absolute inset-0" onClick={onClose} aria-label="Close task detail" />
      <section className="relative flex h-full w-full max-w-2xl flex-col overflow-hidden bg-[#faf8fb] shadow-2xl">
        <header className="flex items-center justify-between border-b border-[#e8e1ec] bg-white px-5 py-4 sm:px-7">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#6B21A8]">{task.task_id}</span>
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyles[task.status]}`}>{statusLabels[task.status]}</span>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-[#f2edf4]" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold" style={{ color: task.business?.color }}>{task.business?.name}</p>
              <h2 className="mt-2 font-serif text-4xl leading-tight">{task.title}</h2>
            </div>
            {canManage && (
              <button onClick={onEdit} className="shrink-0 rounded-xl border border-[#ddd5e3] bg-white px-3 py-2 text-xs font-bold text-[#6B21A8]">
                Edit task
              </button>
            )}
          </div>
          <p className="mt-6 whitespace-pre-wrap text-sm leading-7 text-[#655b6b]">
            {task.description || "No description was added."}
          </p>

          <div className="mt-7 grid gap-3 rounded-2xl border border-[#e8e1ec] bg-white p-4 sm:grid-cols-2">
            <DetailItem label="Assigned to">
              {task.assignee ? (
                <span className="flex items-center gap-2 font-semibold">
                  <Avatar name={task.assignee.full_name} color={task.assignee.avatar_color} size="sm" />
                  {task.assignee.full_name}
                </span>
              ) : "—"}
            </DetailItem>
            <DetailItem label="Priority">
              <span className={`font-bold ${priorityStyles[task.priority]}`}>{priorityLabels[task.priority]}</span>
            </DetailItem>
            <DetailItem label="Created">{formatDate(task.created_at, true)}</DetailItem>
            <DetailItem label="Last updated">{formatDate(task.updated_at, true)}</DetailItem>
            <DetailItem label="Due date">
              <span className={isOverdue(task) ? "font-semibold text-red-600" : ""}>{formatDate(task.due_date)}</span>
            </DetailItem>
            <DetailItem label="Created by">{task.creator?.full_name || "—"}</DetailItem>
          </div>

          <div className="mt-7">
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#8a808f]">Update status</label>
            <select
              value={task.status}
              disabled={pending}
              onChange={(event) => onStatus(event.target.value as TaskStatus)}
              className="h-11 w-full rounded-xl border border-[#ded7e2] bg-white px-3 text-sm font-semibold outline-none focus:border-[#6B21A8]"
            >
              {Object.entries(statusLabels)
                .filter(([value]) =>
                  data.profile.role === "member"
                    ? ["to_do", "in_progress", "completed"].includes(value)
                    : true,
                )
                .map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div className="mt-9">
            <div className="mb-4 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-[#6B21A8]" />
              <h3 className="font-serif text-2xl">Progress notes</h3>
              <span className="text-xs text-[#918797]">{comments.length}</span>
            </div>
            <div className="space-y-4">
              {comments.map((item) => (
                <div key={item.id} className={`rounded-2xl border p-4 ${item.is_pm_note ? "border-[#d9c3e8] bg-[#f5eef9]" : "border-[#e7e1eb] bg-white"}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-xs font-bold">
                      <Avatar name={item.author?.full_name || "Team"} color={item.author?.avatar_color} size="sm" />
                      {item.author?.full_name || "Team member"}
                      {item.is_pm_note && <span className="rounded-full bg-[#6B21A8] px-2 py-0.5 text-[9px] uppercase tracking-wide text-white">PM note</span>}
                    </span>
                    <span className="text-[10px] text-[#9a919e]">{formatDate(item.created_at, true)}</span>
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-[#5f5565]">{item.body}</p>
                </div>
              ))}
              {!comments.length && <EmptyState label="No progress notes yet" compact />}
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                if (!comment.trim()) return
                onComment(comment, isPmNote)
                setComment("")
              }}
              className="mt-4 rounded-2xl border border-[#e3dce7] bg-white p-4"
            >
              <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Add a progress update or comment…"
                className="min-h-24 w-full resize-y border-0 text-sm leading-6 outline-none"
              />
              <div className="mt-3 flex items-center justify-between gap-3 border-t border-[#eee9f1] pt-3">
                {canManage ? (
                  <label className="flex items-center gap-2 text-xs font-semibold text-[#6f6575]">
                    <input type="checkbox" checked={isPmNote} onChange={(event) => setIsPmNote(event.target.checked)} className="accent-[#6B21A8]" />
                    Project-manager note
                  </label>
                ) : <span />}
                <button disabled={pending || !comment.trim()} className="rounded-xl bg-[#6B21A8] px-4 py-2 text-xs font-bold text-white disabled:opacity-50">
                  Add note
                </button>
              </div>
            </form>
          </div>
        </div>
        {data.profile.role === "admin" && (
          <footer className="flex items-center justify-end gap-2 border-t border-[#e8e1ec] bg-white px-5 py-4 sm:px-7">
            <button onClick={onArchive} disabled={pending} className="flex items-center gap-2 rounded-xl border border-[#ddd5e3] px-3 py-2 text-xs font-bold text-[#665c6c]">
              <Archive className="h-4 w-4" /> Archive
            </button>
            <button
              onClick={() => window.confirm(`Delete ${task.task_id} permanently?`) && onDelete()}
              disabled={pending}
              className="flex items-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-xs font-bold text-red-600"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </button>
          </footer>
        )}
      </section>
    </div>
  )
}

function TaskEditor({
  task,
  data,
  pending,
  onClose,
  onSave,
}: {
  task: Task | "new"
  data: DashboardData
  pending: boolean
  onClose: () => void
  onSave: (input: TaskInput) => void
}) {
  const existing = task === "new" ? null : task
  return (
    <SimpleModal title={existing ? `Edit ${existing.task_id}` : "Create a new task"} onClose={onClose} wide>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          const form = new FormData(event.currentTarget)
          onSave({
            title: String(form.get("title") || ""),
            description: String(form.get("description") || ""),
            businessId: String(form.get("businessId") || ""),
            assignedTo: String(form.get("assignedTo") || ""),
            status: String(form.get("status") || "to_do") as TaskStatus,
            priority: String(form.get("priority") || "medium") as TaskPriority,
            dueDate: String(form.get("dueDate") || ""),
          })
        }}
        className="space-y-5"
      >
        <Field label="Task title">
          <input required minLength={2} maxLength={180} name="title" defaultValue={existing?.title} className="form-input" placeholder="A clear, actionable task title" />
        </Field>
        <Field label="Description">
          <textarea name="description" defaultValue={existing?.description} className="form-input min-h-28 resize-y py-3" placeholder="Context, deliverables and acceptance criteria" />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Business">
            <select required name="businessId" defaultValue={existing?.business?.id || ""} className="form-input">
              <option value="" disabled>Select business</option>
              {data.businesses.map((business) => <option key={business.id} value={business.id}>{business.name}</option>)}
            </select>
          </Field>
          <Field label="Assigned to">
            <select required name="assignedTo" defaultValue={existing?.assignee?.id || ""} className="form-input">
              <option value="" disabled>Select team member</option>
              {data.profiles.map((profile) => <option key={profile.id} value={profile.id}>{profile.full_name}</option>)}
            </select>
          </Field>
          <Field label="Status">
            <select name="status" defaultValue={existing?.status || "to_do"} className="form-input">
              {Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </Field>
          <Field label="Priority">
            <select name="priority" defaultValue={existing?.priority || "medium"} className="form-input">
              {Object.entries(priorityLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </Field>
          <Field label="Due date">
            <input type="date" name="dueDate" defaultValue={existing?.due_date || ""} className="form-input" />
          </Field>
        </div>
        <ModalActions pending={pending} onCancel={onClose} submitLabel={existing ? "Save changes" : "Create task"} />
      </form>
    </SimpleModal>
  )
}

function SimpleModal({
  title,
  onClose,
  wide = false,
  children,
}: {
  title: string
  onClose: () => void
  wide?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#170e1d]/55 p-4" role="dialog" aria-modal="true">
      <button className="absolute inset-0" onClick={onClose} aria-label="Close dialog" />
      <section className={`relative max-h-[92vh] w-full overflow-y-auto rounded-3xl bg-white shadow-2xl ${wide ? "max-w-2xl" : "max-w-md"}`}>
        <header className="flex items-center justify-between border-b border-[#ece6ef] px-6 py-5">
          <h2 className="font-serif text-3xl">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-[#f3eef5]" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </header>
        <div className="p-6">{children}</div>
      </section>
    </div>
  )
}

function ModalActions({
  pending,
  onCancel,
  submitLabel,
}: {
  pending: boolean
  onCancel: () => void
  submitLabel: string
}) {
  return (
    <div className="flex justify-end gap-2 border-t border-[#eee9f1] pt-5">
      <button type="button" onClick={onCancel} className="rounded-xl border border-[#ddd5e3] px-4 py-2.5 text-sm font-bold text-[#645a6a]">
        Cancel
      </button>
      <button type="submit" disabled={pending} className="rounded-xl bg-[#6B21A8] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50">
        {pending ? "Saving…" : submitLabel}
      </button>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-[#514757]">{label}</span>
      {children}
    </label>
  )
}

function DetailItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-[#faf8fb] p-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#918797]">{label}</p>
      <div className="mt-2 text-xs text-[#504656]">{children}</div>
    </div>
  )
}

function EmptyState({ label, compact = false }: { label: string; compact?: boolean }) {
  return (
    <div className={`text-center text-sm text-[#948a99] ${compact ? "py-5" : "px-5 py-14"}`}>
      <Check className="mx-auto mb-2 h-5 w-5 text-[#b6acba]" />
      {label}
    </div>
  )
}

function activityLabel(action: string) {
  return (
    {
      task_created: "created",
      status_changed: "changed the status of",
      task_reassigned: "reassigned",
      task_archived: "archived",
      task_updated: "updated",
      comment_added: "commented on",
      pm_note_added: "added a PM note to",
    }[action] || "updated"
  )
}
