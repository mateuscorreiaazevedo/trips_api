import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import fastify from 'fastify'
import dotenv from 'dotenv'

const app = fastify()
dotenv.config()

const PORT = 5555
const HOST = '0.0.0.0'

app.register(cors, {
  origin: true
})

app.register(jwt, {
  secret: process.env.JWT_SECRET!
})

app.get('/', () => {
  return 'Hello World'
})

app
  .listen({
    port: PORT,
    host: HOST
  })
  .then(() => {
    console.log(`HTTP running on http://localhost:${PORT}`)
  })
