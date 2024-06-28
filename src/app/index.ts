import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import fastify from 'fastify'
import dotenv from 'dotenv'
import { authRoutes, userRoutes } from '@presentation/interfaces/routes'

const app = fastify()
dotenv.config()

const secret = process.env.JWT_SECRET || 'secret'
const port = process.env.PORT ? Number(process.env.PORT) : 80
const host = process.env.HOST ? process.env.HOST : ''

app.register(cors, {
  origin: true
})

app.register(jwt, {
  secret
})

app.register(userRoutes)
app.register(authRoutes)

app.get('/api/hello', () => {
  return 'Hello World'
})

app
  .listen({
    port,
    host
  })
  .then(() => {
    console.log(`HTTP running on http://localhost:${port}`)
  })
