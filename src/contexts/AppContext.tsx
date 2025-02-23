import moment from "moment";
import { createContext, useEffect, useState } from "react";
import { Columns } from "../data";
import {
  DefaultStateInterface
} from "../types";
import {
  getLocalStorageTasks,
  setLocalStorageTasks,
} from "../utilities/localstorage";

const initialState = {
  showSidebar: false,
  search: "",
  columns: Columns,
  tasks: getLocalStorageTasks(),
  filteredTask: getLocalStorageTasks(),
  currentDate: moment().format(),
};

const AppContext = createContext<{
  state: DefaultStateInterface;
  setState: React.Dispatch<React.SetStateAction<DefaultStateInterface>> | null;
}>({
  state: initialState,
  setState: null,
});

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<DefaultStateInterface>(initialState);

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
    setLocalStorageTasks(state?.tasks);
  }, [state.tasks]);

  return (
    <AppContext.Provider
      value={{
        state,
        setState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext as CreateAppLevelContext };
export default AppContextProvider;
