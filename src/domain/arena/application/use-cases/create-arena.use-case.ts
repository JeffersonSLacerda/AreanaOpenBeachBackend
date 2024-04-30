import { Either, right } from '@/core/either'
import { Modalities } from '../../enterprise/entities/enums/modalities'
import { State } from '../../enterprise/entities/enums/state'
import { Arena } from '../../enterprise/entities/arena'
import { ArenasRepository } from '../repositories/arenas-repository'

interface CreateArenaUseCaseRequest {
  name: string
  modality: Modalities
  isAvailable: boolean
  capacity?: number
  state: State
}

type CreateArenaUseCaseResponse = Either<null, { arena: Arena }>

export class CreateArenaUseCase {
  constructor(private readonly arenasRepoistory: ArenasRepository) {}

  async execute({
    name,
    modality,
    isAvailable,
    state,
    capacity,
  }: CreateArenaUseCaseRequest): Promise<CreateArenaUseCaseResponse> {
    const arena = Arena.create({
      name,
      modality,
      isAvailable,
      state,
      capacity,
    })

    await this.arenasRepoistory.create(arena)

    return right({ arena })
  }
}
