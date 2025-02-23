import { DefaultTask } from "../data";
import { TaskInterface } from "../types";

const TASKS = "tasks";

const getLocalStorageTasks: () => TaskInterface[] = () => {
  const tasks = JSON.parse(localStorage.getItem(TASKS) || "[]");
  if (!tasks || tasks.length === 0) {
    return DefaultTask;
  }

  return tasks;
};

const setLocalStorageTasks = (data: TaskInterface[]) => {
  return localStorage.setItem(TASKS, JSON.stringify(data));
};

export { getLocalStorageTasks, setLocalStorageTasks };
