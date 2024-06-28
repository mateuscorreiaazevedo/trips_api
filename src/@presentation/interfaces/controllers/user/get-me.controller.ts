import { ValidateAuthenticationUseCase } from '@core/application/use-cases/authentication'
import { FindUserByIdUseCase } from '@core/application/use-cases/user'
import { JwtAuthenticationRepository } from '@core/infra/repositories/authentication'
import { PrismaUserRepository } from '@core/infra/repositories/user'
import { FastifyReply, FastifyRequest } from 'fastify'

const prismaUserRepository = new PrismaUserRepository()
const jwtAuthenticationRepository = new JwtAuthenticationRepository()

const findUserByIdUsecase = new FindUserByIdUseCase(prismaUserRepository)
const validateAuthenticationUsecase = new ValidateAuthenticationUseCase(
  jwtAuthenticationRepository
)

export async function getMeController(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { authorization } = req.headers
    const id = validateAuthenticationUsecase.execute({ authorization })

    const user = await findUserByIdUsecase.execute(id)

    reply.status(200).send({ data: user })
  } catch (error) {
    reply.status(400).send({ message: (error as Error).message })
  }
}
