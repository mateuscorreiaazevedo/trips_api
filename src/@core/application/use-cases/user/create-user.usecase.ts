import {
  CreateUserRequestDTO,
  CreateUserResponseDTO
} from '@core/application/dtos/user/create-user.dtos'
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

    console.log(dayjs.tz(birthDate, timezone).toDate())

    const emailExist = await this.UserGate.getUserByEmail(email)

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
      token: response.token
    }
  }
}
