import { GetMeRequestDTO, GetMeResponseDTO } from '@core/application/dtos/user'
import { UserGateway } from '@core/domains/gateways'

export class GetMeUseCase {
  private UserGate: UserGateway

  constructor(userGate: UserGateway) {
    this.UserGate = userGate
  }

  async execute(getMeRequestDto: GetMeRequestDTO): Promise<GetMeResponseDTO> {
    const { authorization } = getMeRequestDto

    const token = authorization?.replace('Bearer ', '')

    if (!token) {
      throw new Error('TOKEN_NOT_FOUND')
    }

    const user = await this.UserGate.me(token)

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate.toISOString(),
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt
    }
  }
}
