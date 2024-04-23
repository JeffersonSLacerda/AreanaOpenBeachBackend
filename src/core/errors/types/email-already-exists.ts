import { UseCaseError } from '../use-case-errors'

export class EmailAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super('This email already exists!')
  }
}
