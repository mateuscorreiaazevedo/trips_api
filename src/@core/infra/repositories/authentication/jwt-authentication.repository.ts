import { Authentication, User } from '@core/domains/entities'
import { AuthenticationGateway } from '@core/domains/gateways'
import { JwtAdapter } from '@core/infra/adapters'
import { HashHelper } from '@core/shared/utils/hash-helper'

const hashHelper = new HashHelper()

export class JwtAuthenticationRepository extends JwtAdapter implements AuthenticationGateway {
  async verifyPassword(user: User, password: string): Promise<Authentication | null> {
    const validatePassword = await hashHelper.compare(password, user.password)
    if (!validatePassword) {
      return null
    }

    const payload = { id: user.id }
    const token = this.generateToken(payload)

    return new Authentication(token)
  }

  create(id: string): Authentication {
    const payload = { id }
    const token = this.generateToken(payload)

    return new Authentication(token)
  }

  validate(authentication: string): string {
    const token = authentication.replace('Bearer ', '')

    const validateToken = this.verifyToken<{ id: string }>(token)

    return validateToken.id
  }
}
