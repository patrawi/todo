import prisma from "@/lib/prisma";
import { Task } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body as Task;

  const { description, endTime, startTime, title } = data;
  const authorId = "cm23fghux0000sxqe1gn3fic7";
  const result = await prisma.task.create({
    data: {
      title: title,
      description: description,
      endTime: endTime,
      startTime: startTime,
      author: {
        connect: { id: authorId },
      },
    },
  });
  res.json(result);
}
