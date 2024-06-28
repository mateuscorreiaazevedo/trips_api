import { CreateUserRequestDTO } from '@core/application/dtos/user'
import { CreateTokenUseCase } from '@core/application/use-cases/authentication'
import { CreateUserUseCase } from '@core/application/use-cases/user'
import { JwtAuthenticationRepository } from '@core/infra/repositories/authentication'
import { PrismaUserRepository } from '@core/infra/repositories/user'
import { FastifyRequest, FastifyReply } from 'fastify'

const prismaUserRepository = new PrismaUserRepository()
const createUserUseCase = new CreateUserUseCase(prismaUserRepository)

const jwtAuthenticationRepository = new JwtAuthenticationRepository()
const createTokenUseCase = new CreateTokenUseCase(jwtAuthenticationRepository)

export async function createUserController(req: FastifyRequest, reply: FastifyReply) {
  try {
    const data = req.body as CreateUserRequestDTO
    const { timezone } = req.headers as { timezone: string }

    const user = await createUserUseCase.execute({ ...data, timezone })
    const token = createTokenUseCase.execute({ id: user.id })

    reply.status(201).send(token)
  } catch (error) {
    reply.status(400).send({ message: (error as Error).message })
  }
}
