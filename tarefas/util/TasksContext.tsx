import React, { ReactNode, createContext, useState } from "react";

import { Task, TaskNoId } from "./Definitions";

export const TasksContext = createContext({} as TasksData);

export interface TasksData {
  loading: boolean;
  tasks: Task[];
  addTask: (task: TaskNoId) => Promise<void>;
  editTask: (id: number, changes: Partial<TaskNoId>) => Promise<void>;
  loadTasks: () => Promise<void>;
  removeTask: (id: number) => Promise<void>;
}

export function TasksProvider({ backendApi, children }: TasksProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  async function addTask(task: TaskNoId) {
    const id = await backendApi.addTask(task);
    setTasks((tasks) => [...tasks, { ...task, id }]);
  }

  async function editTask(id: number, changes: Partial<TaskNoId>) {
    await backendApi.editTask(id, changes);
    setTasks((tasks) => {
      const newTasks = [...tasks];
      const i = newTasks.findIndex((task) => task.id === id);
      newTasks[i] = { ...newTasks[i], ...changes };
      return newTasks;
    });
  }

  async function loadTasks() {
    setLoading(true);
    backendApi.listTasks().then((tasks) => {
      setTasks(tasks);
      setLoading(false);
    });
  }

  async function removeTask(id: number) {
    await backendApi.deleteTask(id);
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  }

  const data: TasksData = { loading, tasks, addTask, editTask, loadTasks, removeTask };
  return <TasksContext.Provider value={data}>{children}</TasksContext.Provider>;
}

export interface TasksProviderProps {
  backendApi: BackendApi;
  children: ReactNode;
}

export interface BackendApi {
  listTasks: () => Promise<Task[]>;
  addTask: (task: TaskNoId) => Promise<number>;
  editTask: (id: number, changes: Partial<TaskNoId>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}
