import { z } from 'zod'

export const HostStepEnum = {
  CATEGORY: 'STEP_SELECT_CATEGORY',
  GENERAL: 'STEP_GENERAL',
  IMAGES: 'STEP_IMAGES',
  LOCATION: 'STEP_LOCATION',
  GUESTS_BABIES: 'STEP_GUESTS_BABIES',
  PRICES_FEES: 'STEP_PRICES_FEES',
  ROOMS: 'STEP_ROOMS',
  SERVICES: 'STEP_SERVICES',
  CONFIRMATION: 'LAST'
} as const

export type IHostStep = (typeof HostStepEnum)[keyof typeof HostStepEnum]

export interface IHostImage {
  url: string
  hostId: string
}

export interface IHostService {
  kitchen: boolean
  wifi: boolean
  tv: boolean
  pool: boolean
  laundry: boolean
  hairDryer: boolean
  office: boolean
  freeParking: boolean
  airConditioning: boolean
  pets: boolean
  hostId: string
}

export interface IHostLocation {
  lat: number
  lng: number
  address: string
  city: string
  state: string
  zipCode?: string
  country: string
}

export interface IHost {
  id?: string
  step?: IHostStep
  categoryId: string
  userId: string
  title: string
  description?: string
  images: IHostImage[]
  location: IHostLocation
  pricePerNight: number
  currency?: string
  cleaningFee?: number
  bedrooms: number
  bathrooms: number
  services: IHostService
  guests: number
  babies?: number
  createdAt?: Date
}

export class Host {
  private Id: string
  private Step?: IHostStep
  private CategoryId: string
  private UserId: string
  private Title: string
  private Description?: string
  private Images: IHostImage[]
  private Location: IHostLocation
  private PricePerNight: number
  private Currency?: string
  private CleaningFee?: number
  private Bedrooms: number
  private Bathrooms: number
  private Services: IHostService
  private Guests: number
  private Babies?: number
  private CreatedAt: Date

  constructor(host: IHost) {
    if (host.id && !this.isValidID(host.id).success) {
      throw new Error(this.isValidID(host.id).message)
    }
    if (host.step && !this.isValidStep(host.step).success) {
      throw new Error(this.isValidStep(host.step).message)
    }
    if (host.categoryId && !this.isValidCategoryId(host.categoryId).success) {
      throw new Error(this.isValidCategoryId(host.categoryId).message)
    }
    if (host.userId && !this.isValidUserId(host.userId).success) {
      throw new Error(this.isValidUserId(host.userId).message)
    }
    if (host.title && !this.isValidTitle(host.title).success) {
      throw new Error(this.isValidTitle(host.title).message)
    }
    if (host.description && !this.isValidDescription(host.description).success) {
      throw new Error(this.isValidDescription(host.description).message)
    }
    if (host.images && !this.isValidImages(host.images).success) {
      throw new Error(this.isValidImages(host.images).message)
    }
    if (host.location && !this.isValidLocation(host.location).success) {
      throw new Error(this.isValidLocation(host.location).message)
    }
    if (host.pricePerNight && !this.isValidPricePerNight(host.pricePerNight).success) {
      throw new Error(this.isValidPricePerNight(host.pricePerNight).message)
    }
    if (host.currency && !this.isValidCurrency(host.currency).success) {
      throw new Error(this.isValidCurrency(host.currency).message)
    }
    if (host.cleaningFee && !this.isValidCleaningFee(host.cleaningFee).success) {
      throw new Error(this.isValidCleaningFee(host.cleaningFee).message)
    }
    if (host.bedrooms && !this.isValidBedrooms(host.bedrooms).success) {
      throw new Error(this.isValidBedrooms(host.bedrooms).message)
    }
    if (host.bathrooms && !this.isValidBathrooms(host.bathrooms).success) {
      throw new Error(this.isValidBathrooms(host.bathrooms).message)
    }
    if (host.services && !this.isValidServices(host.services).success) {
      throw new Error(this.isValidServices(host.services).message)
    }
    if (host.guests && !this.isValidGuests(host.guests).success) {
      throw new Error(this.isValidGuests(host.guests).message)
    }
    if (host.babies && !this.isValidBabies(host.babies).success) {
      throw new Error(this.isValidBabies(host.babies).message)
    }

    this.Id = host.id!
    this.Step = host.step
    this.CategoryId = host.categoryId
    this.UserId = host.userId
    this.Title = host.title
    this.Description = host.description
    this.Images = host.images
    this.Location = host.location
    this.PricePerNight = host.pricePerNight
    this.Currency = host.currency
    this.CleaningFee = host.cleaningFee
    this.Bedrooms = host.bedrooms
    this.Bathrooms = host.bathrooms
    this.Services = host.services
    this.Guests = host.guests
    this.Babies = host.babies
    this.CreatedAt = host.createdAt!
  }

  get id(): string {
    return this.Id
  }

  get step(): string | undefined {
    return this.Step
  }

  get categoryId(): string {
    return this.CategoryId
  }

  get userId(): string {
    return this.UserId
  }

  get title(): string {
    return this.Title
  }

  get description(): string | undefined {
    return this.Description
  }

  get images(): IHostImage[] {
    return this.Images
  }

  get location(): IHostLocation {
    return this.Location
  }

  get pricePerNight(): number {
    return this.PricePerNight
  }

  get currency(): string | undefined {
    return this.Currency
  }

  get cleaningFee(): number | undefined {
    return this.CleaningFee
  }

  get bedrooms(): number {
    return this.Bedrooms
  }

  get bathrooms(): number {
    return this.Bathrooms
  }

