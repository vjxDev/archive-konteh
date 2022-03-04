import { FileJson } from "@/types";
import { prisma } from "@/backend/prisma"



// @ts-ignore
async function fill(): void {

  const data = require("./citaonice.json") as FileJson
  console.log(data)
  for (const f of data.faculties) {

    const { name, rooms } = f
    const faculty = await prisma.faculty.create({
      data: {
        id: f.id, name, wCloses: f["working-hours"].closes, wOpens: f["working-hours"].opens,
      }, include: { rooms: true }
    })

    for (const room of rooms) {
      const { name, desks } = room
      const r = await prisma.room.create({
        data: {
          id: room.id,
          name,
          facultyId: faculty.id,
        }
      })

      for (const desk of desks) {
        await prisma.desk.create({
          data: {
            id: desk.id,
            order: desk.order,
            roomID: room.id
          }
        })
      }
    }
  }
}
// @ts-ignore
fill()