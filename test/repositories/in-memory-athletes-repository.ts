import { AthletesRepository } from '@/domain/schedule/application/repositories/athletes-repository'
import { Athlete } from '@/domain/schedule/enterprise/entities/athlete'

export class InMemoryAthletesRepository implements AthletesRepository {
  public items: Athlete[] = []

  async findById(id: string): Promise<Athlete | null> {
    return this.items.find((athlete) => athlete.id.toString() === id) || null
  }

  async findByEmail(email: string): Promise<Athlete | null> {
    return this.items.find((item) => item.email === email) || null
  }

  async create(athlete: Athlete): Promise<void> {
    this.items.push(athlete)
  }

  async save(athlete: Athlete): Promise<void> {
    const itemsIndex = this.items.findIndex((item) =>
      item.id.equals(athlete.id),
    )

    this.items[itemsIndex] = athlete
  }

  async delete(athlete: Athlete): Promise<void> {
    const itemsIndex = this.items.findIndex((item) =>
      item.id.equals(athlete.id),
    )

    this.items.splice(itemsIndex, 1)
  }

  public clean() {
    this.items.splice(0, this.items.length)
  }
}
