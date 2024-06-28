export interface CreateUserRequestDTO {
  email: string
  firstName: string
  lastName: string
  birthDate: string
  password: string
  confirmPassword: string
  timezone?: string
}

export interface CreateUserResponseDTO {
  id: string
  firstName: string
  lastName: string
  email: string
  birthDate: string
  avatarUrl?: string
  createdAt: string
}
