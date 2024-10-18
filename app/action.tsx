"use server";

import prisma from "@/lib/prisma";

import { revalidatePath } from "next/cache";

export async function toggle(taskId: string, isFinished: boolean) {
  try {
    await prisma.task.update({
      where: { id: taskId },
      data: { finished: isFinished },
    });

    revalidatePath("/[username]", "page");
  } catch (e) {
    console.log(e);
  }
}

export async function deleteTask(taskId: string) {
  try {
    await prisma.task.delete({
      where: { id: taskId },
    });
    revalidatePath("/[username]", "page");
  } catch (e) {
    console.log(e);
  }
}
