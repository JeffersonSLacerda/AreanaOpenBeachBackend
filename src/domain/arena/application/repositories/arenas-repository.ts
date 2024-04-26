import { Arena } from '../../enterprise/entities/arena'

export interface ArenasRepository {
  getById(courtId: string): Promise<Arena | null>
  fetchAll(): Promise<Arena[]>
  fetchAllAvailable(): Promise<Arena[]>
  create(court: Arena): Promise<void>
  save(court: Arena): Promise<void>
  delete(court: Arena): Promise<void>
}
