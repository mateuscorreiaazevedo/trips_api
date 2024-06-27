import { validateLegalAge } from '@core/shared/utils/validate-legal-age'
import { z } from 'zod'

export interface IUser {
  id?: string
  email: string
  password: string
  firstName: string
  lastName: string
  birthDate: Date
  avatarUrl?: string
  createdAt?: Date
}

export class User {
  private Id: string
  private Email: string
  private Password: string
  private FirstName: string
  private LastName: string
  private BirthDate: Date
  private AvatarUrl?: string
  private CreatedAt: Date

  constructor(user: IUser) {
    if (user.id && !this.isValidID(user.id).success) {
      throw new Error(this.isValidID(user.id).message)
    }
    if (user.email && !this.isValidEmail(user.email).success) {
      throw new Error(this.isValidEmail(user.email).message)
    }
    if (user.password && !this.isValidPassword(user.password).success) {
      throw new Error(this.isValidPassword(user.password).message)
    }
    if (user.firstName && !this.isValidFirstName(user.firstName).success) {
      throw new Error(this.isValidFirstName(user.firstName).message)
    }
    if (user.lastName && !this.isValidLastName(user.lastName).success) {
      throw new Error(this.isValidLastName(user.lastName).message)
    }
    if (user.birthDate && !this.isValidBirthDate(user.birthDate).success) {
      throw new Error(this.isValidBirthDate(user.birthDate).message)
    }
    if (user.avatarUrl && !this.isValidAvatarUrl(user.avatarUrl).success) {
      throw new Error(this.isValidAvatarUrl(user.avatarUrl).message)
    }

    this.Id = user.id!
    this.Email = user.email
    this.Password = user.password
    this.FirstName = user.firstName
    this.LastName = user.lastName
    this.BirthDate = user.birthDate
    this.AvatarUrl = user.avatarUrl
    this.CreatedAt = user.createdAt!
  }

  get id(): string {
    return this.Id
  }

  get email(): string {
    return this.Email
  }

  get password(): string {
    return this.Password
  }

  get firstName(): string {
    return this.FirstName
  }

  get lastName(): string {
    return this.LastName
  }

  get birthDate(): Date {
    return this.BirthDate
  }

  get avatarUrl(): string | undefined {
    return this.AvatarUrl
  }

  get createdAt(): Date {
    return this.CreatedAt
  }

  private isValidID(id: string): ReturnValue {
    const validate = z.string().cuid('INVALID_ID').safeParse(id)

    return {
      success: validate.success,
      message: validate.error?.errors[0].message
    }
  }

  private isValidEmail(email: string): ReturnValue {
    const validate = z.string().email('INVALID_EMAIL').safeParse(email)

    return {
      success: validate.success,
      message: validate.error?.errors[0].message
    }
  }

  private isValidPassword(password: string): ReturnValue {
    const validate = z
      .string()
      .min(8, 'PASSWORD_MIN_LENGTH')
      .regex(/^(?=.*[^a-zA-Z0-9\s]).+$/, 'PASSWORD_REQUIRES_SPECIAL_CHARACTERS')
      .regex(/^(?=.*[A-Z]).+$/, 'PASSWORD_REQUIRES_UPPERCASE_LETTER')
      .regex(/^(?=.*[a-z]).+$/, 'PASSWORD_REQUIRES_LOWERCASE_LETTER')
      .regex(/^(?=.*\d).+$/, 'PASSWORD_REQUIRES_NUMBER')
      .safeParse(password)

    return {
      success: validate.success,
      message: validate.error?.errors[0].message
    }
  }

  private isValidFirstName(firstName: string): ReturnValue {
    const validate = z
      .string()
      .min(2, 'FIRST_NAME_MIN_LENGTH')
      .max(50, 'FIRST_NAME_MAX_LENGTH')
      .safeParse(firstName)

    return {
      success: validate.success,
      message: validate.error?.errors[0].message
    }
  }

  private isValidLastName(lastName: string): ReturnValue {
    const validate = z
      .string()
      .min(2, 'LAST_NAME_MIN_LENGTH')
      .max(50, 'LAST_NAME_MAX_LENGTH')
      .safeParse(lastName)

    return {
      success: validate.success,
      message: validate.error?.errors[0].message
    }
  }

  private isValidBirthDate(birthDate: Date): ReturnValue {
    const validate = z
      .date()
      .min(new Date('1900-01-01'), 'INVALID_BIRTH_DATE')
      .refine(value => validateLegalAge(value), 'INVALID_LEGAL_AGE')
      .safeParse(birthDate)

    return {
      success: validate.success,
      message: validate.error?.errors[0].message
    }
  }

  private isValidAvatarUrl(avatarUrl: string): ReturnValue {
    const validate = z.string().url('INVALID_AVATAR_URL').safeParse(avatarUrl)

    return {
      success: validate.success,
      message: validate.error?.errors[0].message
    }
  }

  private isValidCreatedAt(createdAt: Date): ReturnValue {
    const validate = z.date().min(new Date('1900-01-01'), 'INVALID_DATE').safeParse(createdAt)

    return {
      success: validate.success,
      message: validate.error?.errors[0].message
    }
  }
}
