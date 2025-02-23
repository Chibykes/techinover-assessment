import { ColumnInterface, TaskInterface } from "./types";
import prepMeal from "./assets/img/prep-meal.png";
import readBook from "./assets/img/read-book.png";
import publishBook from "./assets/img/publish-book.png";
import moment from "moment";

const Columns: ColumnInterface[] = [
  { id: "todo", name: "To do" },
  { id: "in-progress", name: "In progress" },
  { id: "completed", name: "Completed" },
];

const DefaultTask: TaskInterface[] = [
  {
    id: crypto.randomUUID(),
    columnId: "todo",
    priority: "high",
    taskName: "Publish my first book",
    coverPhoto: publishBook,
    description:
      "Write a blog post outlining the top 10 productivity tips for busy professionals. The post should be engaging, informative, and include actionable advice. Target word count: 1,200 words.",
    deadline: "2025-02-22T15:00:00.892Z",
    createdAt: moment().format() || "2025-02-22T15:00:00.892Z",
  },
  {
    id: crypto.randomUUID(),
    columnId: "todo",
    priority: "medium",
    taskName: "Home Renovation",
    coverPhoto: "",
    description: "Write a blog post outlining the top 10 products",
    deadline: "2025-02-22T15:00:00.892Z",
    createdAt: moment().format() || "2025-02-22T15:00:00.892Z",
  },
  {
    id: crypto.randomUUID(),
    columnId: "todo",
    priority: "high",
    taskName: "Organize a charity event",
    coverPhoto: "",
    description: "",
    deadline: "2025-02-22T15:00:00.892Z",
    createdAt: moment().format() || "2025-02-22T15:00:00.892Z",
  },
  {
    id: crypto.randomUUID(),
    columnId: "in-progress",
    priority: "low",
    taskName: "Watch a Frontend Tutorial",
    coverPhoto: "",
    description: "",
    deadline: "2025-02-22T15:00:00.892Z",
    createdAt: moment().format() || "2025-02-22T15:00:00.892Z",
  },
  {
    id: crypto.randomUUID(),
    columnId: "in-progress",
    priority: "low",
    taskName: "Prep my week meal",
    coverPhoto: prepMeal,
    description: "",
    deadline: "2025-02-22T15:00:00.892Z",
    createdAt: moment().format() || "2025-02-22T15:00:00.892Z",
  },
  {
    id: crypto.randomUUID(),
    columnId: "completed",
    priority: "medium",
    taskName: "Read a book",
    coverPhoto: readBook,
    description: "",
    deadline: "2025-02-22T15:00:00.892Z",
    createdAt: moment().format() || "2025-02-22T15:00:00.892Z",
  },
  {
    id: crypto.randomUUID(),
    columnId: "completed",
    priority: "low",
    taskName: "Improve cards readability",
    coverPhoto: "",
    description: "As a team license owner, I want to use multiplied limits",
    deadline: "2025-02-22T15:00:00.892Z",
    createdAt: moment().format() || "2025-02-22T15:00:00.892Z",
  },
  {
    id: crypto.randomUUID(),
    columnId: "completed",
    priority: "high",
    taskName: "Attend Standup and give updates",
    coverPhoto: "",
    description: "",
    deadline: "2025-02-22T15:00:00.892Z",
    createdAt: moment().format() || "2025-02-22T15:00:00.892Z",
  },
];

export { Columns, DefaultTask };
