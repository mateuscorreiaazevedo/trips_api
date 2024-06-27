import { User } from '../entities'

export interface UserGateway {
  getUserById(id: string): Promise<User>
  getUserByEmail(email: string): Promise<User>
}
