import { Authentication, User } from '@core/domains/entities'
import { UserRepository } from './user.repository'
import { prismaModel } from '@core/infra/models'
import { jwtHandler } from '@core/infra/utils/jwt'
import { cryptHandler } from '@core/infra/utils/crypt'
import { z } from 'zod'

export class PrismaUserRepository implements UserRepository {
  async createUser(user: User): Promise<Authentication> {
    const { email, password, first_name, last_name, avatar, birth_date } = user

    const hashedPassword = await cryptHandler.hash(password)

    const newUser = await prismaModel.user.create({
      data: {
        email,
        password: hashedPassword,
        first_name,
        last_name,
        birth_date,
        avatar
      }
    })

    const { id: _id, ...rest } = newUser

    const createdUser = new User({
      id: newUser.id ?? BigInt(0),
      ...rest
    })

    const token = jwtHandler.encrypt(createdUser)

    return new Authentication({ token })
  }

  async getUserByEmail(email: string): Promise<User> {
    const findedUser = await prismaModel.user.findUnique({
      where: {
        email
      }
    })

    if (!findedUser) {
      throw new Error('USER_NOT_FOUND')
    }

    const { id: _id, ...rest } = findedUser

    const user = new User({
      id: findedUser.id ?? BigInt(0),
      ...rest
    })

    return user
  }

  async getUserById(id: bigint): Promise<User> {
    const findedUser = await prismaModel.user.findUnique({
      where: {
        id
      }
    })

    if (!findedUser) {
      throw new Error('USER_NOT_FOUND')
    }

    const { id: _id, ...rest } = findedUser

    const user = new User({
      id: findedUser.id ?? BigInt(0),
      ...rest
    })

    return user
  }

  async loginUser(email: string, password: string): Promise<Authentication> {
    const validateEmail = z.string().email({ message: 'INVALID_EMAIL' }).parse(email)
    const validatePassword = z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'INVALID_PASSWORD'
      })
      .parse(password)

    const findUser = await prismaModel.user.findUnique({
      where: {
        email: validateEmail
      }
    })

    if (!findUser) {
      throw new Error('INVALID_CREDENTIALS')
    }

    const verifyPassword = await cryptHandler.compare(validatePassword, findUser.password)

    if (!verifyPassword) {
      throw new Error('INVALID_CREDENTIALS')
    }

    const { id: _id, ...rest } = findUser

    const token = jwtHandler.encrypt(new User({ id: findUser.id ?? BigInt(0), ...rest }))

    return new Authentication({ token })
  }
}
