"use client";
import Card from "@/components/Card";
import CreateTaskDialog from "@/components/CreateTaskDialog";

import { Task } from "@prisma/client";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error: unknown = new Error(
      "An error occurred while fetching the data."
    );

    throw error;
  }

  return res.json();
};

export default function HomePage() {
  const date = new Date();
  const { data: tasks, isLoading } = useSWR("/api/tasks", fetcher);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="container mx-auto py-8  relative">
      <div className="flex justify-between w-full items-center mb-8">
        <div>
          <p className="text-3xl font-bold">Today&apos;s Tasฃk</p>
          <p className="text-slate-400">{date.toDateString()}</p>
        </div>
        <CreateTaskDialog />
      </div>
      <div className="flex flex-col gap-4">
        {tasks &&
          tasks.map((t: Task) => {
            return <Card task={t} key={t.id} />;
          })}
      </div>
    </main>
  );
}
