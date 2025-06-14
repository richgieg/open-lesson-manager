import { Instructor, Prisma } from "@/generated/prisma";
import { makeApiHandler, prisma, sendError, sendResponse } from "@/lib";
import { NextApiResponse } from "next";

export default makeApiHandler({
  GET: async (req, res: NextApiResponse<Instructor>) => {
    const instructorPid = req.query.instructorPid as string;
    const instructor = await prisma.instructor.findUnique({
      where: { pid: instructorPid },
    });
    if (!instructor) {
      return sendError(res, 404);
    }
    return res.status(200).json(instructor);
  },

  PUT: async (req, res: NextApiResponse<Instructor>) => {
    const instructorPid = req.query.instructorPid as string;
    const { name } = req.body;
    if (!name) {
      return sendError(res, 400);
    }
    try {
      const instructor = await prisma.instructor.update({
        where: { pid: instructorPid },
        data: { name },
      });
      return res.status(200).json(instructor);
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
    const instructorPid = req.query.instructorPid as string;
    try {
      await prisma.instructor.delete({
        where: { pid: instructorPid },
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
