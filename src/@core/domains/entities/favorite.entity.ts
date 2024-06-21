import { z } from 'zod'
import { Accomodation } from './accomodation.entity'
import { User } from './user.entity'

export interface IFavorite {
  id?: bigint
  user: User
  accomodation: Accomodation
  created_at: Date
}

export class Favorite {
  private Id: bigint
  private User: User
  private Accomodation: Accomodation
  private CreatedAt: Date

  constructor(favorite: IFavorite) {
    if (favorite.id && !this.isValidId(favorite.id).success) {
      throw new Error(this.isValidId(favorite.id).error)
    }
    if (!this.isValidUser(favorite.user)) {
      throw new Error('INVALID_USER')
    }
    if (!this.isValidAccomodation(favorite.accomodation)) {
      throw new Error('INVALID_ACCOMODATION')
    }
    if (!this.isValidCreatedAt(favorite.created_at).success) {
      throw new Error(this.isValidCreatedAt(favorite.created_at).error)
    }

    this.Id = favorite.id ?? BigInt(0)
    this.User = favorite.user
    this.Accomodation = favorite.accomodation
    this.CreatedAt = favorite.created_at
  }

  get id(): bigint {
    return this.Id
  }

  get user(): User {
    return this.User
  }

  get accomodation(): Accomodation {
    return this.Accomodation
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

  private isValidUser(user: User): boolean {
    return user instanceof User && typeof user.id === 'bigint'
  }

  private isValidAccomodation(accomodation: Accomodation): boolean {
    return accomodation instanceof Accomodation && typeof accomodation.id === 'bigint'
  }

  private isValidCreatedAt(createdAt: Date): ReturnValidation {
    const validate = z.date({ message: 'INVALID_CREATED_AT' })

    return {
      success: validate.safeParse(createdAt).success,
      error: validate.safeParse(createdAt).error?.message
    }
  }
}