  get services(): IHostService {
    return this.Services
  }

  get guests(): number {
    return this.Guests
  }

  get babies(): number | undefined {
    return this.Babies
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

  private isValidStep(step: string): ReturnValue {
    const validate = z
      .enum(
        [
          HostStepEnum.CATEGORY,
          HostStepEnum.GENERAL,
          HostStepEnum.IMAGES,
          HostStepEnum.LOCATION,
          HostStepEnum.GUESTS_BABIES,
          HostStepEnum.PRICES_FEES,
          HostStepEnum.ROOMS,
          HostStepEnum.SERVICES,
          HostStepEnum.CONFIRMATION
        ],
        {
          message: 'INVALID_STEP'
        }
      )
      .safeParse(step)

    return {
      success: validate.success,
      message: validate.error?.errors[0].message
    }
  }

  private isValidCategoryId(categoryId: string): ReturnValue {
    const validate = z.string().min(4, 'INVALID_CATEGORY_ID').safeParse(categoryId)

    return {
      success: validate.success,
      message: validate.error?.errors[0].message
    }
  }

  private isValidUserId(userId: string): ReturnValue {
    const validate = z.string().cuid('INVALID_USER_ID').safeParse(userId)

    return {
      success: validate.success,
      message: validate.error?.errors[0].message
    }
  }

  private isValidTitle(title: string): ReturnValue {
    const validate = z
      .string()
      .min(2, 'TITLE_MIN_LENGTH')
      .max(50, 'TITLE_MAX_LENGTH')
      .safeParse(title)

    return {
      success: validate.success,
      message: validate.error?.errors[0].message
    }
  }

  private isValidDescription(description: string): ReturnValue {
    const validate = z.string().max(250, 'DESCRIPTION_MAX_LENGTH').safeParse(description)

    return {
      success: validate.success,
      message: validate.error?.errors[0].message
    }
  }

  private isValidImages(images: IHostImage[]): ReturnValue {
    const validate = z
      .array(
        z.object({
          url: z.string().url('INVALID_IMAGE_URL'),
          hostId: z.string().cuid('INVALID_HOST_ID')
        })
      )
      .safeParse(images)

    return {
      success: validate.success,
      message: validate.error?.errors[0].message
    }
  }

  private isValidLocation(location: IHostLocation): ReturnValue {
    const validate = z
      .object({
        lat: z.number().min(-90, 'INVALID_LAT').max(90, 'INVALID_LAT'),
        lng: z.number().min(-180, 'INVALID_LNG').max(180, 'INVALID_LNG'),
        address: z.string().min(1, 'INVALID_ADDRESS').max(50, 'INVALID_ADDRESS'),
        city: z.string().min(1, 'INVALID_CITY').max(50, 'INVALID_CITY'),
        state: z.string().min(1, 'INVALID_STATE').max(50, 'INVALID_STATE'),
        zipCode: z.string().min(1, 'INVALID_ZIP_CODE').max(50, 'INVALID_ZIP_CODE'),
        country: z.string().min(1, 'INVALID_COUNTRY').max(50, 'INVALID_COUNTRY')
      })
      .safeParse(location)

    return {
      success: validate.success,
      message: validate.error?.errors[0].message
    }
  }

  private isValidPricePerNight(pricePerNight: number): ReturnValue {
    const validate = z.number().min(1, 'PRICE_PER_NIGHT_MIN_LENGTH').safeParse(pricePerNight)

    return {
      success: validate.success,
      message: validate.error?.errors[0].message
    }
  }

  private isValidCurrency(currency: string): ReturnValue {
    const validate = z.string().min(3, 'CURRENCY_MIN_LENGTH').safeParse(currency)

    return {
      success: validate.success,
      message: validate.error?.errors[0].message
    }
  }

  private isValidCleaningFee(cleaningFee: number): ReturnValue {
    const validate = z.number().min(1, 'CLEANING_FEE_MIN_LENGTH').safeParse(cleaningFee)

    return {
      success: validate.success,
      message: validate.error?.errors[0].message
    }
  }

  private isValidBedrooms(bedrooms: number): ReturnValue {
    const validate = z.number().min(1, 'BEDROOMS_MIN_LENGTH').safeParse(bedrooms)

    return {
      success: validate.success,
      message: validate.error?.errors[0].message
    }
  }

  private isValidBathrooms(bathrooms: number): ReturnValue {
    const validate = z.number().min(1, 'BATHROOMS_MIN_LENGTH').safeParse(bathrooms)

    return {
      success: validate.success,
      message: validate.error?.errors[0].message
    }
  }

  private isValidServices(services: IHostService): ReturnValue {
    const validate = z
      .object({
        kitchen: z.boolean(),
        wifi: z.boolean(),
        tv: z.boolean(),
        pool: z.boolean(),
        laundry: z.boolean(),
        hairDryer: z.boolean(),
        office: z.boolean(),
        freeParking: z.boolean(),
        airConditioning: z.boolean(),
        pets: z.boolean()
      })
      .safeParse(services)

    return {
      success: validate.success,
      message: validate.error?.errors[0].message
    }
  }

  private isValidGuests(guests: number): ReturnValue {
    const validate = z.number().min(1, 'GUESTS_MIN_LENGTH').safeParse(guests)

    return {
      success: validate.success,
      message: validate.error?.errors[0].message
    }
  }

  private isValidBabies(babies: number): ReturnValue {
    const validate = z.number().min(0, 'BABIES_MIN_LENGTH').safeParse(babies)

    return {
      success: validate.success,
      message: validate.error?.errors[0].message
    }
  }
}
