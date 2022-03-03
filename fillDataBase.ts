import { Faculty } from "@/types";
import { PrismaClient } from "@prisma/client"


const prisma =
  new PrismaClient({
    log: ["query"],
  });

// @ts-ignore
async function fill(): void {

  const data = require("./citaonice.json") as Faculty[]
  for (const f of data) {
    const { name, rooms } = f
    const faculty = await prisma.faculty.create({
      data: {
        id: f.id, name, wCloses: f["working-hours"].closes, wOpens: f["working-hours"].opens
      }
    })
    const x = await prisma.faculty.findMany()


    for (const room of rooms) {
      const { name, desks } = room
      prisma.room.create({
        data: {
          id: room.id,
          name,
          facultyId
        }
      })
    }
  }


}

fill()