import type { NextApiResponse } from "next";
import { Subject } from "@/generated/prisma";
import { makeApiHandler, prisma, sendError } from "@/lib";

export default makeApiHandler({
  GET: async (req, res: NextApiResponse<Subject[]>) => {
    const pid = req.query.pid as string;
    const instructor = await prisma.instructor.findUnique({
      where: { pid },
      include: { subjects: true },
    });
    if (!instructor) {
      return sendError(res, 404);
    }
    return res.status(200).json(instructor.subjects);
  },
});
