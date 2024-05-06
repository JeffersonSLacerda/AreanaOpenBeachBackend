import { AppointmentsRepository } from '@/domain/appointments/application/repositories/appointmentsRepository'
import { Appointment } from '@/domain/appointments/enterprise/entities/appointment'
import { getDate, getMonth, getYear, isEqual } from 'date-fns'

export class InMemoryAppointmentsRepository implements AppointmentsRepository {
  public items: Appointment[] = []

  async getById(id: string): Promise<Appointment | null> {
    return (
      this.items.find((appointment) => appointment.id.toString() === id) ?? null
    )
  }

  async fetchAllFromUser(userId: string): Promise<Appointment[]> {
    const appointments = this.items.filter(
      (item) => item.userId.toString() === userId,
    )

    return appointments
  }

  async getByDate(date: Date, arenaId: string): Promise<Appointment | null> {
    const appointment = this.items.find(
      (appointment) =>
        isEqual(appointment.date, date) &&
        appointment.arenaId.toString() === arenaId,
    )

    return appointment || null
  }

  async fetchByDayFromArena(
    day: number,
    month: number,
    year: number,
    arenaId: string,
  ): Promise<Appointment[]> {
    const appointments = this.items.filter((appointment) => {
      return (
        appointment.arenaId.toString() === arenaId &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      )
    })

    return appointments
  }

  async fetchAllInMonthFromArena(
    month: number,
    year: number,
    arenaId: string,
  ): Promise<Appointment[]> {
    const appointments = this.items.filter((appointment) => {
      return (
        appointment.arenaId.toString() === arenaId &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      )
    })

    return appointments
  }

  async create(appointment: Appointment): Promise<void> {
    this.items.push(appointment)
  }

  async save(appointment: Appointment): Promise<void> {
    const itemsIndex = this.items.findIndex((item) =>
      item.id.equals(appointment.id),
    )

    this.items[itemsIndex] = appointment
  }

  async delete(appointment: Appointment): Promise<void> {
    const itemsIndex = this.items.findIndex((item) =>
      item.id.equals(appointment.id),
    )

    this.items.slice(itemsIndex, 1)
  }

  public clear() {
    this.items.splice(0, this.items.length)
  }
}
