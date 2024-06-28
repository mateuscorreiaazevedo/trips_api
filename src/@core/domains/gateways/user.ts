import { Authentication, User } from '../entities'

export interface UserGateway {
  create(user: User): Promise<Authentication>
  getUserById(id: string): Promise<User | null>
  getUserByEmail(email: string): Promise<User | null>
  me(token: string): Promise<User | null>
}
