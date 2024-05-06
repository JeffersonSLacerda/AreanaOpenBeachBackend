import { Either, left, right } from '@/core/either'
import { Modalities } from '../../enterprise/entities/enums/modalities'
import { Appointment } from '../../enterprise/entities/appointment'
import { AppointmentsRepository } from '../repositories/appointmentsRepository'
import { UsersRepository } from '@/domain/user/application/repositories/users-repository'
import { ArenasRepository } from '@/domain/arena/application/repositories/arenas-repository'
import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'
import { isBefore, startOfHour } from 'date-fns'
import { AppointmentOnPastDateError } from '@/core/errors/types/appointment-on-past-date'
import { AppointmentAlreadyBooked } from '@/core/errors/types/appointment-already-booked'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface CreateAppointmentUseCaseRequest {
  arenaId: string
  userId: string
  modality: Modalities
  date: Date
}

type CreateAppointmentUseCaseResponse = Either<
  ResourceNotFoundError | AppointmentOnPastDateError,
  { appointment: Appointment }
>

export class CreateAppointmentUseCase {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly usersReposiotry: UsersRepository,
    private readonly arenasRepository: ArenasRepository,
  ) {}

  async execute({
    arenaId,
    userId,
    modality,
    date,
  }: CreateAppointmentUseCaseRequest): Promise<CreateAppointmentUseCaseResponse> {
    const arena = await this.arenasRepository.getById(arenaId)
    const user = await this.usersReposiotry.getById(userId)

    if (!user || !arena) return left(new ResourceNotFoundError())

    const appointmentDate = startOfHour(date)

    if (isBefore(appointmentDate, Date.now()))
      return left(new AppointmentOnPastDateError())

    const appoitmentsOnSameDate = await this.appointmentsRepository.getByDate(
      date,
      arenaId,
    )

    if (appoitmentsOnSameDate) return left(new AppointmentAlreadyBooked())

    const appointment = Appointment.create({
      arenaId: new UniqueEntityID(arenaId),
      userId: new UniqueEntityID(userId),
      modality,
      date,
    })

    await this.appointmentsRepository.create(appointment)

    return right({ appointment })
  }
}
