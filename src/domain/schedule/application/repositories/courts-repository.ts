import { Court } from '../../enterprise/entities/court'

export interface CourtsRepository {
  getById(courtId: string): Promise<Court | null>
  fetchAll(): Promise<Court[]>
  fetchAllAvailable(): Promise<Court[]>
  create(court: Court): Promise<void>
  save(court: Court): Promise<void>
  delete(court: Court): Promise<void>
}
