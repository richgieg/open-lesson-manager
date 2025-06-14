import { Subject, Prisma } from "@/generated/prisma";
import { makeApiHandler, prisma, sendError, sendResponse } from "@/lib";
import { NextApiResponse } from "next";

export default makeApiHandler({
  GET: async (req, res: NextApiResponse<Subject>) => {
    const subjectPid = req.query.subjectPid as string;
    const subject = await prisma.subject.findUnique({
      where: { pid: subjectPid },
    });
    if (!subject) {
      return sendError(res, 404);
    }
    return res.status(200).json(subject);
  },

  PUT: async (req, res: NextApiResponse<Subject>) => {
    const subjectPid = req.query.subjectPid as string;
    const { name } = req.body;
    if (!name) {
      return sendError(res, 400);
    }
    try {
      const subject = await prisma.subject.update({
        where: { pid: subjectPid },
        data: { name },
      });
      return res.status(200).json(subject);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return sendError(res, 404);
      }
      return sendError(res, 500);
    }
  },

  DELETE: async (req, res: NextApiResponse<void>) => {
    const subjectPid = req.query.subjectPid as string;
    try {
      await prisma.subject.delete({
        where: { pid: subjectPid },
      });
      return sendResponse(res, 204);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return sendError(res, 404);
      }
      return sendError(res, 500);
    }
  },
});
