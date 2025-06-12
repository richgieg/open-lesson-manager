import type { NextApiResponse } from "next";
import { Organization, Subject } from "@/generated/prisma";
import { makeApiHandler, prisma, sendError } from "@/lib";

export default makeApiHandler({
  GET: async (req, res: NextApiResponse<Subject[]>) => {
    const pid = req.query.pid as string;
    const subjects = await prisma.subject.findMany({
      where: { Organization: { pid } },
    });
    return res.status(200).json(subjects);
  },

  POST: async (req, res: NextApiResponse<Organization>) => {
    const pid = req.query.pid as string;
    const { name } = req.body;
    if (!name) {
      return sendError(res, 400);
    }
    const subject = await prisma.subject.create({
      data: {
        name,
        Organization: {
          connect: { pid },
        },
      },
    });
    return res.status(201).json(subject);
  },
});
