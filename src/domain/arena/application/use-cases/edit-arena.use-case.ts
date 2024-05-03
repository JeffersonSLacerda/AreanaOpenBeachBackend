import { Either, left, right } from '@/core/either'
import { Modalities } from '../../enterprise/entities/enums/modalities'
import { State } from '../../enterprise/entities/enums/state'
import { ResourceNotFoundError } from '@/core/errors/types/resource-not-found-error'
import { Arena } from '../../enterprise/entities/arena'
import { ArenasRepository } from '../repositories/arenas-repository'

interface EditArenaUseCaseRequest {
  arenaId: string
  name: string
  modality: Modalities
  isAvailable: boolean
  state: State
}

type EditArenaUseCaseResponse = Either<ResourceNotFoundError, { arena: Arena }>

export class EditArenaUseCase {
  constructor(private readonly arenasRepository: ArenasRepository) {}

  async execute({
    arenaId,
    name,
    modality,
    isAvailable,
    state,
  }: EditArenaUseCaseRequest): Promise<EditArenaUseCaseResponse> {
    const arena = await this.arenasRepository.getById(arenaId)

    if (!arena) return left(new ResourceNotFoundError())

    arena.name = name
    arena.modality = modality
    arena.isAvailable = isAvailable
    arena.state = state

    await this.arenasRepository.save(arena)

    return right({ arena })
  }
}
