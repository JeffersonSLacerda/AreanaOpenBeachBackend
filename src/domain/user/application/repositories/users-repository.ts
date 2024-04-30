import { User } from '../../enterprise/entities/user'

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  listAthletes(): Promise<User[]>
  countAdminsUsers(): Promise<number>
  create(User: User): Promise<void>
  save(User: User): Promise<void>
  delete(User: User): Promise<void>
}
