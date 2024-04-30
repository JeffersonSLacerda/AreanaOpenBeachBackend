import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'
import { Arena } from '../../enterprise/entities/arena'
import { ArenasRepository } from '../repositories/arenas-repository'

interface ShowArenaUseCaseRequest {
  arenaId: string
}

type ShowArenaUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    arena: Arena
  }
>

export class ShowArenaUseCase {
  constructor(private readonly arenasRepository: ArenasRepository) {}

  async execute({
    arenaId,
  }: ShowArenaUseCaseRequest): Promise<ShowArenaUseCaseResponse> {
    const arena = await this.arenasRepository.getById(arenaId)

    if (!arena) return left(new ResourceNotFoundError())

    return right({ arena })
  }
}
