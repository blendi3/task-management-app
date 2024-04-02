import { Task } from "../interfaces/Task";

export const getTasksFromLocalStorage = (): Task[] => {
  const tasksJson = localStorage.getItem("tasks");
  if (tasksJson == null) return [];
  return JSON.parse(tasksJson);
};

export const saveTasksToLocalStorage = (tasks: Task[]) => {
  const tasksJson = JSON.stringify(tasks);
  localStorage.setItem("tasks", tasksJson);
};
