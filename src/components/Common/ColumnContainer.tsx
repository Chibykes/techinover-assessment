import { useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { TaskInterface } from "../../types";
import DraggableTaskCard from "./DraggableTaskCard";
import TaskForm from "./TaskForm";
import { BiSort } from "react-icons/bi";
import clsx from "clsx";

interface ColumnContainerInterface {
  id: string | number;
  name: string;
  tasks: TaskInterface[];
}

type SortTypes = "none" | "high-low" | "low-high";

const ColumnContainer = ({ id, name, tasks }: ColumnContainerInterface) => {
  const [showModal, setShowModal] = useState(false);
  const [sort, setSort] = useState<SortTypes>("none");

  const handleSorting = () => {
    setSort((n) =>
      n === "none" ? "high-low" : n === "high-low" ? "low-high" : "none",
    );
  };
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-colum-bg shadow-column-container xsticky xtop-0 flex max-h-full w-full flex-col gap-4 rounded-lg p-2"
    >
      <div className="flex justify-between pt-2">
        <div className="flex gap-2">
          <p className="font-medium text-neutral-500">{name}</p>
          <span className="grid place-content-center rounded-sm bg-neutral-200 px-1 text-sm text-neutral-500">
            {tasks.length}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="flex cursor-pointer place-content-center gap-2"
            onClick={handleSorting}
            title="Sort by priority"
          >
            <span
              className={clsx(
                "text-xs",
                sort === "high-low" ? "text-[#4F9C20]" : "text-[#EC5962]",
              )}
            >
              {sort === "high-low"
                ? "High - Low"
                : sort === "low-high"
                  ? "Low - High"
                  : ""}
            </span>
            <BiSort className="text-neutral-500" />
          </button>
          <button
            className="grid cursor-pointer place-content-center"
            onClick={() => setShowModal(true)}
            title="Add task"
          >
            <HiPlus className="text-neutral-500" />
          </button>
        </div>
      </div>

      <div className="flex h-full w-full flex-col gap-4 overflow-auto">
        {tasks
          .slice()
          .sort((taskA, taskB) => {
            const grade = { high: "a", medium: "b", low: "c" };
            const result = grade[taskA.priority].localeCompare(
              grade[taskB.priority],
            );
            const coefficient =
              sort === "high-low" ? 1 : sort === "low-high" ? -1 : 0;

            return result * coefficient;
          })
          .map((task) => (
            <DraggableTaskCard key={task?.id} data={task} />
          ))}
      </div>

      {showModal && (
        <TaskForm columnId={id as string} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default ColumnContainer;
