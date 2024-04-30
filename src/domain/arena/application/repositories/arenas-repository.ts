import { Arena } from '../../enterprise/entities/arena'

export interface ArenasRepository {
  getById(id: string): Promise<Arena | null>
  fetchArenas(): Promise<Arena[]>
  fetchAllAvailable(): Promise<Arena[]>
  create(arena: Arena): Promise<void>
  save(arena: Arena): Promise<void>
  delete(arena: Arena): Promise<void>
}
