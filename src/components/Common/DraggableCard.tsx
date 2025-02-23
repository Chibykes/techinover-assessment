import { useDraggable } from "@dnd-kit/core";
import { TaskInterface } from "../../types";
import MainTaskCard from "./MainTaskCard";

interface TaskCardInterface {
  data: TaskInterface;
  isOverlay?: boolean;
}

const DraggableCard = ({ data }: TaskCardInterface) => {
  const { setNodeRef } = useDraggable({
    id: data?.id,
  });

  return (
    <div ref={setNodeRef}>
      <MainTaskCard data={data} />
    </div>
  );
};

export default DraggableCard;
