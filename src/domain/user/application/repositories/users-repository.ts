import { User } from '../../enterprise/entities/user'

export interface UsersRepository {
  getById(id: string): Promise<User | null>
  getByEmail(email: string): Promise<User | null>
  fetchAthletes(): Promise<User[]>
  countAdminsUsers(): Promise<number>
  create(User: User): Promise<void>
  save(User: User): Promise<void>
  delete(User: User): Promise<void>
}
