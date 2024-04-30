import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'
import { ArenasRepository } from '../repositories/arenas-repository'

interface DeleteArenaUseCaseRequest {
  arenaId: string
}

type DeleteArenaUseCaseResponse = Either<ResourceNotFoundError, null>

export class DeleteArenaUseCase {
  constructor(private readonly arenasRepository: ArenasRepository) {}

  async execute({
    arenaId,
  }: DeleteArenaUseCaseRequest): Promise<DeleteArenaUseCaseResponse> {
    const arena = await this.arenasRepository.getById(arenaId)

    if (!arena) return left(new ResourceNotFoundError())

    await this.arenasRepository.delete(arena)

    return right(null)
  }
}
