import bcrypt from 'bcrypt'

class CryptHandler {
  async hash(value: string): Promise<string> {
    const salt = await bcrypt.genSalt()

    const hashedValue = await bcrypt.hash(value, salt)

    return hashedValue
  }

  async compare(value: string, hashed: string): Promise<boolean> {
    const verifyValue = await bcrypt.compare(value, hashed)

    return verifyValue
  }
}

export const cryptHandler = new CryptHandler()
