import { PaymentMethod } from "@/generated/prisma";
import { makeApiHandler, prisma, sendError } from "@/lib";
import { NextApiResponse } from "next";

export default makeApiHandler({
  PUT: async (req, res: NextApiResponse<PaymentMethod>) => {
    const payerPid = req.query.payerPid as string;
    const { name } = req.body;
    if (!name) {
      return sendError(res, 400);
    }
    const payer = await prisma.payer.findUnique({
      where: { pid: payerPid },
    });
    if (!payer) {
      return sendError(res, 404);
    }
    const paymentMethod = await prisma.paymentMethod.upsert({
      where: { payerId: payer.id },
      update: { name },
      create: {
        name,
        ownerType: "payer",
        payer: { connect: { id: payer.id } },
      },
    });
    return res.status(200).json(paymentMethod);
  },
});
