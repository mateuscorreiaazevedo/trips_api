import { User } from '../entities'

export interface UserGateway {
  create(user: User): Promise<User>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
}
