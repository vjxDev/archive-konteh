import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/backend/prisma"

async function r(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  switch (method) {
    case "GET":
      const r = await prisma.faculty.findMany()
      res.status(200).json(r)
      break

    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default r