import { Project } from '../types';

interface Props {
  project?: Project;
}

export function ProjectOverview({ project }: Props) {
  if (!project) {
    return <div className="card">Select a project to view details.</div>;
  }

  const completion = Math.round((project.tasksCompleted / project.tasksTotal) * 100);

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="section-title">Overview</p>
          <h1 className="text-xl font-semibold">{project.name}</h1>
          <p className="text-sm text-muted">{project.sector} • {project.stage}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted">Priority</p>
          <p className="text-2xl font-bold text-white">{project.priorityScore}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-sm text-muted">
        <div className="bg-white/5 rounded-lg p-3">
          <p className="text-xs uppercase tracking-wide text-muted">Next milestone</p>
          <p className="text-white font-semibold leading-tight mt-1">{project.nextMilestone}</p>
          <p className="text-xs text-muted mt-1">Due {project.dueDate}</p>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <p className="text-xs uppercase tracking-wide text-muted">Progress</p>
          <div className="flex items-end justify-between mt-2">
            <p className="text-2xl font-bold text-white">{completion}%</p>
            <p className="text-xs text-muted">{project.tasksCompleted}/{project.tasksTotal} tasks</p>
          </div>
          <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-2 bg-accent" style={{ width: `${completion}%` }}></div>
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <p className="text-xs uppercase tracking-wide text-muted">Time</p>
          <p className="text-2xl font-bold text-white">{project.timeSpentHours}h</p>
          <p className="text-xs text-muted">of {project.estimatedHours}h planned</p>
        </div>
      </div>
    </div>
  );
}
