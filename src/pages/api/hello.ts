// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@/generated/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
  authorId: number | null;
}[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient();
  const posts = await prisma.post.findMany({ take: 10 });
  res.status(200).json(posts);
}
