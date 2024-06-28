import { FindUserByIdRequestDTO } from '@core/application/dtos/user'
import { FindUserByIdUseCase } from '@core/application/use-cases/user'
import { PrismaUserRepository } from '@core/infra/repositories/user'
import { FastifyReply, FastifyRequest } from 'fastify'

const prismaUserRepository = new PrismaUserRepository()
const findUserByIdUsecase = new FindUserByIdUseCase(prismaUserRepository)

export async function getUserByIdController(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = req.params as FindUserByIdRequestDTO

    const user = await findUserByIdUsecase.execute({ id })

    reply.status(200).send({ data: user })
  } catch (error) {
    reply.status(500).send({ message: (error as Error).message })
  }
}
