import { User } from '@core/domains/entities'
import { sign, verify } from 'jsonwebtoken'

export type JWTPayload = Omit<User, 'password'>

const SECRET = process.env.JWT_SECRET ?? 'secret'

class JWTHandler {
  encrypt(payload: JWTPayload): string {
    const token = sign(payload, SECRET, {
      expiresIn: '30d'
    })

    return token
  }

  decrypt(token: string): JWTPayload | null {
    const decoded = verify(token, SECRET)

    if (!decoded) {
      return null
    }

    return decoded as JWTPayload
  }
}

export const jwtHandler = new JWTHandler()
