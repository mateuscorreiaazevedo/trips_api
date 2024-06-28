export interface FindUserByIdRequestDTO {
  id: string
}

export interface FindUserByIdResponseDTO {
  id: string
  email: string
  firstName: string
  lastName: string
  birthDate: Date
  avatarUrl?: string
  createdAt: Date
}
