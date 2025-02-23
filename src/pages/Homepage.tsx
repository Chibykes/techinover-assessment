import { useContext, useState } from "react";
import ColumnContainer from "../components/Common/ColumnContainer";
import Header from "../components/Common/Header";
import Sidebar from "../components/Common/Sidebar";
import { CreateAppLevelContext } from "../contexts/AppContext";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { clsx } from "clsx";
import { TaskInterface } from "../types";
import TaskCard from "../components/Common/TaskCard";

const Homepage = () => {
  const { state, setState } = useContext(CreateAppLevelContext);
  const [activeTask, setActiveTask] = useState<TaskInterface | undefined>(
    undefined,
  );
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    setActiveTask(state?.tasks.find((task) => task.id === active?.id));
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setState?.((n) => ({
      ...n,
      tasks: n.tasks.map((task) => {
        if (task.id === active.id) {
          task.columnId = over?.id as string;
        }

        return task;
      }),
    }));
  };

  const rotateDeg =
    activeTask?.columnId === "todo"
      ? "rotate-3"
      : activeTask?.columnId === "in-progress"
        ? "rotate-0"
        : "-rotate-3";

  return (
    <div className="relative flex h-screen w-screen">
      <Sidebar />

      <div className="flex max-h-full w-full flex-col gap-8 p-4 lg:p-8">
        <Header />

        <div className="h-full max-w-full overflow-auto">
          <div className="relative grid h-full min-w-6xl grid-cols-3 items-start gap-4 pb-2 lg:min-w-full">
            <DndContext
              sensors={sensors}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              {state?.columns.map((column) => (
                <ColumnContainer
                  key={column.id}
                  id={column.id}
                  name={column.name}
                  tasks={state?.filteredTask?.filter(
                    (task) => task?.columnId === column?.id,
                  )}
                />
              ))}

              <DragOverlay
                className={clsx(
                  "rounded-[6px] outline outline-indigo-600",
                  rotateDeg,
                )}
              >
                {activeTask ? <TaskCard data={activeTask} isOverlay /> : null}
              </DragOverlay>
            </DndContext>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
