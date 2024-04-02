import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'
import { z } from 'zod'

const prisma = new PrismaClient({
	log:['query']
})

const app = fastify()

app.post('/events', async(req, res ) => {
	const data = z.object({
		title: z.string().min(4),
		details: z.string().nullable(),
		maximumAttendees: z.number().int().positive().nullable()
	}).parse(req.body)

	const event = await  prisma.event.create({ 
		data:{
			...data, 
			slug: new Date().toISOString()
		}
	})
	
	res.status(201).send(event)
})

app.get('/', () => {
	return 'Hello nlw unite'
})

app.get('/test', () => {
	return 'hello'
})

app
	.listen({port: 3333})
	.then(() => {
		console.log('HTTP Server running!')
	})