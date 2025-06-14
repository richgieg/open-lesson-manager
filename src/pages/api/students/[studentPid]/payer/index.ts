import { makeApiHandler, prisma, sendError, sendResponse } from "@/lib";
import { NextApiResponse } from "next";

export default makeApiHandler({
  DELETE: async (req, res: NextApiResponse<void>) => {
    const studentPid = req.query.studentPid as string;
    const student = await prisma.student.findUnique({
      where: { pid: studentPid },
    });
    if (!student) {
      return sendError(res, 404);
    }
    if (student.payerId === null) {
      return sendResponse(res, 204);
    }
    await prisma.student.update({
      where: { id: student.id },
      data: { payerId: null },
    });
    return sendResponse(res, 204);
  },
});
