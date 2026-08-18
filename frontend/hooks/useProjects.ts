import { useMemo, useState } from 'react';
import useSWR from 'swr';
import { projects as sampleProjects, tasks as sampleTasks } from '../lib/sampleData';
import { Project, Task } from '../types';

const fetcher = async (key: string): Promise<Project[] | Task[]> => {
  if (key === 'projects') {
    return sampleProjects;
  }
  if (key.startsWith('tasks')) {
    return sampleTasks;
  }
  return [];
};

export function useProjects() {
  const { data: projects = [] } = useSWR<Project[]>('projects', (key: string) => fetcher(key) as Promise<Project[]>);
  const { data: tasks = [] } = useSWR<Task[]>('tasks', (key: string) => fetcher(key) as Promise<Task[]>);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');

  const activeProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) || projects[0],
    [projects, selectedProjectId]
  );

  const projectTasks = useMemo(
    () => tasks.filter((task) => task.projectId === activeProject?.id),
    [activeProject?.id, tasks]
  );

  return {
    projects,
    tasks: projectTasks,
    activeProject,
    selectedProjectId,
    setSelectedProjectId
  };
}
