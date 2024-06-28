import { User } from '@core/domains/entities'

export interface VerifyPasswordRequestDTO {
  user: User
  password: string
}

export interface VerifyPasswordResponseDTO {
  token: string
}
