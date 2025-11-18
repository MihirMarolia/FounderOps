import { Task } from '../types';
import { ArrowPathIcon, CheckIcon, ClockIcon } from '@heroicons/react/24/outline';

interface Props {
  tasks: Task[];
}

function StatusBadge({ status }: { status: Task['status'] }) {
  const map = {
    todo: { label: 'Todo', className: 'bg-white/5 text-gray-200' },
    in_progress: { label: 'In Progress', className: 'bg-amber-500/20 text-amber-200' },
    done: { label: 'Done', className: 'bg-emerald-500/20 text-emerald-200' }
  } as const;

  const value = map[status];
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${value.className}`}>{value.label}</span>;
}

function PriorityDot({ priority }: { priority: Task['priority'] }) {
  const color = {
    high: 'bg-rose-400',
    medium: 'bg-amber-300',
    low: 'bg-emerald-300'
  }[priority];

  return <span className={`h-2 w-2 rounded-full inline-block ${color}`} />;
}

export function TaskList({ tasks }: Props) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="section-title">Tasks</p>
          <p className="text-sm text-muted">AI-ranked focus blocks</p>
        </div>
        <button className="px-3 py-2 rounded-lg bg-white/10 text-sm hover:bg-white/20">Add task</button>
      </div>
      <div className="space-y-2">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
            <div className="flex items-center space-x-3">
              <PriorityDot priority={task.priority} />
              <div>
                <p className="font-semibold text-white">{task.title}</p>
                <p className="text-xs text-muted">{task.category}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-xs text-muted">
              {task.deadline && (
                <div className="flex items-center space-x-1">
                  <ClockIcon className="h-4 w-4" />
                  <span>Due {task.deadline}</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <ArrowPathIcon className="h-4 w-4" />
                <span>{task.durationMinutes}m</span>
              </div>
              <StatusBadge status={task.status} />
              <button className="text-xs text-accent hover:underline">Plan</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
