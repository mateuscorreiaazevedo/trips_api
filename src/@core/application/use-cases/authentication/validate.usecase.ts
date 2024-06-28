import {
  ValidateAuthenticationRequestDTO,
  ValidateAuthenticationResponseDTO
} from '@core/application/dtos/authentication'
import { AuthenticationGateway } from '@core/domains/gateways'

export class ValidateAuthenticationUseCase {
  private AuthGate: AuthenticationGateway

  constructor(authGateway: AuthenticationGateway) {
    this.AuthGate = authGateway
  }

  execute(
    validateAuthenticationRequestDto: ValidateAuthenticationRequestDTO
  ): ValidateAuthenticationResponseDTO {
    const { authorization } = validateAuthenticationRequestDto

    if (!authorization) {
      throw new Error('AUTHORIZATION_REQUIRED')
    }

    const id = this.AuthGate.validate(authorization)

    return { id }
  }
}
