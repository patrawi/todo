import Card from "@/components/Card";
import CreateTaskDialog from "@/components/CreateTaskDialog";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/utils/auth";
import { currentDate } from "@/lib/utils/dateUtils";

import { Task } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const getTasks = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }
  const today = currentDate();
  const tasks = await prisma.task.findMany({
    where: {
      startTime: {
        gte: new Date(today).toISOString(),
      },
      author: {
        email: session.user?.email,
      },
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return tasks;
};

export default async function HomePage() {
  const date = new Date();
  const tasks = await getTasks();

  return (
    <main className="container mx-auto py-8  relative">
      <div className="flex justify-between w-full items-center mb-8">
        <div>
          <p className="text-3xl font-bold">Today&apos;s Task</p>
          <p className="text-slate-400">{date.toDateString()}</p>
        </div>
        <CreateTaskDialog />
      </div>
      <div className="flex flex-col gap-4">
        {tasks?.map((t: Task) => {
          return <Card task={t} key={t.id} />;
        })}
      </div>
    </main>
  );
}
