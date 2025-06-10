import type { NextApiResponse } from "next";
import { Instructor } from "@/generated/prisma";
import { makeApiHandler } from "@/lib/makeApiHandler";
import { prisma } from "@/lib/prisma";

const handler = makeApiHandler({
  GET: async (req, res: NextApiResponse<Instructor[]>) => {
    const instructors = await prisma.instructor.findMany();
    res.status(200).json(instructors);
  },

  POST: async (req, res: NextApiResponse<Instructor>) => {
    const { name } = req.body;
    if (!name) {
      res.status(400).end();
      return;
    }
    const instructor = await prisma.instructor.create({ data: { name } });
    res.status(201).json(instructor);
  },
});

export default handler;
