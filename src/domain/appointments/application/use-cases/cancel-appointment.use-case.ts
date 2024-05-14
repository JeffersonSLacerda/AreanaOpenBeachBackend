import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/types/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'
import { UsersRepository } from '@/domain/user/application/repositories/users-repository'
import { AppointmentsRepository } from '../repositories/appointmentsRepository'
import { Role } from '@/domain/user/enterprise/entities/enums/role'
import { addMinutes, isBefore } from 'date-fns'

interface CancelAppointmentUseCaseRequest {
  userId: string
  appointmentId: string
}

type CancelAppointmentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

const MINIMUM_CANCELATION_TIME = 30

export class CancelAppointmentUseCase {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({
    appointmentId,
    userId,
  }: CancelAppointmentUseCaseRequest): Promise<CancelAppointmentUseCaseResponse> {
    const user = await this.usersRepository.getById(userId)
    const appointment = await this.appointmentsRepository.getById(appointmentId)

    if (!user || !appointment) return left(new ResourceNotFoundError())

    if (
      (appointment.userId.toString() === userId &&
        isBefore(
          appointment.date,
          addMinutes(new Date(), MINIMUM_CANCELATION_TIME),
        )) ||
      user.role === Role.ADMIN
    ) {
      await this.appointmentsRepository.delete(appointment)
      return right(null)
    }

    return left(new NotAllowedError())
  }
}
