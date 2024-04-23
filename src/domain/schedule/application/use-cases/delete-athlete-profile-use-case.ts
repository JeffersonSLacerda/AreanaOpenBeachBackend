import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/types/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'
import { AthletesRepository } from '../repositories/athletes-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface DeleteAthleteProfileRequest {
  editorId: UniqueEntityID
  email: string
}

type DeleteAthleteProfileResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  null
>

export class DeleteAthleteProfileUseCase {
  constructor(private readonly athletesRepository: AthletesRepository) {}

  async execute({
    editorId,
    email,
  }: DeleteAthleteProfileRequest): Promise<DeleteAthleteProfileResponse> {
    const athlete = await this.athletesRepository.findByEmail(email)

    if (!athlete) return left(new ResourceNotFoundError())

    if (!athlete.id.equals(editorId)) return left(new NotAllowedError())

    await this.athletesRepository.delete(athlete)

    return right(null)
  }
}
