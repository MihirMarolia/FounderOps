'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { DailyPlanItem } from '../types';
import { useProjects } from '../hooks/useProjects';
import { ProjectList } from '../components/ProjectList';
import { ProjectOverview } from '../components/ProjectOverview';
import { TaskList } from '../components/TaskList';
import { DailyPlanPanel } from '../components/DailyPlanPanel';

const samplePlan: DailyPlanItem[] = [
  { taskId: 't2', start: '09:00', end: '09:50', label: 'Research filings' },
  { taskId: 't3', start: '10:00', end: '11:20', label: 'Spec MVP' },
  { taskId: 't1', start: '14:00', end: '14:45', label: 'Polish problem statement' },
  { taskId: 't2', start: '15:00', end: '15:50', label: 'Filings review' }
];

export default function DashboardPage() {
  const { projects, activeProject, tasks, selectedProjectId, setSelectedProjectId } = useProjects();

  return (
    <main className="max-w-6xl mx-auto py-10 px-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="section-title">FounderOps Assistant</p>
          <h1 className="text-2xl font-bold">Project Dashboard</h1>
          <p className="text-sm text-muted">AI-ranked tasks, progress, and market-aware priorities.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-white/5 rounded-lg px-3 py-2 border border-white/10 w-72">
            <MagnifyingGlassIcon className="h-5 w-5 text-muted" />
            <input
              className="bg-transparent border-none focus:outline-none text-sm ml-2 flex-1"
              placeholder="Search tasks, milestones"
            />
          </div>
          <button className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-indigo-500">Sync Calendar</button>
        </div>
      </header>

      <div className="grid grid-cols-dashboard gap-4">
        <ProjectList
          projects={projects}
          selectedProjectId={selectedProjectId}
          onSelect={setSelectedProjectId}
        />

        <div className="space-y-4">
          <ProjectOverview project={activeProject} />
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <TaskList tasks={tasks} />
            </div>
            <div>
              <DailyPlanPanel tasks={tasks} plan={samplePlan} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
