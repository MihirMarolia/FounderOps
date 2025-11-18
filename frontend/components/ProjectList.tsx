import { Fragment } from 'react';
import { Project } from '../types';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

interface Props {
  projects: Project[];
  selectedProjectId?: string;
  onSelect: (id: string) => void;
}

function HealthIcon({ health }: { health: Project['health'] }) {
  if (health === 'on_track') {
    return <CheckCircleIcon className="h-4 w-4 text-emerald-400" />;
  }
  if (health === 'watch') {
    return <ExclamationTriangleIcon className="h-4 w-4 text-amber-400" />;
  }
  return <ExclamationTriangleIcon className="h-4 w-4 text-rose-500" />;
}

export function ProjectList({ projects, selectedProjectId, onSelect }: Props) {
  return (
    <div className="card h-full space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="section-title">Projects</p>
          <p className="text-sm text-muted">Choose a workspace</p>
        </div>
        <button className="px-3 py-2 text-sm rounded-lg bg-accent text-white hover:bg-indigo-500">
          + New Project
        </button>
      </div>
      <div className="space-y-2">
        {projects.map((project) => {
          const isActive = selectedProjectId === project.id;
          return (
            <Fragment key={project.id}>
              <button
                onClick={() => onSelect(project.id)}
                className={`w-full rounded-lg px-3 py-3 text-left transition border border-transparent hover:border-white/10 ${
                  isActive ? 'bg-white/10 shadow-inner' : 'bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <HealthIcon health={project.health} />
                    <p className="font-semibold">{project.name}</p>
                  </div>
                  <span className="text-xs text-muted">{project.stage}</span>
                </div>
                <p className="text-sm text-muted mt-1">{project.sector}</p>
                <div className="flex items-center justify-between mt-2 text-sm text-muted">
                  <p>{project.focusArea}</p>
                  <span className="text-white font-semibold">{project.priorityScore}</span>
                </div>
              </button>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
