import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function getEvent(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/events/:eventId', {
      schema: {
        params: z.object({
          eventId: z.string().uuid()
        }),
        response: {
          200:{
            event:z.object({
              id: z.string(),
              title: z.string(),
              slug: z.string(),
              details: z.string(),
              maximumAttendess: z.string(),
              attendeesAmount: z.string()
            })
          }
        }
      }
    }, async (req, res) => {
      const { eventId } = req.params

      const event = await prisma.event.findUnique({
        select: {
          id: true,
          title: true,
          slug: true,
          details: true,
          maximumAttendees: true,
          _count: {
            select: {
              attendees: true
            }
          }
        },
        where: {
          id: eventId
        }
      })


      if (!event) {
        throw new Error('Event no found.')
      }

      return res.send({
        event: {
          ...event,
          _count: undefined,
          attendeesAmount: event._count.attendees
        }
      })
    })
}