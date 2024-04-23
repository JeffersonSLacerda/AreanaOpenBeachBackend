import { Either, left, right } from '@/core/either'
import { CourtsRepository } from '../repositories/courts-repository'
import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'

interface DeleteCourtRequest {
  courtId: string
}

type DeleteCourtResponse = Either<ResourceNotFoundError, null>

export class DeleteCourtUseCase {
  constructor(private readonly courtsRepository: CourtsRepository) {}

  async execute({ courtId }: DeleteCourtRequest): Promise<DeleteCourtResponse> {
    const court = await this.courtsRepository.getById(courtId)

    if (!court) return left(new ResourceNotFoundError())

    await this.courtsRepository.delete(court)

    return right(null)
  }
}
