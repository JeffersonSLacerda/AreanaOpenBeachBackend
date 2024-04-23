import { Either, left, right } from '@/core/either'
import { Athlete } from '../../enterprise/entities/athlete'
import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'
import { AthletesRepository } from '../repositories/athletes-repository'

interface ShowProfileRequest {
  athleteId: string
}

type ShowProfileResponse = Either<ResourceNotFoundError, { athlete: Athlete }>

export class ShowProfileUseCase {
  constructor(private readonly athletesRepository: AthletesRepository) {}

  async execute({
    athleteId,
  }: ShowProfileRequest): Promise<ShowProfileResponse> {
    const athlete = await this.athletesRepository.findById(athleteId)

    if (!athlete) return left(new ResourceNotFoundError())

    return right({ athlete })
  }
}
