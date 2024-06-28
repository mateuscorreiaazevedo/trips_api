import {
  CreateTokenRequestDTO,
  CreateTokenResponseDTO
} from '@core/application/dtos/authentication'
import { AuthenticationGateway } from '@core/domains/gateways'

export class CreateTokenUseCase {
  private AuthGate: AuthenticationGateway

  constructor(authGateway: AuthenticationGateway) {
    this.AuthGate = authGateway
  }

  execute(createTokenRequestDto: CreateTokenRequestDTO): CreateTokenResponseDTO {
    const { id } = createTokenRequestDto

    const authentication = this.AuthGate.create(id)

    return {
      token: authentication.token
    }
  }
}
