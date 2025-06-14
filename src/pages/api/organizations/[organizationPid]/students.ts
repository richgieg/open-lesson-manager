import type { NextApiResponse } from "next";
import { Prisma, Student } from "@/generated/prisma";
import { makeApiHandler, prisma, sendError } from "@/lib";

export default makeApiHandler({
  GET: async (req, res: NextApiResponse<Student[]>) => {
    const organizationPid = req.query.organizationPid as string;
    const organization = await prisma.organization.findUnique({
      where: { pid: organizationPid },
      include: { students: true },
    });
    if (!organization) {
      return sendError(res, 404);
    }
    return res.status(200).json(organization.students);
  },

  POST: async (req, res: NextApiResponse<Student>) => {
    const organizationPid = req.query.organizationPid as string;
    const { name } = req.body;
    if (!name) {
      return sendError(res, 400);
    }
    try {
      const student = await prisma.student.create({
        data: {
          name,
          billingType: "self",
          organization: {
            connect: { pid: organizationPid },
          },
        },
      });
      return res.status(201).json(student);
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
