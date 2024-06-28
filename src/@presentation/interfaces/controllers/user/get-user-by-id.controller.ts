import { GetUserByIdRequestDTO } from '@core/application/dtos/user'
import { GetUserByIdUseCase } from '@core/application/use-cases/user'
import { PrismaUserRepository } from '@core/infra/repositories/user'
import { FastifyReply, FastifyRequest } from 'fastify'

const prismaUserRepository = new PrismaUserRepository()
const getUserByIdUseCase = new GetUserByIdUseCase(prismaUserRepository)

export async function getUserByIdController(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = req.params as GetUserByIdRequestDTO

    const user = await getUserByIdUseCase.execute({ id })

    reply.status(200).send({ data: user })
  } catch (error) {
    reply.status(500).send({ message: (error as Error).message })
  }
}
