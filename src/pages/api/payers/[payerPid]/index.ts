import { Payer, Prisma } from "@/generated/prisma";
import { makeApiHandler, prisma, sendError, sendResponse } from "@/lib";
import { NextApiResponse } from "next";

export default makeApiHandler({
  GET: async (req, res: NextApiResponse<Payer>) => {
    const payerPid = req.query.payerPid as string;
    const payer = await prisma.payer.findUnique({
      where: { pid: payerPid },
    });
    if (!payer) {
      return sendError(res, 404);
    }
    return res.status(200).json(payer);
  },

  PUT: async (req, res: NextApiResponse<Payer>) => {
    const payerPid = req.query.payerPid as string;
    const { name } = req.body;
    if (!name) {
      return sendError(res, 400);
    }
    try {
      const payer = await prisma.payer.update({
        where: { pid: payerPid },
        data: { name },
      });
      return res.status(200).json(payer);
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
    const payerPid = req.query.payerPid as string;
    try {
      await prisma.payer.delete({
        where: { pid: payerPid },
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
