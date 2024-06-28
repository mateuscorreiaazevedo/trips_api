import {
  LoginAuthenticationRequestDTO,
  LoginAuthenticationResponseDTO
} from '@core/application/dtos/authentication'
import { AuthenticationGateway } from '@core/domains/gateways'

export class LoginAuthenticationUseCase {
  private AuthGate: AuthenticationGateway

  constructor(AuthGate: AuthenticationGateway) {
    this.AuthGate = AuthGate
  }

  async execute(
    loginAuthRequestDto: LoginAuthenticationRequestDTO
  ): Promise<LoginAuthenticationResponseDTO> {
    const { password, user } = loginAuthRequestDto

    const authentication = await this.AuthGate.login(user, password)

    if (!authentication) {
      throw new Error('INVALID_CREDENTIALS')
    }

    return {
      token: authentication.token
    }
  }
}
