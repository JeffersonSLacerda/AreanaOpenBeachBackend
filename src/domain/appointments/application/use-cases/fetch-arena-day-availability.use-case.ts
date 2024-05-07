import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'
import { ArenasRepository } from '@/domain/arena/application/repositories/arenas-repository'
import { AppointmentsRepository } from '../repositories/appointmentsRepository'
import { AvailableTimes } from '@/core/helpers/available-times'

interface FetchArenaDayAvailabilityUseCaseRequest {
  arenaId: string
  date: Date
}

type FetchArenaDayAvailabilityUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    availableTimes: number[]
  }
>

export class FetchArenaDayAvailabilityUseCase {
  constructor(
    private readonly arenasRepository: ArenasRepository,
    private readonly appointmentsRepository: AppointmentsRepository,
  ) {}

  async execute({
    arenaId,
    date,
  }: FetchArenaDayAvailabilityUseCaseRequest): Promise<FetchArenaDayAvailabilityUseCaseResponse> {
    const arena = await this.arenasRepository.getById(arenaId)

    if (!arena) return left(new ResourceNotFoundError())

    const times = new AvailableTimes()
    const availableTimes = times.getAvailableTimes(date)

    return right({ availableTimes })
  }
}
