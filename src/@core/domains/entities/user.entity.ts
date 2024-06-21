import { z } from 'zod'

export interface IUser {
  id?: bigint
  email: string
  password: string
  avatar?: string | null
  first_name: string
  last_name: string
  birth_date: Date
  created_at: Date
}

export class User {
  private Id: bigint
  private Email: string
  private Password: string
  private Avatar?: string | null
  private FirstName: string
  private LastName: string
  private BirthDate: Date
  private CreatedAt: Date

  constructor(user: IUser) {
    if (user.id && !this.isValidId(user.id).success) {
      throw new Error(this.isValidId(user.id).error)
    }
    if (!this.isValidEmail(user.email).success) {
      throw new Error(this.isValidEmail(user.email).error)
    }
    if (!this.isValidPassword(user.password).success) {
      throw new Error(this.isValidPassword(user.password).error)
    }
    if (user.avatar && !this.isValidAvatar(user.avatar).success) {
      throw new Error(this.isValidAvatar(user.avatar).error)
    }
    if (!this.isValidFirstName(user.first_name).success) {
      throw new Error(this.isValidFirstName(user.first_name).error)
    }
    if (!this.isValidLastName(user.last_name).success) {
      throw new Error(this.isValidLastName(user.last_name).error)
    }
    if (!this.isValidBirthDate(user.birth_date).success) {
      throw new Error(this.isValidBirthDate(user.birth_date).error)
    }
    if (!this.isValidCreatedAt(user.created_at).success) {
      throw new Error(this.isValidCreatedAt(user.created_at).error)
    }

    this.Id = user.id || BigInt(0)
    this.Email = user.email
    this.Password = user.password
    this.Avatar = user.avatar
    this.FirstName = user.first_name
    this.LastName = user.last_name
    this.BirthDate = user.birth_date
    this.CreatedAt = user.created_at
  }

  get id(): bigint {
    return this.Id
  }

  get email(): string {
    return this.Email
  }

  get password(): string {
    return this.Password
  }

  get avatar(): string | undefined | null {
    return this.Avatar
  }

  get first_name(): string {
    return this.FirstName
  }

  get last_name(): string {
    return this.LastName
  }

  get birth_date(): Date {
    return this.BirthDate
  }

  get created_at(): Date {
    return this.CreatedAt
  }

  private isValidId(id: bigint): ReturnValidation {
    const validate = z.bigint({ message: 'INVALID_ID' })

    return {
      success: validate.safeParse(id).success,
      error: validate.safeParse(id).error?.message
    }
  }

  private isValidEmail(email: string): ReturnValidation {
    const validate = z.string().email({ message: 'INVALID_EMAIL' })

    return {
      success: validate.safeParse(email).success,
      error: validate.safeParse(email).error?.message
    }
  }

  private isValidPassword(password: string): ReturnValidation {
    const validate = z
      .string()
      .min(8, { message: 'INVALID_PASSWORD' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'INVALID_PASSWORD'
      })

    return {
      success: validate.safeParse(password).success,
      error: validate.safeParse(password).error?.message
    }
  }

  private isValidAvatar(avatar: string): ReturnValidation {
    const validate = z.string().url({ message: 'INVALID_AVATAR' })

    return {
      success: validate.safeParse(avatar).success,
      error: validate.safeParse(avatar).error?.message
    }
  }

  private isValidFirstName(first_name: string): ReturnValidation {
    const validate = z.string().min(2, { message: 'INVALID_FIRST_NAME' })

    return {
      success: validate.safeParse(first_name).success,
      error: validate.safeParse(first_name).error?.message
    }
  }

  private isValidLastName(last_name: string): ReturnValidation {
    const validate = z.string().min(2, { message: 'INVALID_LAST_NAME' })

    return {
      success: validate.safeParse(last_name).success,
      error: validate.safeParse(last_name).error?.message
    }
  }

  private isValidBirthDate(birth_date: Date): ReturnValidation {
    const validate = z.date({ message: 'INVALID_BIRTH_DATE' })

    return {
      success: validate.safeParse(birth_date).success,
      error: validate.safeParse(birth_date).error?.message
    }
  }

  private isValidCreatedAt(created_at: Date): ReturnValidation {
    const validate = z.date({ message: 'INVALID_CREATED_AT' })

    return {
      success: validate.safeParse(created_at).success,
      error: validate.safeParse(created_at).error?.message
    }
  }
}
