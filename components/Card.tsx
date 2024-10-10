"use client";

import { useToggle } from "@/hooks/useToggle";
import { getHHMM } from "@/lib/utils/dateUtils";
import { Task } from "@prisma/client";

interface ICardProps {
  task: Task;
}
const Card: React.FC<ICardProps> = ({ task }) => {
  const startTime = getHHMM(new Date(task.startTime));
  const endTime = getHHMM(new Date(task.endTime));
  const { toggle, onToggle } = useToggle(false);
  return (
    <div key={task.id} className="w-full bg-white rounded-lg p-8 shadow-2xl  ">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-black">{task.title}</p>
          <p className="text-slate-400">{task.description}</p>
        </div>
        <label className="">
          <input
            className="hidden"
            type="checkbox"
            id="check-round01"
            onClick={onToggle}
          />
          <span
            className={`
          flex items-center justify-center w-8 h-8 text-transparent border-2 rounded-full  transition-colors duration-200 cursor-pointer ${
            !toggle
              ? "bg-blue-500 border-blue-500 text-white "
              : "border-gray-300 hover:bg-slate-100 focus:bg-slate-400 "
          }`}
          >
            {toggle || (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-5 text-black"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            )}
          </span>
        </label>
      </div>
      <div className="text-black divide-y-8" />
      <div className="flex gap-4">
        <p className="text-slate-500">Today</p>
        <p className="text-slate-400">
          {startTime} - {endTime}
        </p>
      </div>
    </div>
  );
};

export default Card;
