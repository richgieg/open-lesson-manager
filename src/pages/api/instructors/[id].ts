import { Instructor, Prisma } from "@/generated/prisma";
import { makeApiHandler, prisma } from "@/lib";
import { NextApiResponse } from "next";

export default makeApiHandler({
  GET: async (req, res: NextApiResponse<Instructor>) => {
    const id = Number(req.query.id as string);
    if (isNaN(id)) {
      res.status(400).end();
      return;
    }
    const instructor = await prisma.instructor.findUnique({ where: { id } });
    if (!instructor) {
      res.status(404).end();
      return;
    }
    res.status(200).json(instructor);
  },

  PUT: async (req, res: NextApiResponse<Instructor>) => {
    const id = Number(req.query.id as string);
    if (isNaN(id)) {
      res.status(400).end();
      return;
    }
    const { name } = req.body;
    if (!name) {
      res.status(400).end();
      return;
    }
    try {
      const instructor = await prisma.instructor.update({
        where: { id },
        data: { name },
      });
      res.status(200).json(instructor);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          res.status(404).end();
          return;
        }
      }
      res.status(500).end();
    }
  },

  DELETE: async (req, res: NextApiResponse<Instructor>) => {
    const id = Number(req.query.id as string);
    if (isNaN(id)) {
      res.status(400).end();
      return;
    }
    try {
      const instructor = await prisma.instructor.delete({ where: { id } });
      res.status(200).json(instructor);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          res.status(404).end();
          return;
        }
      }
      res.status(500).end();
    }
  },
});
