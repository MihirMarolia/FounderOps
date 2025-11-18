import { Project, Task } from '../types';

export const projects: Project[] = [
  {
    id: 'p1',
    name: 'Fintech Fraud Guard',
    sector: 'Fintech / Fraud',
    stage: 'MVP',
    health: 'on_track',
    focusArea: 'Research + Early Build',
    priorityScore: 92,
    nextMilestone: 'MVP experiment with 10 testers',
    dueDate: '2024-12-15',
    timeSpentHours: 46,
    estimatedHours: 72,
    tasksCompleted: 18,
    tasksTotal: 26
  },
  {
    id: 'p2',
    name: 'AI RevOps Copilot',
    sector: 'SaaS / Sales Ops',
    stage: 'Discovery',
    health: 'watch',
    focusArea: 'Customer discovery',
    priorityScore: 81,
    nextMilestone: 'Interview 8 revops leads',
    dueDate: '2024-12-08',
    timeSpentHours: 12,
    estimatedHours: 30,
    tasksCompleted: 6,
    tasksTotal: 14
  }
];

export const tasks: Task[] = [
  {
    id: 't1',
    projectId: 'p1',
    title: 'Draft problem statement',
    category: 'Research',
    priority: 'high',
    durationMinutes: 45,
    status: 'done',
    deadline: null
  },
  {
    id: 't2',
    projectId: 'p1',
    title: 'Map fraud signals from recent filings',
    category: 'Research',
    priority: 'high',
    durationMinutes: 50,
    status: 'in_progress',
    deadline: '2024-11-22'
  },
  {
    id: 't3',
    projectId: 'p1',
    title: 'Spec MVP workflow for dispute resolution',
    category: 'Planning',
    priority: 'medium',
    durationMinutes: 80,
    status: 'todo',
    deadline: '2024-11-24'
  },
  {
    id: 't4',
    projectId: 'p2',
    title: 'List ICP hypotheses for RevOps leaders',
    category: 'Research',
    priority: 'high',
    durationMinutes: 40,
    status: 'todo',
    deadline: '2024-11-23'
  },
  {
    id: 't5',
    projectId: 'p2',
    title: 'Define interview script v1',
    category: 'Planning',
    priority: 'medium',
    durationMinutes: 60,
    status: 'todo',
    deadline: null
  }
];
