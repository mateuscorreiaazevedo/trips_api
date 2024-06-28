import { User } from '@core/domains/entities'

export interface FindByEmailRequestDTO {
  email: string
}

export interface FindByEmailResponseDTO {
  user: User
}
