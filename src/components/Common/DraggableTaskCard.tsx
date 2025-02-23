import { useDraggable } from "@dnd-kit/core";
import { TaskInterface } from "../../types";
import TaskCard from "./TaskCard";

interface TaskCardInterface {
  data: TaskInterface;
  isOverlay?: boolean;
}

const DraggableTaskCard = ({ data }: TaskCardInterface) => {
  const { setNodeRef } = useDraggable({
    id: data?.id,
  });

  return (
    <div ref={setNodeRef}>
      <TaskCard data={data} />
    </div>
  );
};

export default DraggableTaskCard;
