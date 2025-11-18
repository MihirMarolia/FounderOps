export type ProjectHealth = 'on_track' | 'watch' | 'at_risk';
export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'high' | 'medium' | 'low';

export interface Project {
  id: string;
  name: string;
  sector: string;
  stage: string;
  health: ProjectHealth;
  focusArea: string;
  priorityScore: number;
  nextMilestone: string;
  dueDate: string;
  timeSpentHours: number;
  estimatedHours: number;
  tasksCompleted: number;
  tasksTotal: number;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  category: string;
  priority: TaskPriority;
  durationMinutes: number;
  status: TaskStatus;
  deadline: string | null;
}

export interface DailyPlanItem {
  taskId: string;
  start: string;
  end: string;
  label: string;
}
