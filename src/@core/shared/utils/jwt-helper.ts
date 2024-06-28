import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

export class JwtHelper {
  generateToken(payload: object): string {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' })

    return token
  }

  verifyToken<T = object>(token: string): T {
    const decoded = jwt.verify(token, JWT_SECRET) as T

    return decoded
  }
}
