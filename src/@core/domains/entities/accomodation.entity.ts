import { z } from 'zod'
import { User } from './user.entity'

export interface ImageAccomodation {
  id?: bigint
  url: string
}

export interface ServiceAccomodation {
  id?: bigint
  kitchen: boolean
  laundry: boolean
  wifi: boolean
  tv: boolean
  phone: boolean
  ac: boolean
  office_space: boolean
  beach_access: boolean
  pets: boolean
}

export interface IAccomodation {
  id?: bigint
  host: User

  title: string
  description?: string
  images: ImageAccomodation[]
  category_id: bigint

  price_per_night: number
  cleaning_fee: number

  rooms: number
  beds: number
  bathrooms: number
  services: ServiceAccomodation

  created_at: Date
}

export class Accomodation {
  private Id: bigint
  private Host: User

  private Title: string
  private Description?: string
  private Images: ImageAccomodation[]
  private CategoryId: bigint

  private PricePerNight: number
  private CleaningFee: number

  private Rooms: number
  private Beds: number
  private Bathrooms: number
  private Services: ServiceAccomodation

  private CreatedAt: Date

  constructor(accomodation: IAccomodation) {
    if (accomodation.id && !this.isValidId(accomodation.id).success) {
      throw new Error(this.isValidId(accomodation.id).error)
    }
    if (!this.isValidHoster(accomodation.host)) {
      throw new Error('INVALID_USER_HOST')
    }
    if (!this.isValidTitle(accomodation.title)) {
      throw new Error(this.isValidTitle(accomodation.title).error)
    }
    if (!this.isValidDescription(accomodation.description)) {
      throw new Error(this.isValidDescription(accomodation.description).error)
    }
    if (!this.isValidCategoryId(accomodation.category_id)) {
      throw new Error(this.isValidCategoryId(accomodation.category_id).error)
    }
    if (!this.isValidPricePerNight(accomodation.price_per_night)) {
      throw new Error(this.isValidPricePerNight(accomodation.price_per_night).error)
    }
    if (!this.isValidCleaningFee(accomodation.cleaning_fee)) {
      throw new Error(this.isValidCleaningFee(accomodation.cleaning_fee).error)
    }
    if (!this.isValidRooms(accomodation.rooms)) {
      throw new Error(this.isValidRooms(accomodation.rooms).error)
    }
    if (!this.isValidBeds(accomodation.beds)) {
      throw new Error(this.isValidBeds(accomodation.beds).error)
    }
    if (!this.isValidBathrooms(accomodation.bathrooms)) {
      throw new Error(this.isValidBathrooms(accomodation.bathrooms).error)
    }
    if (!this.isValidServices(accomodation.services)) {
      throw new Error('INVALID_SERVICES')
    }
    if (!this.isValidCreatedAt(accomodation.created_at)) {
      throw new Error(this.isValidCreatedAt(accomodation.created_at).error)
    }
    if (accomodation.images && !this.isValidImages(accomodation.images)) {
      throw new Error('INVALID_IMAGES')
    }

    this.Id = accomodation.id || BigInt(0)
    this.Host = accomodation.host

    this.Title = accomodation.title
    this.Description = accomodation.description
    this.Images = accomodation.images
    this.CategoryId = accomodation.category_id

    this.PricePerNight = accomodation.price_per_night
    this.CleaningFee = accomodation.cleaning_fee

    this.Rooms = accomodation.rooms
    this.Beds = accomodation.beds
    this.Bathrooms = accomodation.bathrooms
    this.Services = accomodation.services
    this.CreatedAt = accomodation.created_at
  }

  get id(): bigint {
    return this.Id
  }

  get host(): User {
    return this.Host
  }

  get title(): string {
    return this.Title
  }

  get description(): string | undefined {
    return this.Description
  }

  get images(): ImageAccomodation[] {
    return this.Images
  }

  get categoryId(): bigint {
    return this.CategoryId
  }

  get pricePerNight(): number {
    return this.PricePerNight
  }

  get cleaningFee(): number {
    return this.CleaningFee
  }

  get rooms(): number {
    return this.Rooms
  }

  get beds(): number {
    return this.Beds
  }

  get bathrooms(): number {
    return this.Bathrooms
  }

  get services(): ServiceAccomodation {
    return this.Services
  }

  get createdAt(): Date {
    return this.CreatedAt
  }

  private isValidId(id: bigint): ReturnValidation {
    const validate = z.bigint({ message: 'INVALID_ID' })

    return {
      success: validate.safeParse(id).success,
      error: validate.safeParse(id).error?.message
    }
  }

  private isValidHoster(host: User): boolean {
    return host instanceof User && typeof host.id === 'bigint'
  }

  private isValidTitle(title: string): ReturnValidation {
    const validate = z.string({ message: 'INVALID_TITLE' })

    return {
      success: validate.safeParse(title).success,
      error: validate.safeParse(title).error?.message
    }
  }

  private isValidDescription(description?: string): ReturnValidation {
    const validate = z.string({ message: 'INVALID_DESCRIPTION' }).optional()

    return {
      success: validate.safeParse(description).success,
      error: validate.safeParse(description).error?.message
    }
  }

  private isValidCategoryId(categoryId: bigint): ReturnValidation {
    const validate = z.bigint({ message: 'INVALID_CATEGORY_ID' })

    return {
      success: validate.safeParse(categoryId).success,
      error: validate.safeParse(categoryId).error?.message
    }
  }

  private isValidPricePerNight(pricePerNight: number): ReturnValidation {
    const validate = z.number({ message: 'INVALID_PRICE_PER_NIGHT' })

    return {
      success: validate.safeParse(pricePerNight).success,
      error: validate.safeParse(pricePerNight).error?.message
    }
  }

  private isValidCleaningFee(cleaningFee: number): ReturnValidation {
    const validate = z.number({ message: 'INVALID_CLEANING_FEE' })

    return {
      success: validate.safeParse(cleaningFee).success,
      error: validate.safeParse(cleaningFee).error?.message
    }
  }

  private isValidRooms(rooms: number): ReturnValidation {
    const validate = z.number({ message: 'INVALID_ROOMS' })

    return {
      success: validate.safeParse(rooms).success,
      error: validate.safeParse(rooms).error?.message
    }
  }

  private isValidBeds(beds: number): ReturnValidation {
    const validate = z.number({ message: 'INVALID_BEDS' })

    return {
      success: validate.safeParse(beds).success,
      error: validate.safeParse(beds).error?.message
    }
  }

  private isValidBathrooms(bathrooms: number): ReturnValidation {
    const validate = z.number({ message: 'INVALID_BATHROOMS' })

    return {
      success: validate.safeParse(bathrooms).success,
      error: validate.safeParse(bathrooms).error?.message
    }
  }

  private isValidServices(services: ServiceAccomodation): boolean {
    return z
      .object({
        laundry: z.boolean(),
        kitchen: z.boolean(),
        wifi: z.boolean(),
        tv: z.boolean(),
        phone: z.boolean(),
        ac: z.boolean(),
        office_space: z.boolean(),
        beach_access: z.boolean(),
        pets: z.boolean()
      })
      .safeParse(services).success
  }

  private isValidImages(images: ImageAccomodation[]): boolean {
    return images.every(image => {
      return z
        .object({
          id: z.bigint(),
          url: z.string()
        })
        .safeParse(image).success
    })
  }

  private isValidCreatedAt(createdAt: Date): ReturnValidation {
    const validate = z.date({ message: 'INVALID_CREATED_AT' })

    return {
      success: validate.safeParse(createdAt).success,
      error: validate.safeParse(createdAt).error?.message
    }
  }
}
