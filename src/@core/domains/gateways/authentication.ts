import { Authentication, User } from '../entities'

export interface AuthenticationGateway {
  create(id: string): Promise<Authentication>
  login(user: User, password: string): Promise<Authentication>
  validate(token: string): Promise<string>
}
