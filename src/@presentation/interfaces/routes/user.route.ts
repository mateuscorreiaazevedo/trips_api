import { FastifyInstance } from 'fastify'
import { getUserByEmailController } from '../controllers/user'

export async function userRoutes(app: FastifyInstance) {
  app.get('/user/get/:email', getUserByEmailController)
}
