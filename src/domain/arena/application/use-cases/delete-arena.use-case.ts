import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'
import { ArenasRepository } from '../repositories/arenas-repository'

interface DeleteArenaRequest {
  arenaId: string
}

type DeleteArenaResponse = Either<ResourceNotFoundError, null>

export class DeleteArenaUseCase {
  constructor(private readonly arenasRepository: ArenasRepository) {}

  async execute({ arenaId }: DeleteArenaRequest): Promise<DeleteArenaResponse> {
    const arena = await this.arenasRepository.getById(arenaId)

    if (!arena) return left(new ResourceNotFoundError())

    await this.arenasRepository.delete(arena)

    return right(null)
  }
}
