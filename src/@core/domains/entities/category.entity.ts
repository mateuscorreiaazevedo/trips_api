export interface ICategory {
  id: bigint
  name: string
  tag: string
  icon: string
}

export class Category {
  private _id: bigint
  private _name: string
  private _tag: string
  private _icon: string

  constructor(id: bigint, name: string, tag: string, icon: string) {
    if (!this.isValidId(id)) {
      throw new Error('INVALID_ID')
    }
    if (!this.isValidName(name)) {
      throw new Error('INVALID_NAME')
    }
    if (!this.isValidTag(tag)) {
      throw new Error('INVALID_TAG')
    }
    if (!this.isValidIcon(icon)) {
      throw new Error('INVALID_ICON')
    }

    this._id = id
    this._name = name
    this._tag = tag
    this._icon = icon
  }

  get id(): bigint {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get tag(): string {
    return this._tag
  }

  get icon(): string {
    return this._icon
  }

  private isValidId(id: bigint): boolean {
    return typeof id === 'bigint' && id > 0
  }

  private isValidName(name: string): boolean {
    return typeof name === 'string' && name.length > 0
  }

  private isValidTag(tag: string): boolean {
    return typeof tag === 'string' && tag.length > 0
  }

  private isValidIcon(icon: string): boolean {
    return typeof icon === 'string' && icon.length > 0
  }
}
