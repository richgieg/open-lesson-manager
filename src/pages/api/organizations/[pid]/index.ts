import { Organization, Prisma } from "@/generated/prisma";
import { makeApiHandler, prisma, sendError } from "@/lib";
import { NextApiResponse } from "next";

export default makeApiHandler({
  GET: async (req, res: NextApiResponse<Organization>) => {
    const pid = req.query.pid as string;
    const organization = await prisma.organization.findUnique({
      where: { pid },
    });
    if (!organization) {
      return sendError(res, 404);
    }
    return res.status(200).json(organization);
  },

  PUT: async (req, res: NextApiResponse<Organization>) => {
    const pid = req.query.pid as string;
    const { name } = req.body;
    if (!name) {
      return sendError(res, 400);
    }
    try {
      const organization = await prisma.organization.update({
        where: { pid },
        data: { name },
      });
      return res.status(200).json(organization);
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

  DELETE: async (req, res: NextApiResponse<Organization>) => {
    const pid = req.query.pid as string;
    try {
      const organization = await prisma.organization.delete({ where: { pid } });
      return res.status(200).json(organization);
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
