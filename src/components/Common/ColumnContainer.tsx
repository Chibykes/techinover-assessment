import { useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { TaskInterface } from "../../types";
import DraggableCard from "./DraggableCard";
import ModifyTask from "./ModifyTask";

interface ColumnContainerInterface {
  id: string | number;
  name: string;
  tasks: TaskInterface[];
}

const ColumnContainer = ({ id, name, tasks }: ColumnContainerInterface) => {
  const [showModal, setShowModal] = useState(false);
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-colum-bg shadow-column-container flex max-h-auto w-full flex-col gap-4 rounded-lg p-2"
    >
      <div className="flex justify-between pt-2">
        <div className="flex gap-2">
          <p className="font-medium text-neutral-500">{name}</p>
          <span className="grid place-content-center rounded-sm bg-neutral-200 px-1 text-sm text-neutral-500">
            {tasks.length}
          </span>
        </div>

        <button
          className="grid cursor-pointer place-content-center"
          onClick={() => setShowModal(true)}
        >
          <HiPlus className="text-neutral-500" />
        </button>
      </div>

      <div className="flex max-h-full w-full flex-col gap-4">
        {tasks.map((task) => (
          <DraggableCard key={task?.id} data={task} />
        ))}
      </div>

      {showModal && <ModifyTask onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default ColumnContainer;
