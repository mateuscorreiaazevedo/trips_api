import { UserGateway } from '@core/domains/gateways'
import { GetUserByIdRequestDTO, GetUserByIdResponseDTO } from '../../dtos/user'

export class GetUserByIdUseCase {
  private UserGate: UserGateway

  constructor(userGate: UserGateway) {
    this.UserGate = userGate
  }

  async execute(getByIdRequestDto: GetUserByIdRequestDTO): Promise<GetUserByIdResponseDTO> {
    const { id } = getByIdRequestDto

    const user = await this.UserGate.getUserById(id)

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
