import type { NextApiResponse } from "next";
import { Subject } from "@/generated/prisma";
import { makeApiHandler, prisma, sendError } from "@/lib";

export default makeApiHandler({
  POST: async (req, res: NextApiResponse<Subject>) => {
    const instructorPid = req.query.pid as string;
    const subjectPid = req.query.subjectPid as string;
    if (!subjectPid) {
      return sendError(res, 400);
    }
    const instructor = await prisma.instructor.findUnique({
      where: { pid: instructorPid },
      include: {
        Organization: {
          select: {
            subjects: true,
          },
        },
      },
    });
    const subject = instructor?.Organization.subjects.find(
      (s) => s.pid === subjectPid
    );
    if (!instructor || !subject) {
      return sendError(res, 404);
    }
    await prisma.instructor.update({
      where: { id: instructor.id },
      data: {
        subjects: { connect: { id: subject.id } },
      },
    });
    return res.status(200).json(subject);
  },

  DELETE: async (req, res: NextApiResponse<Subject>) => {
    const instructorPid = req.query.pid as string;
    const subjectPid = req.query.subjectPid as string;
    if (!subjectPid) {
      return sendError(res, 400);
    }
    const instructor = await prisma.instructor.findUnique({
      where: { pid: instructorPid },
      select: { id: true },
    });
    const subject = await prisma.subject.findUnique({
      where: { pid: subjectPid },
    });
    if (!instructor || !subject) {
      return sendError(res, 404);
    }
    await prisma.instructor.update({
      where: { id: instructor.id },
      data: {
        subjects: { disconnect: { id: subject.id } },
      },
    });
    return res.status(200).json(subject);
  },
});
