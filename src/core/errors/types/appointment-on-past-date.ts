import { UseCaseError } from '../use-case-errors'

export class AppointmentOnPastDateError extends Error implements UseCaseError {
  constructor() {
    super(`You can't create an appointment on a past date.!`)
  }
}
