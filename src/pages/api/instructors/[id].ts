import { makeApiHandler, prisma } from "@/lib";

export default makeApiHandler({
  GET: async (req, res) => {
    const id = Number(req.query.id as string);
    const instructor = await prisma.instructor.findUnique({ where: { id } });
    if (!instructor) {
      res.status(404).end();
      return;
    }
    res.status(200).json(instructor);
  },
});
