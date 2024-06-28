import { FastifyInstance } from 'fastify'
import { loginAuthenticationController } from '../controllers/authentication'

export async function authRoutes(app: FastifyInstance) {
  app.post('/auth/login', loginAuthenticationController)
}
