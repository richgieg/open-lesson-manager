import { Instructor, Prisma } from "@/generated/prisma";
import { makeApiHandler, prisma } from "@/lib";
import { NextApiResponse } from "next";

export default makeApiHandler({
  GET: async (req, res: NextApiResponse<Instructor>) => {
    const id = Number(req.query.id as string);
    if (isNaN(id)) {
      return res.status(400).end();
    }
    const instructor = await prisma.instructor.findUnique({ where: { id } });
    if (!instructor) {
      return res.status(404).end();
    }
    return res.status(200).json(instructor);
  },

  PUT: async (req, res: NextApiResponse<Instructor>) => {
    const id = Number(req.query.id as string);
    if (isNaN(id)) {
      return res.status(400).end();
    }
    const { name } = req.body;
    if (!name) {
      return res.status(400).end();
    }
    try {
      const instructor = await prisma.instructor.update({
        where: { id },
        data: { name },
      });
      return res.status(200).json(instructor);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          return res.status(404).end();
        }
      }
      return res.status(500).end();
    }
  },

  DELETE: async (req, res: NextApiResponse<Instructor>) => {
    const id = Number(req.query.id as string);
    if (isNaN(id)) {
      return res.status(400).end();
    }
    try {
      const instructor = await prisma.instructor.delete({ where: { id } });
      return res.status(200).json(instructor);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          return res.status(404).end();
        }
      }
      return res.status(500).end();
    }
  },
});
