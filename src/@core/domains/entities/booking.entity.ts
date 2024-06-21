import { z } from 'zod'
import { Accomodation } from './accomodation.entity'

export interface IBooking {
  id?: bigint
  user_id: bigint
  accomodation: Accomodation
  checkin_date: Date
  checkout_date: Date
  checked_in: boolean
  checked_out: boolean

  cancelled_date?: Date
  cancelled: boolean

  created_at: Date
  updated_at: Date
}

export class Booking {
  private Id: bigint
  private UserId: bigint
  private Accomodation: Accomodation
  private CheckinDate: Date
  private CheckoutDate: Date
  private CheckedIn: boolean
  private CheckedOut: boolean

  private CancelledDate?: Date
  private Cancelled: boolean

  private CreatedAt: Date
  private UpdatedAt: Date

  constructor(booking: IBooking) {
    if (booking.id && !this.isValidId(booking.id).success) {
      throw new Error(this.isValidId(booking.id).error)
    }
    if (!this.isValidAccomodation(booking.accomodation)) {
      throw new Error('INVALID_ACCOMODATION')
    }
    if (!this.isValidUserId(booking.user_id)) {
      throw new Error('INVALID_USER_ID')
    }
    if (!this.isValidCheckinDate(booking.checkin_date).success) {
      throw new Error(this.isValidCheckinDate(booking.checkin_date).error)
    }
    if (!this.isValidCheckoutDate(booking.checkout_date).success) {
      throw new Error(this.isValidCheckoutDate(booking.checkout_date).error)
    }
    if (!this.isValidCheckedIn(booking.checked_in).success) {
      throw new Error(this.isValidCheckedIn(booking.checked_in).error)
    }
    if (!this.isValidCheckedOut(booking.checked_out).success) {
      throw new Error(this.isValidCheckedOut(booking.checked_out).error)
    }
    if (!this.isValidCancelledDate(booking.cancelled_date).success) {
      throw new Error(this.isValidCancelledDate(booking.cancelled_date).error)
    }
    if (!this.isValidCancelled(booking.cancelled).success) {
      throw new Error(this.isValidCancelled(booking.cancelled).error)
    }
    if (!this.isValidCreatedAt(booking.created_at).success) {
      throw new Error(this.isValidCreatedAt(booking.created_at).error)
    }
    if (!this.isValidUpdatedAt(booking.updated_at).success) {
      throw new Error(this.isValidUpdatedAt(booking.updated_at).error)
    }

    this.Id = booking.id ?? BigInt(0)
    this.UserId = booking.user_id
    this.Accomodation = booking.accomodation
    this.CheckinDate = booking.checkin_date
    this.CheckoutDate = booking.checkout_date
    this.CheckedIn = booking.checked_in
    this.CheckedOut = booking.checked_out
    this.CancelledDate = booking.cancelled_date
    this.Cancelled = booking.cancelled
    this.CreatedAt = booking.created_at
    this.UpdatedAt = booking.updated_at
  }

  get id(): bigint {
    return this.Id
  }

  get user_id(): bigint {
    return this.UserId
  }

  get accomodation(): Accomodation {
    return this.Accomodation
  }

  get checkin_date(): Date {
    return this.CheckinDate
  }

  get checkout_date(): Date {
    return this.CheckoutDate
  }

  get checked_in(): boolean {
    return this.CheckedIn
  }

  get checked_out(): boolean {
    return this.CheckedOut
  }

  get cancelled_date(): Date | undefined {
    return this.CancelledDate
  }

  get cancelled(): boolean {
    return this.Cancelled
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

  private isValidUserId(id: bigint): ReturnValidation {
    const validate = z.bigint({ message: 'INVALID_USER_ID' })

    return {
      success: validate.safeParse(id).success,
      error: validate.safeParse(id).error?.message
    }
  }

  private isValidAccomodation(accomodation: Accomodation): boolean {
    return accomodation instanceof Accomodation && typeof accomodation.id === 'bigint'
  }

  private isValidCheckinDate(checkinDate: Date): ReturnValidation {
    const validate = z.date({ message: 'INVALID_CHECKIN_DATE' })

    return {
      success: validate.safeParse(checkinDate).success,
      error: validate.safeParse(checkinDate).error?.message
    }
  }

  private isValidCheckoutDate(checkoutDate: Date): ReturnValidation {
    const validate = z.date({ message: 'INVALID_CHECKOUT_DATE' })

    return {
      success: validate.safeParse(checkoutDate).success,
      error: validate.safeParse(checkoutDate).error?.message
    }
  }

  private isValidCheckedIn(checkedIn: boolean): ReturnValidation {
    const validate = z.boolean({ message: 'INVALID_CHECKED_IN' })

    return {
      success: validate.safeParse(checkedIn).success,
      error: validate.safeParse(checkedIn).error?.message
    }
  }

  private isValidCheckedOut(checkedOut: boolean): ReturnValidation {
    const validate = z.boolean({ message: 'INVALID_CHECKED_OUT' })

    return {
      success: validate.safeParse(checkedOut).success,
      error: validate.safeParse(checkedOut).error?.message
    }
  }

  private isValidCancelledDate(cancelledDate: Date | undefined): ReturnValidation {
    const validate = z.date({ message: 'INVALID_CANCELLED_DATE' }).optional()

    return {
      success: validate.safeParse(cancelledDate).success,
      error: validate.safeParse(cancelledDate).error?.message
    }
  }

  private isValidCancelled(cancelled: boolean): ReturnValidation {
    const validate = z.boolean({ message: 'INVALID_CANCELLED' })

    return {
      success: validate.safeParse(cancelled).success,
      error: validate.safeParse(cancelled).error?.message
    }
  }

  private isValidCreatedAt(createdAt: Date): ReturnValidation {
    const validate = z.date({ message: 'INVALID_CREATED_AT' })

    return {
      success: validate.safeParse(createdAt).success,
      error: validate.safeParse(createdAt).error?.message
    }
  }

  private isValidUpdatedAt(updatedAt: Date): ReturnValidation {
    const validate = z.date({ message: 'INVALID_UPDATED_AT' })

    return {
      success: validate.safeParse(updatedAt).success,
      error: validate.safeParse(updatedAt).error?.message
    }
  }
}
