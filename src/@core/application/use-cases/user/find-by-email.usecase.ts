import { FindByEmailRequestDTO, FindByEmailResponseDTO } from '@core/application/dtos/user'
import { UserGateway } from '@core/domains/gateways'

export class FindByEmailUseCase {
  private UserGate: UserGateway

  constructor(userGateway: UserGateway) {
    this.UserGate = userGateway
  }

  async execute(findByEmailRequestDto: FindByEmailRequestDTO): Promise<FindByEmailResponseDTO> {
    const { email } = findByEmailRequestDto

    const user = await this.UserGate.findByEmail(email)

    if (!user) {
      throw new Error('INVALID_EMAIL')
    }

    return { user }
  }
}
