import bcrypt from 'bcrypt'

export class HashHelper {
  async encrypt(value: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)

    const hashedValue = await bcrypt.hash(value, salt)

    return hashedValue
  }

  async compare(value: string, hashedValue: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(value, hashedValue)

    return isMatch
  }
}
