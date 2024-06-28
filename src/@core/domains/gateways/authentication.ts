import { Authentication, User } from '../entities'

export interface AuthenticationGateway {
  create(id: string): Authentication
  verifyPassword(user: User, password: string): Promise<Authentication | null>
  validate(authentication: string): string
}
