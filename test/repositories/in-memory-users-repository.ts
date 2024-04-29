import { UsersRepository } from '@/domain/user/application/repositories/users-repository'
import { Role } from '@/domain/user/enterprise/entities/enums/role'
import { User } from '@/domain/user/enterprise/entities/user'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string): Promise<User | null> {
    return this.items.find((user) => user.id.toString() === id) || null
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.items.find((item) => item.email === email) || null
  }

  async listAthletes(): Promise<User[]> {
    return this.items.filter((item) => item.role === Role.ATHLETE)
  }

  async create(user: User): Promise<void> {
    this.items.push(user)
  }

  async save(user: User): Promise<void> {
    const itemsIndex = this.items.findIndex((item) => item.id.equals(user.id))

    this.items[itemsIndex] = user
  }

  async delete(user: User): Promise<void> {
    const itemsIndex = this.items.findIndex((item) => item.id.equals(user.id))

    this.items.splice(itemsIndex, 1)
  }

  public clear() {
    this.items.splice(0, this.items.length)
  }
}
