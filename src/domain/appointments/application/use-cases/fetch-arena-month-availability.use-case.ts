import { Either, right, left } from '@/core/either'
import { AppointmentsRepository } from '../repositories/appointmentsRepository'
import { ArenasRepository } from '@/domain/arena/application/repositories/arenas-repository'
import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'
import { AvailableTimes } from '@/core/helpers/available-times'

interface FetchMonthAvailabilityUseCaseRequest {
  arenaId: string
  year: number
  month: number
}

type FetchMonthAvailabilityUseCaseResponse = Either<
  ResourceNotFoundError,
  { availableDays: number[] }
>

export class FetchMonthAvailabilityUseCase {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly arenasRepository: ArenasRepository,
  ) {}

  async execute({
    arenaId,
    year,
    month,
  }: FetchMonthAvailabilityUseCaseRequest): Promise<FetchMonthAvailabilityUseCaseResponse> {
    const arena = await this.arenasRepository.getById(arenaId)

    if (!arena) return left(new ResourceNotFoundError())

    const availableDays: number[] = []
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate()
    const today = new Date().getDate()

    const times = new AvailableTimes()

    for (let day = today; day <= lastDayOfMonth; day++) {
      const date = new Date(year, month, day)
      const availableTimes = times.getAvailableTimes(date)

      if (availableTimes.length > 0) {
        availableDays.push(day)
      }
    }

    return right({ availableDays })
  }
}
