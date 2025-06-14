import { PaymentMethod } from "@/generated/prisma";
import { makeApiHandler, prisma, sendError } from "@/lib";
import { NextApiResponse } from "next";

export default makeApiHandler({
  PUT: async (req, res: NextApiResponse<PaymentMethod>) => {
    const studentPid = req.query.studentPid as string;
    const { name } = req.body;
    if (!name) {
      return sendError(res, 400);
    }
    const student = await prisma.student.findUnique({
      where: { pid: studentPid },
    });
    if (!student) {
      return sendError(res, 404);
    }
    if (student.payerId !== null) {
      return sendError(res, 409);
    }
    const paymentMethod = await prisma.paymentMethod.upsert({
      where: { studentId: student.id },
      update: { name },
      create: {
        name,
        ownerType: "student",
        student: { connect: { id: student.id } },
      },
    });
    return res.status(200).json(paymentMethod);
  },
});
