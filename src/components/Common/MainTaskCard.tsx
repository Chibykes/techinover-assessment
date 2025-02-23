import { useDraggable } from "@dnd-kit/core";
import { useRef, useState } from "react";
import { HiFlag, HiOutlineDotsHorizontal } from "react-icons/hi";
import PriorityBadge from "./PriorityBadge";
import moment from "moment";
import { TaskInterface } from "../../types";
import clsx from "clsx";

interface TaskCardInterface {
  data: TaskInterface;
  isOverlay?: boolean;
}

const MainTaskCard = ({ data, isOverlay }: TaskCardInterface) => {
  const modifyButtonRef = useRef<HTMLButtonElement>(null);
  const modifyDropdownRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const { active } = useDraggable({
    id: data?.id,
  });

  const rotateDeg =
    data?.columnId === "todo"
      ? "rotate-3"
      : data?.columnId === "in-progress"
        ? "rotate-0"
        : "-rotate-3";

  return (
    <div
      className={clsx(
        "shadow-task-card relative flex flex-col gap-4 rounded-[6px] bg-white p-4 select-none",
        active?.id === data?.id
          ? "relative z-[99] cursor-grabbing"
          : "cursor-grab !opacity-100",
        active?.id === data?.id &&
          isOverlay &&
          `${rotateDeg} border border-indigo-600`,
        active?.id === data?.id &&
          !isOverlay &&
          "after:absolute after:top-0 after:left-0 after:h-full after:w-full after:rounded-[6px] after:border after:border-dashed after:border-indigo-600 after:bg-indigo-100",
      )}
    >
      <PriorityBadge variant={data?.priority} />

      <div className="flex items-center justify-between gap-4">
        <p className="font-medium">{data?.taskName}</p>

        <div className="relative isolate">
          <button
            ref={modifyButtonRef}
            className="cursor-pointer rounded-[6px] border border-neutral-300 p-1"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setShowDropdown((n) => !n);
            }}
          >
            <HiOutlineDotsHorizontal size={16} className="text-neutral-500" />
          </button>
          {showDropdown && (
            <div
              ref={modifyDropdownRef}
              className="absolute top-[120%] right-0 flex flex-col overflow-hidden rounded-[6px] border border-neutral-300 bg-white"
            >
              <button className="w-full min-w-[70px] cursor-pointer px-3 py-2 text-left text-xs text-neutral-500 hover:bg-neutral-200">
                Edit
              </button>
              <button className="w-full min-w-[70px] cursor-pointer px-3 py-2 text-left text-xs text-red-400 hover:bg-neutral-200">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {data?.coverPhoto && (
        <img className="h-auto w-full rounded-[6px]" src={data?.coverPhoto} />
      )}

      {data?.description && (
        <p className="!font-[Inter] text-sm leading-[19.6px] text-[#252C32]">
          {data?.description}
        </p>
      )}

      <div className="flex items-center justify-between !font-[Inter]">
        <div className="flex items-center gap-4">
          <HiFlag
            size={22}
            style={{
              color:
                data?.columnId === "completed"
                  ? "#4F9C20"
                  : moment(data?.deadline).isBefore(moment()) &&
                      data?.columnId !== "completed"
                    ? "#F76659"
                    : "#6E7C87 ",
            }}
          />
          <span className="text-xs font-medium text-[#6E7C87]">
            {moment(data?.deadline).format("MMM Do YYYY")}
          </span>
        </div>

        <span className="text-xs font-medium text-[#6E7C87] lowercase">
          {moment(data?.deadline).format("H:mmA")}
        </span>
      </div>
    </div>
  );
};

export default MainTaskCard;
