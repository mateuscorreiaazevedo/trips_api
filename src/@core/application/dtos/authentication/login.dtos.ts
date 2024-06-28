import { User } from '@core/domains/entities'

export interface LoginAuthenticationRequestDTO {
  user: User
  password: string
}

export interface LoginAuthenticationResponseDTO {
  token: string
}
