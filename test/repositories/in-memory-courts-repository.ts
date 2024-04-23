import { CourtsRepository } from '@/domain/schedule/application/repositories/courts-repository'
import { Court } from '@/domain/schedule/enterprise/entities/court'

export class InMemoryCourtsRepository implements CourtsRepository {
  public items: Court[] = []

  async getById(courtId: string): Promise<Court | null> {
    return this.items.find((court) => court.id.toString() === courtId) || null
  }

  async fetchAll(): Promise<Court[]> {
    return this.items
  }

  async fetchAllAvailable(): Promise<Court[]> {
    return this.items.filter((court) => court.isAvailable)
  }

  async create(court: Court): Promise<void> {
    this.items.push(court)
  }

  async save(court: Court): Promise<void> {
    const courtIndex = this.items.findIndex((item) => item.id.equals(court.id))

    this.items[courtIndex] = court
  }

  async delete(court: Court): Promise<void> {
    const courtIndex = this.items.findIndex((item) => item.id.equals(court.id))

    this.items.splice(courtIndex, 1)
  }

  public clean() {
    this.items.splice(0, this.items.length)
  }
}
