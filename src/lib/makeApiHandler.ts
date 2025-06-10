import { NextApiRequest, NextApiResponse } from "next";

type Method = "GET" | "POST" | "PUT" | "DELETE";

type MethodHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => void | Promise<void | NextApiResponse>;

export function makeApiHandler(
  methodHandlers: Partial<Record<Method, MethodHandler>>
) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    const methodHandler = (
      methodHandlers as Partial<Record<string, MethodHandler>>
    )[req.method ?? ""];
    if (methodHandler) {
      try {
        return methodHandler(req, res);
      } catch {
        return res.status(500).end();
      }
    }
    res.setHeader("Allow", Object.keys(methodHandlers).join(", "));
    return res.status(405).end();
  };
}
