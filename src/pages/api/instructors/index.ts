import type { NextApiRequest, NextApiResponse } from "next";
import { Instructor } from "@/generated/prisma";
import { makeApiHandler } from "@/lib/makeApiHandler";
import { prisma } from "@/lib/prisma";

const handler = makeApiHandler({
  GET: async (req: NextApiRequest, res: NextApiResponse<Instructor[]>) => {
    const instructors = await prisma.instructor.findMany();
    res.status(200).json(instructors);
  },
});

export default handler;
