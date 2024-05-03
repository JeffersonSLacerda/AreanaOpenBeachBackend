import { Appointment } from '../../enterprise/entities/appointment'

export interface AppointmentsRepository {
  getById(id: string): Promise<Appointment | null>
  fetchAllFromUser(userId: string): Promise<Appointment[]>
  fetchByDayFromArena(
    day: number,
    month: number,
    year: number,
    arenaId: string,
  ): Promise<Appointment[]>
  fetchAllInMonthFromArena(
    month: number,
    year: number,
    arenaId: string,
  ): Promise<Appointment[]>
  create(appointment: Appointment): Promise<void>
  save(appointment: Appointment): Promise<void>
  delete(appointment: Appointment): Promise<void>
}
