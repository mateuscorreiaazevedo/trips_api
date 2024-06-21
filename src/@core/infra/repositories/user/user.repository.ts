import { Authentication, User } from '@core/domains/entities'

export interface UserRepository {
  getUserById(id: bigint): Promise<User>
  createUser(user: User): Promise<Authentication>
  getUserByEmail(email: string): Promise<User>
  loginUser(email: string, password: string): Promise<Authentication>
}
