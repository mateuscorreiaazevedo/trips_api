import { z } from 'zod'

export interface IAuthentication {
  token: string
}

export class Authentication {
  private Token: string

  constructor(authentication: IAuthentication) {
    if (!this.isValidToken(authentication.token).success) {
      throw new Error(this.isValidToken(authentication.token).error)
    }

    this.Token = authentication.token
  }

  get token(): string {
    return this.Token
  }

  private isValidToken(token: string): ReturnValidation {
    const validate = z.string({ message: 'INVALID_TOKEN' })

    return {
      success: validate.safeParse(token).success,
      error: validate.safeParse(token).error?.message
    }
  }
}
