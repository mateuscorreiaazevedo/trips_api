import {
  VerifyPasswordRequestDTO,
  VerifyPasswordResponseDTO
} from '@core/application/dtos/authentication'
import { AuthenticationGateway } from '@core/domains/gateways'

export class VerifyPasswordUseCase {
  private AuthGate: AuthenticationGateway

  constructor(AuthGate: AuthenticationGateway) {
    this.AuthGate = AuthGate
  }

  async execute(
    verifyPasswordRequestDto: VerifyPasswordRequestDTO
  ): Promise<VerifyPasswordResponseDTO> {
    const { password, user } = verifyPasswordRequestDto

    const authentication = await this.AuthGate.verifyPassword(user, password)

    if (!authentication) {
      throw new Error('INVALID_CREDENTIALS')
    }

    return {
      token: authentication.token
    }
  }
}
