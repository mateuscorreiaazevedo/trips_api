import { UserGateway } from '@core/domains/gateways'
import { GetUserByEmailRequestDTO, GetUserByEmailResponseDTO } from '../../dtos/user'

export class GetUserByEmailUseCase {
  private UserGate: UserGateway

  constructor(userGate: UserGateway) {
    this.UserGate = userGate
  }

  async execute(
    getByEmailRequestDto: GetUserByEmailRequestDTO
  ): Promise<GetUserByEmailResponseDTO> {
    const { email } = getByEmailRequestDto

    const user = await this.UserGate.getUserByEmail(email)

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt
    }
  }
}
