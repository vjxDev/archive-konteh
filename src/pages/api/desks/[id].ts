import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/backend/prisma"
import { z } from "zod"


async function r(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    query: {
      id
    }
  } = req
  switch (method) {
    case "DELETE":
      try {
        const deskId = z.string().parse(id)
        await prisma.desk.delete({ where: { id: deskId } })
        res.status(200).end()
      } catch (error) {
        res.status(404).end(`Error`)
      }
      break
    default:
      res.setHeader('Allow', ['DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default r