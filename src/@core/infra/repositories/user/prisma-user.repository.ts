import { User } from '@core/domains/entities'
import { UserGateway } from '@core/domains/gateways'
import { PrismaAdapter } from '@core/infra/adapters'
import { HashHelper } from '@core/shared/utils/hash-helper'

const hashHelper = new HashHelper()

export class PrismaUserRepository extends PrismaAdapter implements UserGateway {
  // Create a new user
  async create(user: User): Promise<User> {
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

    const { avatarUrl, ...rest } = response

    return new User({ avatarUrl: avatarUrl ?? undefined, ...rest })
  }

  // Find a user by id
  async findById(id: string): Promise<User | null> {
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

  // Find a user by email
  async findByEmail(email: string): Promise<User | null> {
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
}
