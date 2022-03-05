import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/backend/prisma"
import { z } from "zod"


async function r(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { room },
    method,
  } = req
  switch (method) {
    case "GET":
      try {
        const roomID = z.string().parse(room)
        const r = await prisma.desk.findMany({ where: { roomId: roomID }, orderBy: { order: "asc" } })
        res.status(200).json(r)

      }
      catch (error) {
        res.status(404).end(`Error`)

      }
      break
    case "POST":
      try {
        const { roomId } = req.query
        const roomID = z.string().parse(roomId)

        const room = await prisma.room.findFirst({ where: { id: roomID }, select: { desks: true } })

        if (!room) throw new Error("No room with this id exixts");

        const newDesk = await prisma.desk.create({
          data: {
            roomId: roomID,
            order: room.desks.length
          }
        })
        res.status(201).json(newDesk)

      } catch (error) {
        res.status(400).end("Error")
      }
      break
    default:
      res.setHeader('Allow', ['DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default r