import { DailyPlanItem, Task } from '../types';

interface Props {
  plan: DailyPlanItem[];
  tasks: Task[];
}

export function DailyPlanPanel({ plan, tasks }: Props) {
  const taskMap = tasks.reduce<Record<string, Task>>((acc, task) => {
    acc[task.id] = task;
    return acc;
  }, {});

  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="section-title">Daily Plan</p>
          <p className="text-sm text-muted">Auto-generated focus blocks</p>
        </div>
        <button className="px-3 py-2 rounded-lg bg-white/10 text-sm hover:bg-white/20">Refresh</button>
      </div>
      <div className="space-y-2">
        {plan.map((item) => (
          <div key={item.taskId} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
            <div>
              <p className="font-semibold text-white">{taskMap[item.taskId]?.title || item.label}</p>
              <p className="text-xs text-muted">{item.start} → {item.end}</p>
            </div>
            <span className="text-xs text-muted">{taskMap[item.taskId]?.category || 'Blocked'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
