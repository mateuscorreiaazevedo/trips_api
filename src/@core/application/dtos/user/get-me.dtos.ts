export interface GetMeRequestDTO {
  authorization?: string
}

export interface GetMeResponseDTO {
  id: string
  email: string
  firstName: string
  lastName: string
  birthDate: string
  avatarUrl?: string
  createdAt: Date
}
