import { Authentication, User } from '@core/domains/entities'
import { UserGateway } from '@core/domains/gateways'
import { PrismaAdapter } from '@core/infra/adapters'
import { HashHelper } from '@core/shared/utils/hash-helper'
import { JwtHelper } from '@core/shared/utils/jwt-helper'

const hashHelper = new HashHelper()
const jwtHelper = new JwtHelper()

export class PrismaUserRepository extends PrismaAdapter implements UserGateway {
  async create(user: User): Promise<Authentication> {
    const hashedPassword = await hashHelper.encrypt(user.password)

    const response = await this.prismaAdapter.user.create({
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: user.birthDate,
        avatarUrl: user.avatarUrl,
        password: hashedPassword
      }
    })

    const token = jwtHelper.generateToken({
      id: response.id
    })

    return new Authentication(token)
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await this.prismaAdapter.user.findUnique({
      where: {
        id
      }
    })

    if (!user) {
      return null
    }

    const { avatarUrl, ...rest } = user

    return new User({ avatarUrl: avatarUrl ?? undefined, ...rest })
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prismaAdapter.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      return null
    }

    const { avatarUrl, ...rest } = user

    return new User({ avatarUrl: avatarUrl ?? undefined, ...rest })
  }

  async me(token: string): Promise<User | null> {
    const { id } = jwtHelper.verifyToken<{ id: string }>(token)

    const user = await this.prismaAdapter.user.findUnique({
      where: {
        id
      }
    })

    if (!user) {
      return null
    }

    const { avatarUrl, ...rest } = user

    return new User({ avatarUrl: avatarUrl ?? undefined, ...rest })
  }
}
