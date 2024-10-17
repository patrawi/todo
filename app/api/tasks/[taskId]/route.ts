import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/utils/auth";

import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({
      success: false,
      message: "Your session has expired. To use the app sign in again",
    });
  }
  try {
    const { taskId } = params;
    const data = (await request.json()) as { isFinished: boolean };

    await prisma.task.update({
      where: { id: taskId },
      data: { finished: !data?.isFinished },
    });
    revalidatePath(`/[username]`, "layout");

    return Response.json({
      success: true,
      message: "The task was successfully updated",
    });
  } catch (e) {
    return Response.json({
      success: false,
      message: "Error occured while updating the task!",
    });
  }
}

export async function DELETE(
  request: NextApiRequest,
  { params }: { params: { taskId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({
      success: false,
      message: "Your session has expired. To use the app sign in again",
    });
  }
  try {
    const { taskId } = params;

    await prisma.task.delete({
      where: { id: taskId },
    });

    return Response.json({
      success: true,
      message: "The task was successfully updated",
    });
  } catch {
    return Response.json({
      success: false,
      message: "Error occured while deleting the task!",
    });
  }
}
