export type UserRole = "admin" | "project_manager" | "member"
export type TaskStatus =
  | "to_do"
  | "in_progress"
  | "under_review"
  | "blocked"
  | "completed"
  | "cancelled"
export type TaskPriority = "low" | "medium" | "high" | "urgent"

export type Profile = {
  id: string
  full_name: string
  email: string
  role: UserRole
  is_active: boolean
  avatar_color: string
}

export type Business = {
  id: string
  name: string
  color: string
  is_active: boolean
  created_at: string
}

export type Task = {
  id: string
  task_id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  due_date: string | null
  created_at: string
  updated_at: string
  archived_at: string | null
  business: Pick<Business, "id" | "name" | "color"> | null
  assignee: Pick<Profile, "id" | "full_name" | "email" | "avatar_color"> | null
  creator: Pick<Profile, "id" | "full_name" | "email" | "avatar_color"> | null
}

export type Comment = {
  id: string
  task_id: string
  body: string
  is_pm_note: boolean
  created_at: string
  author: Pick<Profile, "id" | "full_name" | "avatar_color"> | null
}

export type Activity = {
  id: string
  action: string
  details: Record<string, string> | null
  created_at: string
  actor: Pick<Profile, "id" | "full_name" | "avatar_color"> | null
  task: { id: string; task_id: string; title: string } | null
}

export type IntakeFieldType =
  | "text"
  | "email"
  | "tel"
  | "url"
  | "textarea"
  | "radio"
  | "checkbox"
  | "time_range"
  | "file"
  | "number"
  | "date"

export type IntakeField = {
  id: string
  section_number: number
  section_title: string
  field_order: number
  field_key: string
  label: string
  placeholder: string
  field_type: IntakeFieldType
  options: string[]
  required: boolean
  is_active: boolean
  config: Record<string, string | boolean>
}

export type IntakeSubmission = {
  id: string
  display_name: string
  status: "draft" | "submitted"
  created_at: string
  updated_at: string
  submitted_at: string | null
  creator: Pick<Profile, "id" | "full_name"> | null
}

export type IntakeAnswer = {
  id: string
  submission_id: string
  field_id: string
  value: unknown
}

export type IntakeFile = {
  id: string
  submission_id: string
  field_id: string
  storage_path: string
  file_name: string
  mime_type: string | null
  file_size: number
  created_at: string
}

export type DashboardData = {
  profile: Profile
  profiles: Profile[]
  businesses: Business[]
  tasks: Task[]
  comments: Comment[]
  activities: Activity[]
  intakeFields: IntakeField[]
  intakeSubmissions: IntakeSubmission[]
  intakeAnswers: IntakeAnswer[]
  intakeFiles: IntakeFile[]
}
