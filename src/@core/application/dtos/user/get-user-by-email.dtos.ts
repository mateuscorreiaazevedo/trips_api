export interface GetUserByEmailRequestDTO {
  email: string
}

export interface GetUserByEmailResponseDTO {
  id: string
  email: string
  firstName: string
  lastName: string
  birthDate: Date
  avatarUrl?: string
  createdAt: Date
}
