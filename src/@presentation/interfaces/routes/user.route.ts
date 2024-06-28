import { FastifyInstance } from 'fastify'
import {
  createUserController,
  getMeController,
  getUserByIdController
} from '../controllers/user'

export async function userRoutes(app: FastifyInstance) {
  app.get('/user/get/:id', getUserByIdController)
  app.post('/user/create', createUserController)
  app.get('/user/me', getMeController)
}
