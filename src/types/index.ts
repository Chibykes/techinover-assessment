export interface TaskInterface {
  id: string | number;
  columnId: string;
  priority: "high" | "medium" | "low";
  taskName: string;
  coverPhoto: string;
  description: string;
  deadline: string;
  createdAt: string;
}

export interface ColumnInterface {
  id: string;
  name: string;
}

export interface DefaultStateInterface {
  showSidebar: boolean;
  search: string;
  columns: ColumnInterface[];
  tasks: TaskInterface[];
  currentDate: string;
  filteredTask: TaskInterface[];
}