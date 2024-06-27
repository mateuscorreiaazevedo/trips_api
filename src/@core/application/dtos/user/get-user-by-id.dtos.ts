export interface GetUserByIdRequestDTO {
  id: string
}

export interface GetUserByIdResponseDTO {
  id: string
  email: string
  firstName: string
  lastName: string
  birthDate: Date
  avatarUrl?: string
  createdAt: Date
}
