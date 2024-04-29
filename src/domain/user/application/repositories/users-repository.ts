import { User } from '../../enterprise/entities/user'

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(User: User): Promise<void>
  save(User: User): Promise<void>
  delete(User: User): Promise<void>
}
