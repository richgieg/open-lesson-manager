import type { NextApiResponse } from "next";
import { Organization } from "@/generated/prisma";
import { makeApiHandler, prisma, sendError } from "@/lib";

export default makeApiHandler({
  GET: async (req, res: NextApiResponse<Organization[]>) => {
    const organizations = await prisma.organization.findMany();
    return res.status(200).json(organizations);
  },

  POST: async (req, res: NextApiResponse<Organization>) => {
    const { name } = req.body;
    if (!name) {
      return sendError(res, 400);
    }
    const organization = await prisma.organization.create({ data: { name } });
    return res.status(201).json(organization);
  },
});
