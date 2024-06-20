export interface ImagesAccomodation {
  id: bigint
  url: string
}

export interface ServicesAccomodation {
  id: bigint
  laundry: boolean
  wifi: boolean
  tv: boolean
  phone: boolean
  ac: boolean
}

export interface LocationAccomodation {
  id: bigint
  address: string
  city: string
  state: string
  country: string
  lat: number
  lng: number
}

export interface IAccomodation {
  id?: bigint
  host_id: bigint
  title: string
  description: string
  images: ImagesAccomodation[]
  category_id: bigint
  price_per_night: number
  cleaning_fee: number
  discount?: number
  guests: number
  babies?: number
  accepts_pets: boolean
  pets?: number
  rooms: number
  beds: number
  bathrooms: number
  kitchen: boolean
  services: ServicesAccomodation
  location: LocationAccomodation
  register_step?: string
}

export class Accomodation {
  private _id: bigint
  private _host_id: bigint
  private _title: string
  private _description: string
  private _images: ImagesAccomodation[]
  private _category_id: bigint
  private _price_per_night: number
  private _cleaning_fee: number
  private _discount: number
  private _guests: number
  private _babies: number
  private _accepts_pets: boolean
  private _pets: number
  private _rooms: number
  private _beds: number
  private _bathrooms: number
  private _kitchen: boolean
  private _services: ServicesAccomodation
  private _location: LocationAccomodation
  private _register_step: string

  constructor(accomodation: IAccomodation) {
    if (accomodation.id && !this.isIdValid(accomodation.id)) {
      throw new Error('INVALID_ID')
    }
    if (!this.isIdValid(accomodation.host_id)) {
      throw new Error('INVALID_HOST_ID')
    }
    if (!this.isValidTitle(accomodation.title)) {
      throw new Error('INVALID_TITLE')
    }
    if (!this.isValidDescription(accomodation.description)) {
      throw new Error('INVALID_DESCRIPTION')
    }
    if (!this.isValidImage(accomodation.images)) {
      throw new Error('INVALID_IMAGES')
    }
    if (!this.isValidCategoryId(accomodation.category_id)) {
      throw new Error('INVALID_CATEGORY_ID')
    }
    if (!this.isValidPricePerNight(accomodation.price_per_night)) {
      throw new Error('INVALID_PRICE_PER_NIGHT')
    }
    if (!this.isValidCleaningFee(accomodation.cleaning_fee)) {
      throw new Error('INVALID_CLEANING_FEE')
    }
    if (accomodation.discount && !this.isValidDiscount(accomodation.discount)) {
      throw new Error('INVALID_DISCOUNT')
    }
    if (!this.isValidGuests(accomodation.guests)) {
      throw new Error('INVALID_GUESTS')
    }
    if (accomodation.babies && !this.isValidBabies(accomodation.babies)) {
      throw new Error('INVALID_BABIES')
    }
    if (accomodation.accepts_pets && !this.isValidAcceptsPets(accomodation.accepts_pets)) {
      throw new Error('INVALID_ACCEPTS_PETS')
    }
    if (
      accomodation.accepts_pets &&
      accomodation.pets &&
      !this.isValidPets(accomodation.pets)
    ) {
      throw new Error('INVALID_PETS')
    }
    if (!this.isValidRooms(accomodation.rooms)) {
      throw new Error('INVALID_ROOMS')
    }
    if (!this.isValidBeds(accomodation.beds)) {
      throw new Error('INVALID_BEDS')
    }
    if (!this.isValidBathrooms(accomodation.bathrooms)) {
      throw new Error('INVALID_BATHROOMS')
    }
    if (!this.isValidKitchen(accomodation.kitchen)) {
      throw new Error('INVALID_KITCHEN')
    }
    if (!this.isValidServices(accomodation.services)) {
      throw new Error('INVALID_SERVICES')
    }
    if (!this.isValidLocation(accomodation.location)) {
      throw new Error('INVALID_LOCATION')
    }
    if (accomodation.register_step && !this.isValidRegisterStep(accomodation.register_step)) {
      throw new Error('INVALID_REGISTER_STEP')
    }

    this._id = accomodation.id || BigInt(0)
    this._host_id = accomodation.host_id
    this._title = accomodation.title
    this._description = accomodation.description
    this._images = accomodation.images
    this._category_id = accomodation.category_id
    this._price_per_night = accomodation.price_per_night
    this._cleaning_fee = accomodation.cleaning_fee
    this._discount = accomodation.discount ?? 0
    this._guests = accomodation.guests
    this._babies = accomodation.babies || 0
    this._accepts_pets = accomodation.accepts_pets
    this._pets = accomodation.pets || 0
    this._rooms = accomodation.rooms
    this._beds = accomodation.beds
    this._bathrooms = accomodation.bathrooms
    this._kitchen = accomodation.kitchen
    this._services = accomodation.services
    this._location = accomodation.location
    this._register_step = accomodation.register_step ?? ''
  }

