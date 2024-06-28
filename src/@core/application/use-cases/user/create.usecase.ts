import { CreateUserRequestDTO, CreateUserResponseDTO } from '@core/application/dtos/user'
import { User } from '@core/domains/entities'
import { UserGateway } from '@core/domains/gateways'
import dayjs from '@core/shared/libs/dayjs'

export class CreateUserUseCase {
  private UserGate: UserGateway

  constructor(userGate: UserGateway) {
    this.UserGate = userGate
  }

  async execute(createUserRequestDto: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    const { email, firstName, lastName, birthDate, password, confirmPassword, timezone } =
      createUserRequestDto

    const emailExist = await this.UserGate.findByEmail(email)

    if (emailExist) {
      throw new Error('EMAIL_ALREADY_EXIST')
    }

    if (password !== confirmPassword) {
      throw new Error('PASSWORDS_DO_NOT_MATCH')
    }

    const birthDateFormated = dayjs.tz(birthDate, timezone).toDate()

    const user = new User({
      email,
      firstName,
      lastName,
      birthDate: birthDateFormated,
      password
    })

    const response = await this.UserGate.create(user)

    return {
      id: response.id,
      firstName,
      lastName,
      email,
      birthDate: birthDateFormated.toISOString(),
      avatarUrl: response.avatarUrl,
      createdAt: response.createdAt.toISOString()
    }
  }
}
