import { CreateUserRequestDTO } from '@core/application/dtos/user'
import { CreateUserUseCase } from '@core/application/use-cases/user'
import { PrismaUserRepository } from '@core/infra/repositories/user'
import { FastifyRequest, FastifyReply } from 'fastify'

const prismaUserRepository = new PrismaUserRepository()
const createUserUseCase = new CreateUserUseCase(prismaUserRepository)

export async function createUserController(req: FastifyRequest, reply: FastifyReply) {
  try {
    const data = req.body as CreateUserRequestDTO
    const { timezone } = req.headers as { timezone: string }

    const response = await createUserUseCase.execute({ ...data, timezone })

    reply.status(201).send(response)
  } catch (error) {
    reply.status(400).send({ message: (error as Error).message })
  }
}
