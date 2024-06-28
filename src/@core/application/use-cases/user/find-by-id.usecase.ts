import { UserGateway } from '@core/domains/gateways'
import { GetUserByIdRequestDTO, GetUserByIdResponseDTO } from '../../dtos/user'

export class FindUserByIdUseCase {
  private UserGate: UserGateway

  constructor(userGate: UserGateway) {
    this.UserGate = userGate
  }

  async execute(getByIdRequestDto: GetUserByIdRequestDTO): Promise<GetUserByIdResponseDTO> {
    const { id } = getByIdRequestDto

    const user = await this.UserGate.findById(id)

    if (!user) {
      throw new Error('USER_NOT_FOUND')
    }

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
