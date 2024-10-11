import Card from "@/components/Card";
import CreateTaskDialog from "@/components/CreateTaskDialog";
import prisma from "@/lib/prisma";
import { currentDate } from "@/lib/utils/dateUtils";

const fetchTasks = async () => {
  const today = currentDate();
  const tasks = await prisma.task.findMany({
    where: {
      startTime: {
        gte: new Date(today).toISOString(),
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
export default async function Home() {
  const tasks = await fetchTasks();
  console.log(tasks);
  const date = new Date();
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
        {tasks.map((t) => {
          return <Card task={t} key={t.id} />;
        })}
      </div>
    </main>
  );
}
