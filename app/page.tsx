import Card from "@/components/Card";
import prisma from "@/lib/prisma";

const fetchTasks = async () => {
  const tasks = await prisma.task.findMany({
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
        <button className="bg-blue-500 p-4 rounded-lg max-w-md w-full hover:bg-blue-900 text-2xl shadow-lg cursor">
          + New Task
        </button>
      </div>
      {tasks.map((t) => {
        return <Card task={t} key={t.id} />;
      })}
    </main>
  );
}
