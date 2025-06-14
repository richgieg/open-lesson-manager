import { Organization, Prisma } from "@/generated/prisma";
import { makeApiHandler, prisma, sendError, sendResponse } from "@/lib";
import { NextApiResponse } from "next";

export default makeApiHandler({
  GET: async (req, res: NextApiResponse<Organization>) => {
    const organizationPid = req.query.organizationPid as string;
    const organization = await prisma.organization.findUnique({
      where: { pid: organizationPid },
    });
    if (!organization) {
      return sendError(res, 404);
    }
    return res.status(200).json(organization);
  },

  PUT: async (req, res: NextApiResponse<Organization>) => {
    const organizationPid = req.query.organizationPid as string;
    const { name } = req.body;
    if (!name) {
      return sendError(res, 400);
    }
    try {
      const organization = await prisma.organization.update({
        where: { pid: organizationPid },
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

  DELETE: async (req, res: NextApiResponse<void>) => {
    const organizationPid = req.query.organizationPid as string;
    try {
      await prisma.organization.delete({
        where: { pid: organizationPid },
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
