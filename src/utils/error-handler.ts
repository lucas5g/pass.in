import { FastifyError, FastifyInstance } from "fastify";

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {

  reply.status(500).send({ message: 'Um erro aconteceu!'})
}