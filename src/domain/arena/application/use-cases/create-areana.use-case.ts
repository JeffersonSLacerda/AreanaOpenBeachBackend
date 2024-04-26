import { Either, right } from '@/core/either'
import { Modalities } from '../../enterprise/entities/enums/modalities'
import { State } from '../../enterprise/entities/enums/state'
import { Arena } from '../../enterprise/entities/arena'
import { ArenasRepository } from '../repositories/arenas-repository'

interface CreateArenaRequest {
  name: string
  modality: Modalities
  isAvailable: boolean
  capacity?: number
  state: State
}

type CreateArenaResponse = Either<null, { arena: Arena }>

export class CreateArenaUseCase {
  constructor(private readonly arenasRepository: ArenasRepository) {}

  async execute({
    name,
    modality,
    isAvailable,
    capacity,
    state,
  }: CreateArenaRequest): Promise<CreateArenaResponse> {
    const arena = Arena.create({
      name,
      modality,
      isAvailable,
      capacity,
      state,
    })

    await this.arenasRepository.create(arena)

    return right({ arena })
  }
}
