import { GetMeUseCase } from '@core/application/use-cases/user'
import { PrismaUserRepository } from '@core/infra/repositories/user'
import { FastifyReply, FastifyRequest } from 'fastify'

const prismaUserRepository = new PrismaUserRepository()
const getMeUseCase = new GetMeUseCase(prismaUserRepository)

export async function getMeController(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { authorization } = req.headers

    const user = await getMeUseCase.execute({ authorization })

    reply.status(200).send({ data: user })
  } catch (error) {
    reply.status(500).send({ message: (error as Error).message })
  }
}
