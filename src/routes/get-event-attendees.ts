import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function getEventAttendees(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/events/:eventId/attendees', {
      schema: {
        params: z.object({
          eventId: z.string().uuid()
        }),
        querystring: z.object({
          query: z.string().nullable(),
          pageIndex: z.string().nullable().default('0').transform(Number)
        }),
        response: {

        }
      }
    }, async (req, res) => {
      const { eventId } = req.params
      const { pageIndex, query  } = req.query

      const attendees = await prisma.attendee.findMany({
        select:{
          id: true,
          name: true,
          email: true,
          createdAt:true,
          checkIn:{
            select:{
              createdAt: true
            }
          }
        },
        where: query ? {
          eventId,
          name:{
            contains: query
          }
        }: {
          eventId
        },
        take: 10,
        skip: pageIndex * 10
      })

      return { attendees }
    })
}