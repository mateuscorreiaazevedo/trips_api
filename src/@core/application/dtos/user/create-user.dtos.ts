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
  token: string
}
