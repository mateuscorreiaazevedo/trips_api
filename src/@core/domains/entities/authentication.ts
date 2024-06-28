import { z } from 'zod'

export class Authentication {
  private Token: string
  constructor(token: string) {
    if (!this.isValidToken(token).success) {
      throw new Error(this.isValidToken(token).message)
    }

    this.Token = token
  }

  get token(): string {
    return this.Token
  }

  private isValidToken(token: string): ReturnValue {
    const validate = z.string().min(1, 'INVALID_TOKEN')

    return {
      success: validate.safeParse(token).success,
      message: validate.safeParse(token).error?.errors[0]?.message
    }
  }
}
