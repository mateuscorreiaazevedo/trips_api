import { GetUserByEmailRequestDTO } from '@core/application/dtos/user'
import { GetUserByEmailUseCase } from '@core/application/use-cases/user'
import { PrismaUserRepository } from '@core/infra/repositories/user'
import { FastifyReply, FastifyRequest } from 'fastify'

const prismaUserRepository = new PrismaUserRepository()
const getUserByEmailUseCase = new GetUserByEmailUseCase(prismaUserRepository)

export async function getUserByEmailController(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { email } = req.params as GetUserByEmailRequestDTO

    const user = await getUserByEmailUseCase.execute({ email })

    reply.status(200).send({ data: user })
  } catch (error) {
    reply.status(500).send({ message: (error as Error).message })
  }
}
