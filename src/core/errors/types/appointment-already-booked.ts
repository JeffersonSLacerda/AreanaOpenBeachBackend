import { UseCaseError } from '../use-case-errors'

export class AppointmentAlreadyBooked extends Error implements UseCaseError {
  constructor() {
    super('This appointment is already booked')
  }
}
