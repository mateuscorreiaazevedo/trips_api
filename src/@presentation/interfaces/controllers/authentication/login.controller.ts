import { LoginAuthenticationUseCase } from '@core/application/use-cases/authentication'
import { FindByEmailUseCase } from '@core/application/use-cases/user'
import { JwtAuthenticationRepository } from '@core/infra/repositories/authentication'
import { PrismaUserRepository } from '@core/infra/repositories/user'
import { FastifyReply, FastifyRequest } from 'fastify'

const jwtAuthenticationRepository = new JwtAuthenticationRepository()
const loginAuthenticationUsecase = new LoginAuthenticationUseCase(jwtAuthenticationRepository)

const prismaUserRepository = new PrismaUserRepository()
const findUserByEmailUsecase = new FindByEmailUseCase(prismaUserRepository)

export async function loginAuthenticationController(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { email, password } = req.body as LoginRequestBody

    const { user } = await findUserByEmailUsecase.execute({ email })

    const { token } = await loginAuthenticationUsecase.execute({ user, password })

    reply.status(200).send({ token })
  } catch (error) {
    reply.status(400).send({ message: (error as Error).message })
  }
}
