import { ArenasRepository } from '@/domain/arena/application/repositories/arenas-repository'
import { Arena } from '@/domain/arena/enterprise/entities/arena'

export class InMemoryArenasRepository implements ArenasRepository {
  public items: Arena[] = []

  async getById(arenaId: string): Promise<Arena | null> {
    return this.items.find((arena) => arena.id.toString() === arenaId) || null
  }

  async fetchArenas(): Promise<Arena[]> {
    return this.items
  }

  async fetchAllAvailable(): Promise<Arena[]> {
    return this.items.filter((arena) => arena.isAvailable)
  }

  async create(arena: Arena): Promise<void> {
    this.items.push(arena)
  }

  async save(arena: Arena): Promise<void> {
    const arenaIndex = this.items.findIndex((item) => item.id.equals(arena.id))

    this.items[arenaIndex] = arena
  }

  async delete(arena: Arena): Promise<void> {
    const arenaIndex = this.items.findIndex((item) => item.id.equals(arena.id))

    this.items.splice(arenaIndex, 1)
  }

  public clear() {
    this.items.splice(0, this.items.length)
  }
}
