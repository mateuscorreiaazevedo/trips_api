import { z } from 'zod'

export interface ICategory {
  id?: bigint
  tag: string
  name: string
  icon: string
}

export class Category {
  private Id: bigint
  private Tag: string
  private Name: string
  private Icon: string

  constructor(category: ICategory) {
    if (category.id && !this.isValidateId(category.id).success) {
      throw new Error(this.isValidateId(category.id).error)
    }
    if (!category.tag) {
      throw new Error('INVALID_TAG')
    }
    if (!this.isValidateTag(category.tag).success) {
      throw new Error(this.isValidateTag(category.tag).error)
    }
    if (!category.name) {
      throw new Error('INVALID_NAME')
    }
    if (!this.isValidateName(category.name).success) {
      throw new Error(this.isValidateName(category.name).error)
    }
    if (!category.icon) {
      throw new Error('INVALID_ICON')
    }
    if (!this.isValidateIcon(category.icon).success) {
      throw new Error(this.isValidateIcon(category.icon).error)
    }

    this.Id = category.id ?? BigInt(0)
    this.Tag = category.tag
    this.Name = category.name
    this.Icon = category.icon
  }

  get id(): bigint {
    return this.Id
  }

  get tag(): string {
    return this.Tag
  }

  get name(): string {
    return this.Name
  }

  get icon(): string {
    return this.Icon
  }

  private isValidateId(id: bigint): ReturnValidation {
    const validate = z.bigint({ message: 'INVALID_ID' })

    return {
      success: validate.safeParse(id).success,
      error: validate.safeParse(id).error?.message
    }
  }

  private isValidateTag(tag: string): ReturnValidation {
    const validate = z.string().min(1, { message: 'INVALID_TAG' })

    return {
      success: validate.safeParse(tag).success,
      error: validate.safeParse(tag).error?.message
    }
  }

  private isValidateName(name: string): ReturnValidation {
    const validate = z.string().min(3, { message: 'INVALID_NAME' })

    return {
      success: validate.safeParse(name).success,
      error: validate.safeParse(name).error?.message
    }
  }

  private isValidateIcon(icon: string): ReturnValidation {
    const validate = z.string({ message: 'INVALID_ICON' })

    return {
      success: validate.safeParse(icon).success,
      error: validate.safeParse(icon).error?.message
    }
  }
}
