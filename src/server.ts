import fastify from 'fastify'

const app = fastify()

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