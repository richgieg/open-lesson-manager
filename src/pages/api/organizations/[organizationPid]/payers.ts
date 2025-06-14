import type { NextApiResponse } from "next";
import { Payer, Prisma } from "@/generated/prisma";
import { makeApiHandler, prisma, sendError } from "@/lib";

export default makeApiHandler({
  GET: async (req, res: NextApiResponse<Payer[]>) => {
    const organizationPid = req.query.organizationPid as string;
    const organization = await prisma.organization.findUnique({
      where: { pid: organizationPid },
      include: { payers: true },
    });
    if (!organization) {
      return sendError(res, 404);
    }
    return res.status(200).json(organization.payers);
  },

  POST: async (req, res: NextApiResponse<Payer>) => {
    const organizationPid = req.query.organizationPid as string;
    const { name } = req.body;
    if (!name) {
      return sendError(res, 400);
    }
    try {
      const payer = await prisma.payer.create({
        data: {
          name,
          organization: {
            connect: { pid: organizationPid },
          },
        },
      });
      return res.status(201).json(payer);
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
