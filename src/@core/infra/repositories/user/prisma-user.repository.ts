import { User } from '@core/domains/entities'
import { UserGateway } from '@core/domains/gateways'
import { PrismaAdapter } from '@core/infra/adapters'

export class PrismaUserRepository extends PrismaAdapter implements UserGateway {
  async getUserById(id: string): Promise<User> {
    const user = await this.prismaAdapter.user.findUnique({
      where: {
        id
      }
    })

    if (!user) {
      throw new Error('USER_NOT_FOUND')
    }

    const { avatarUrl, ...rest } = user

    return new User({ avatarUrl: avatarUrl ?? undefined, ...rest })
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.prismaAdapter.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      throw new Error('USER_NOT_FOUND')
    }

    const { avatarUrl, ...rest } = user

    return new User({ avatarUrl: avatarUrl ?? undefined, ...rest })
  }
}
