import type { NextApiResponse } from "next";
import { Organization, Prisma, Subject } from "@/generated/prisma";
import { makeApiHandler, prisma, sendError } from "@/lib";

export default makeApiHandler({
  GET: async (req, res: NextApiResponse<Subject[]>) => {
    const organizationPid = req.query.organizationPid as string;
    const organization = await prisma.organization.findUnique({
      where: { pid: organizationPid },
      include: { subjects: true },
    });
    if (!organization) {
      return sendError(res, 404);
    }
    return res.status(200).json(organization.subjects);
  },

  POST: async (req, res: NextApiResponse<Organization>) => {
    const organizationPid = req.query.organizationPid as string;
    const { name } = req.body;
    if (!name) {
      return sendError(res, 400);
    }
    try {
      const subject = await prisma.subject.create({
        data: {
          name,
          Organization: {
            connect: { pid: organizationPid },
          },
        },
      });
      return res.status(201).json(subject);
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
