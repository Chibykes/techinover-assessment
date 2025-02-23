import { createContext, useEffect, useState } from "react";
import { ColumnInterface, TaskInterface } from "../types";
import { Columns, DefaultTask } from "../data";
import moment from "moment";

interface DefaultStateInterface {
  showSidebar: boolean;
  search: string;
  columns: ColumnInterface[];
  tasks: TaskInterface[];
  currentDate: string;
  filteredTask: TaskInterface[];
}

const initialState = {
  showSidebar: false,
  search: "",
  columns: [],
  tasks: [],
  filteredTask: [],
  currentDate: "",
};

const CreateAppLevelContext = createContext<{
  state: DefaultStateInterface;
  setState: React.Dispatch<React.SetStateAction<DefaultStateInterface>> | null;
}>({
  state: initialState,
  setState: null,
});

const AppContext = ({ children }: { children: React.ReactNode }) => {
  const getLocalStorageTasks: () => TaskInterface[] = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    if (!tasks || tasks.length === 0) {
      return DefaultTask;
    }

    return tasks;
  };

  const [state, setState] = useState<DefaultStateInterface>({
    showSidebar: false,
    search: "",
    columns: Columns,
    tasks: getLocalStorageTasks(),
    filteredTask: DefaultTask,
    currentDate: moment().format(),
  });

  useEffect(() => {
    let filteredTask = state.tasks.filter((task) =>
      moment(task.createdAt).isBetween(
        moment(state?.currentDate).startOf("day"),
        moment(state?.currentDate).endOf("day"),
        undefined,
        "[]",
      ),
    );

    if (state?.search) {
      filteredTask = filteredTask.filter(
        (task) =>
          new RegExp(state?.search, "ig").test(task?.taskName) ||
          new RegExp(state?.search, "ig").test(task?.description),
      );
    }

    setState((n) => ({ ...n, filteredTask }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentDate, state.tasks, state?.search]);

  useEffect(() => {
    const setLocalStorageTasks = () => {
      return localStorage.setItem("tasks", JSON.stringify(state?.tasks));
    };

    setLocalStorageTasks();
  }, [state.tasks]);

  return (
    <CreateAppLevelContext.Provider
      value={{
        state,
        setState,
      }}
    >
      {children}
    </CreateAppLevelContext.Provider>
  );
};

export { CreateAppLevelContext };
export default AppContext;
