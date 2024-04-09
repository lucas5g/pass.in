import { FastifyInstance } from "fastify";
import { BadRequest } from "../routes/_errors/bad-request";
import { ZodError } from "zod";

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {

  if(error instanceof ZodError){
    reply.status(400).send({
      message: 'Error during validadtion',
      errors: error.flatten().fieldErrors
    })
  }

  if(error instanceof BadRequest){
    reply.status(400).send({message: error.message})
  }

  reply.status(500).send({ message: 'Um erro aconteceu!'})
}