import { Athlete } from '../../enterprise/entities/athlete'

export interface AthletesRepository {
  findById(id: string): Promise<Athlete | null>
  findByEmail(email: string): Promise<Athlete | null>
  create(athlete: Athlete): Promise<void>
  save(athlete: Athlete): Promise<void>
  delete(athlete: Athlete): Promise<void>
}
