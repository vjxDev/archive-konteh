import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "./prisma"

export const appRouter = trpc.router()
  .query("faculties", {
    async resolve() {
      return await prisma.faculty.findMany()
    }
  })
  .query("rooms", {
    input: z.object({
      faculty: z.string()
    }).or(z.undefined())
    ,
    async resolve({ input }) {
      console.log(input)
      if (input) {
        return await prisma.room.findMany({
          where: { AND: { facultyId: input.faculty } }
        })
      }
      return await prisma.room.findMany()
    }
  })