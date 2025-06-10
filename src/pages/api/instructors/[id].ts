import { Instructor } from "@/generated/prisma";
import { makeApiHandler, prisma } from "@/lib";
import { NextApiResponse } from "next";

export default makeApiHandler({
  GET: async (req, res: NextApiResponse<Instructor>) => {
    const id = Number(req.query.id as string);
    const instructor = await prisma.instructor.findUnique({ where: { id } });
    if (!instructor) {
      res.status(404).end();
      return;
    }
    res.status(200).json(instructor);
  },
});
