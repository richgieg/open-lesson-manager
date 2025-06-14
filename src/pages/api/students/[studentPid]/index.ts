import { Prisma, Student } from "@/generated/prisma";
import { makeApiHandler, prisma, sendError, sendResponse } from "@/lib";
import { NextApiResponse } from "next";

export default makeApiHandler({
  GET: async (req, res: NextApiResponse<Student>) => {
    const studentPid = req.query.studentPid as string;
    const student = await prisma.student.findUnique({
      where: { pid: studentPid },
    });
    if (!student) {
      return sendError(res, 404);
    }
    return res.status(200).json(student);
  },

  PUT: async (req, res: NextApiResponse<Student>) => {
    const studentPid = req.query.studentPid as string;
    const { name } = req.body;
    if (!name) {
      return sendError(res, 400);
    }
    try {
      const student = await prisma.student.update({
        where: { pid: studentPid },
        data: { name },
      });
      return res.status(200).json(student);
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
    const studentPid = req.query.studentPid as string;
    try {
      await prisma.student.delete({
        where: { pid: studentPid },
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
