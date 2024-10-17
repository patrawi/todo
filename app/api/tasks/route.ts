import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/utils/auth";
import { currentDate } from "@/lib/utils/dateUtils";
import { Task } from "@prisma/client";
import { getServerSession } from "next-auth";

import { NextRequest } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json({
        success: false,
        message: "Your session has expired. To use the app sign in again",
      });
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
    return Response.json(tasks);
  } catch (e) {
    return Response.json({
      success: false,
      message: "Error occured while querying a task!",
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json({
        success: false,
        message: "Your session has expired. To use the app sign in again",
      });
    }

    const data: Task = await request.json();

    const { description, endTime, startTime, title } = data;

    await prisma.task.create({
      data: {
        title: title,
        description: description,
        endTime: endTime,
        startTime: startTime,
        author: { connect: { email: session.user?.email as string } },
      },
    });
    return Response.json({
      success: true,
      message: "A new task was successfully created",
    });
  } catch {
    return Response.json({
      success: false,
      message: "Error occured while create a task!",
    });
  }
}
