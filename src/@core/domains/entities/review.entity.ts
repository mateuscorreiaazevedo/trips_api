import { z } from 'zod'

export interface IReview {
  id?: bigint
  accomodation_id: bigint
  user_id: bigint
  rating: number
  comment: string

  created_at: Date
  updated_at: Date
}

export class Review {
  private Id: bigint
  private AccomodationId: bigint
  private UserId: bigint
  private Rating: number
  private Comment: string

  private CreatedAt: Date
  private UpdatedAt: Date

  constructor(review: IReview) {
    if (review.id && !this.isValidId(review.id).success) {
      throw new Error(this.isValidId(review.id).error)
    }
    if (!this.isValidAccomodationId(review.accomodation_id)) {
      throw new Error(this.isValidAccomodationId(review.accomodation_id).error)
    }
    if (!this.isValidateUserId(review.user_id)) {
      throw new Error(this.isValidateUserId(review.user_id).error)
    }
    if (!this.isValidateRating(review.rating)) {
      throw new Error(this.isValidateRating(review.rating).error)
    }
    if (!this.isValidateComment(review.comment)) {
      throw new Error(this.isValidateComment(review.comment).error)
    }
    if (!this.isValidateCreatedAt(review.created_at)) {
      throw new Error(this.isValidateCreatedAt(review.created_at).error)
    }
    if (!this.isValidateUpdatedAt(review.updated_at)) {
      throw new Error(this.isValidateUpdatedAt(review.updated_at).error)
    }

    this.Id = review.id ?? BigInt(0)
    this.AccomodationId = review.accomodation_id
    this.UserId = review.user_id
    this.Rating = review.rating
    this.Comment = review.comment
    this.CreatedAt = review.created_at
    this.UpdatedAt = review.updated_at
  }

  get id(): bigint {
    return this.Id
  }

  get accomodation_id(): bigint {
    return this.AccomodationId
  }

  get user_id(): bigint {
    return this.UserId
  }

  get rating(): number {
    return this.Rating
  }

  get comment(): string {
    return this.Comment
  }

  get created_at(): Date {
    return this.CreatedAt
  }

  get updated_at(): Date {
    return this.UpdatedAt
  }

  private isValidId(id: bigint): ReturnValidation {
    const validate = z.bigint({ message: 'INVALID_ID' })

    return {
      success: validate.safeParse(id).success,
      error: validate.safeParse(id).error?.message
    }
  }

  private isValidAccomodationId(id: bigint): ReturnValidation {
    const validate = z.bigint({ message: 'INVALID_ACCOMODATION_ID' })

    return {
      success: validate.safeParse(id).success,
      error: validate.safeParse(id).error?.message
    }
  }

  private isValidateUserId(id: bigint): ReturnValidation {
    const validate = z.bigint({ message: 'INVALID_USER_ID' })

    return {
      success: validate.safeParse(id).success,
      error: validate.safeParse(id).error?.message
    }
  }

  private isValidateRating(rating: number): ReturnValidation {
    const validate = z.number({ message: 'INVALID_RATING' })

    return {
      success: validate.safeParse(rating).success,
      error: validate.safeParse(rating).error?.message
    }
  }

  private isValidateComment(comment: string): ReturnValidation {
    const validate = z.string({ message: 'INVALID_COMMENT' })

    return {
      success: validate.safeParse(comment).success,
      error: validate.safeParse(comment).error?.message
    }
  }

  private isValidateCreatedAt(created_at: Date): ReturnValidation {
    const validate = z.date({ message: 'INVALID_CREATED_AT' })

    return {
      success: validate.safeParse(created_at).success,
      error: validate.safeParse(created_at).error?.message
    }
  }

  private isValidateUpdatedAt(updated_at: Date): ReturnValidation {
    const validate = z.date({ message: 'INVALID_UPDATED_AT' })

    return {
      success: validate.safeParse(updated_at).success,
      error: validate.safeParse(updated_at).error?.message
    }
  }
}
