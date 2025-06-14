import { makeApiHandler, prisma, sendError, sendResponse } from "@/lib";
import { NextApiResponse } from "next";

export default makeApiHandler({
  PUT: async (req, res: NextApiResponse<void>) => {
    const studentPid = req.query.studentPid as string;
    const payerPid = req.query.payerPid as string;
    const [student, payer] = await Promise.all([
      prisma.student.findUnique({
        where: { pid: studentPid },
        include: { paymentMethod: true },
      }),
      prisma.payer.findUnique({
        where: { pid: payerPid },
      }),
    ]);
    if (!student || !payer) {
      return sendError(res, 404);
    }
    if (student.paymentMethod) {
      return sendError(res, 409);
    }
    await prisma.student.update({
      where: { id: student.id },
      data: { payerId: payer.id },
    });
    return sendResponse(res, 204);
  },
});
