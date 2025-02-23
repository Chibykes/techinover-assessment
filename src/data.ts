import { ColumnInterface, TaskInterface } from "./types";

const Columns: ColumnInterface[] = [
  { id: "todo", name: "To do" },
  { id: "in-progress", name: "In progress" },
  { id: "completed", name: "Completed" },
];

const DefaultTask: TaskInterface[] = [
  {
    id: 1,
    columnId: "todo",
    priority: "high",
    taskName: "Publish my first book",
    coverPhoto: "",
    description:
      "Write a blog post outlining the top 10 productivity tips for busy professionals. The post should be engaging, informative, and include actionable advice. Target word count: 1,200 words.",
    deadline: "2025-02-22T15:00:00.892Z",
    createdAt: "2025-02-22T15:00:00.892Z",
  },
  {
    id: 2,
    columnId: "todo",
    priority: "medium",
    taskName: "Home Renovation",
    coverPhoto: "",
    description: "Write a blog post outlining the top 10 products",
    deadline: "2025-02-22T15:00:00.892Z",
    createdAt: "2025-02-22T15:00:00.892Z",
  },
  {
    id: 3,
    columnId: "todo",
    priority: "high",
    taskName: "Organize a charity event",
    coverPhoto: "",
    description: "",
    deadline: "2025-02-22T15:00:00.892Z",
    createdAt: "2025-02-22T15:00:00.892Z",
  },
  {
    id: 4,
    columnId: "in-progress",
    priority: "low",
    taskName: "Watch a Frontend Tutorial",
    coverPhoto: "",
    description: "",
    deadline: "2025-02-22T15:00:00.892Z",
    createdAt: "2025-02-22T15:00:00.892Z",
  },
  {
    id: 5,
    columnId: "in-progress",
    priority: "low",
    taskName: "Prep my week meal",
    coverPhoto: "",
    description: "",
    deadline: "2025-02-22T15:00:00.892Z",
    createdAt: "2025-02-22T15:00:00.892Z",
  },
  {
    id: 6,
    columnId: "completed",
    priority: "medium",
    taskName: "Read a book",
    coverPhoto: "",
    description: "",
    deadline: "2025-02-22T15:00:00.892Z",
    createdAt: "2025-02-22T15:00:00.892Z",
  },
  {
    id: 7,
    columnId: "completed",
    priority: "low",
    taskName: "Improve cards readability",
    coverPhoto: "",
    description: "As a team license owner, I want to use multiplied limits",
    deadline: "2025-02-22T15:00:00.892Z",
    createdAt: "2025-02-22T15:00:00.892Z",
  },
  {
    id: 8,
    columnId: "completed",
    priority: "high",
    taskName: "Attend Standup and give updates",
    coverPhoto: "",
    description: "",
    deadline: "2025-02-22T15:00:00.892Z",
    createdAt: "2025-02-22T15:00:00.892Z",
  },
];

export { Columns, DefaultTask };