  get id(): bigint {
    return this._id
  }

  get host_id(): bigint {
    return this._host_id
  }

  get title(): string {
    return this._title
  }

  get description(): string {
    return this._description
  }

  get images(): ImagesAccomodation[] {
    return this._images
  }

  get category_id(): bigint {
    return this._category_id
  }

  get price_per_night(): number {
    return this._price_per_night
  }

  get cleaning_fee(): number {
    return this._cleaning_fee
  }

  get discount(): number {
    return this._discount
  }

  get guests(): number {
    return this._guests
  }

  get babies(): number {
    return this._babies
  }

  get accepts_pets(): boolean {
    return this._accepts_pets
  }

  get pets(): number {
    return this._pets
  }

  get rooms(): number {
    return this._rooms
  }

  get beds(): number {
    return this._beds
  }

  get bathrooms(): number {
    return this._bathrooms
  }

  get kitchen(): boolean {
    return this._kitchen
  }

  get services(): ServicesAccomodation {
    return this._services
  }

  get location(): LocationAccomodation {
    return this._location
  }

  get register_step(): string {
    return this._register_step
  }

  private isIdValid(id: bigint): boolean {
    return typeof id === 'bigint' && id > 0
  }

  private isValidTitle(title: string): boolean {
    return typeof title === 'string' && title.length > 10
  }

  private isValidDescription(description: string): boolean {
    return (
      typeof description === 'string' && description.length > 10 && description.length < 200
    )
  }

  private isValidImage(images: ImagesAccomodation[]): boolean {
    return images.length > 0
  }

  private isValidCategoryId(category_id: bigint): boolean {
    return typeof category_id === 'bigint'
  }

  private isValidPricePerNight(price_per_night: number): boolean {
    return typeof price_per_night === 'number' && price_per_night > 0
  }

  private isValidCleaningFee(cleaning_fee: number): boolean {
    return typeof cleaning_fee === 'number' && cleaning_fee > 0
  }

  private isValidDiscount(discount: number): boolean {
    return typeof discount === 'number' && discount >= 0
  }

  private isValidGuests(guests: number): boolean {
    return typeof guests === 'number' && guests > 0
  }

  private isValidBabies(babies: number): boolean {
    return typeof babies === 'number' && babies >= 0
  }

  private isValidAcceptsPets(accepts_pets: boolean): boolean {
    return typeof accepts_pets === 'boolean'
  }

  private isValidPets(pets: number): boolean {
    return typeof pets === 'number' && pets >= 0
  }

  private isValidRooms(rooms: number): boolean {
    return typeof rooms === 'number' && rooms > 0
  }

  private isValidBeds(beds: number): boolean {
    return typeof beds === 'number' && beds > 0
  }

  private isValidBathrooms(bathrooms: number): boolean {
    return typeof bathrooms === 'number' && bathrooms > 0
  }

  private isValidKitchen(kitchen: boolean): boolean {
    return typeof kitchen === 'boolean'
  }

  private isValidServices(services: ServicesAccomodation): boolean {
    return typeof services === 'object'
  }

  private isValidLocation(location: LocationAccomodation): boolean {
    return typeof location === 'object'
  }

  private isValidRegisterStep(register_step: string): boolean {
    return typeof register_step === 'string'
  }
}
