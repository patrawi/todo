"use client";
import { deleteTask, toggle } from "@/app/action";
import { getHHMM } from "@/lib/utils/dateUtils";
import { Task } from "@prisma/client";

interface ICardProps {
  task: Task;
}

const Card: React.FC<ICardProps> = ({ task }) => {
  const startTime = getHHMM(new Date(task.startTime));
  const endTime = getHHMM(new Date(task.endTime));

  return (
    <div
      key={task.id}
      className="w-full bg-white rounded-lg p-8 shadow-2xl space-y-4  "
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-black text-xl">{task.title}</p>
          <p className="text-slate-400 text-sm">{task.description}</p>
        </div>

        <label className="block">
          <input
            className="hidden"
            type="checkbox"
            id="check-round01"
            onChange={(e) => {
              toggle(task.id, e.target.checked);
            }}
          />
          <span
            className={`
          flex items-center justify-center w-8 h-8 text-transparent border-2 rounded-full  transition-colors duration-200 cursor-pointer ${
            task.finished
              ? "bg-blue-500 border-blue-500 text-white "
              : "border-gray-300 hover:bg-slate-100 focus:bg-slate-400 "
          }`}
          >
            {!task.finished || (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            )}
          </span>
        </label>
      </div>
      <div className="border-t-2 divide-y-4 divide-slate-500"></div>

      <div className="flex justify-between items-center ">
        <div className="flex gap-4">
          <p className="text-slate-500">Today</p>
          <p className="text-slate-400">
            {startTime} - {endTime}
          </p>
        </div>
        <button
          onClick={() => {
            deleteTask(task.id);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 hover:text-red-600 text-red-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Card;
