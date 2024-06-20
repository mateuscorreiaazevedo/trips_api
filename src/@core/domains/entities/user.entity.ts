export interface IUser {
  id?: bigint
  email: string
  password: string
  first_name: string
  last_name: string
  avatar_url: string
  birth_date: Date
}

export class User {
  private _id: bigint
  private _email: string
  private _password: string
  private _first_name: string
  private _last_name: string
  private _avatar_url: string
  private _birth_date: Date

  constructor(user: IUser) {
    const { birth_date, email, first_name, last_name, password, avatar_url, id } = user

    if (id && !this.isIdValid(id)) {
      throw new Error('INVALID_ID')
    }
    if (!this.isEmailValid(email)) {
      throw new Error('INVALID_EMAIL')
    }
    if (!this.isPasswordValid(password)) {
      throw new Error('INVALID_PASSWORD')
    }
    if (!this.isBirthDateValid(birth_date)) {
      throw new Error('INVALID_BIRTH_DATE')
    }
    if (!this.isValidName(first_name)) {
      throw new Error('INVALID_FIRST_NAME')
    }
    if (!this.isValidName(last_name)) {
      throw new Error('INVALID_LAST_NAME')
    }
    if (!this.isValidAvatarUrl(avatar_url)) {
      throw new Error('INVALID_AVATAR_URL')
    }

    this._id = id || BigInt(0)
    this._email = email
    this._password = password
    this._first_name = first_name
    this._last_name = last_name
    this._avatar_url = avatar_url
    this._birth_date = birth_date
  }

  get id(): bigint {
    return this._id
  }

  get email(): string {
    return this._email
  }

  get password(): string {
    return this._password
  }

  get first_name(): string {
    return this._first_name
  }

  get last_name(): string {
    return this._last_name
  }

  get avatar_url(): string | undefined {
    return this._avatar_url
  }

  get birth_date(): Date {
    return this._birth_date
  }

  private isIdValid(id: bigint): boolean {
    return typeof id === 'bigint' && id > 0
  }

  private isEmailValid(email: string): boolean {
    const validateEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    return typeof email === 'string' && validateEmailRegex.test(email)
  }

  private isPasswordValid(password: string): boolean {
    const validatePasswordRegex = / ^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/

    return (
      typeof password === 'string' &&
      validatePasswordRegex.test(password) &&
      password.length > 7
    )
  }

  private isBirthDateValid(birth_date: Date): boolean {
    return (
      birth_date instanceof Date &&
      birth_date.getFullYear() >= 1900 &&
      birth_date.getFullYear() <= 2099
    )
  }

  private isValidName(name: string): boolean {
    return typeof name === 'string' && name.length >= 3
  }

  private isValidAvatarUrl(avatar_url: string): boolean {
    return typeof avatar_url === 'string' && avatar_url.length > 0
  }
}
