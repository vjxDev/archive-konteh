import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/backend/prisma"


async function r(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { faculty },
    method,
  } = req
  switch (method) {
    case "GET":
      if (typeof faculty === 'string' || faculty === undefined) {
        const r = await prisma.room.findMany({ where: { facultyId: faculty } })
        res.status(200).json(r)
      } else {
        res.status(404).end(`Error`)
      }
      break

    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default r