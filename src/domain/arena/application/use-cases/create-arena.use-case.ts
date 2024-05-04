import { Either, right } from '@/core/either'
import { State } from '../../enterprise/entities/enums/state'
import { Arena } from '../../enterprise/entities/arena'
import { ArenasRepository } from '../repositories/arenas-repository'

interface CreateArenaUseCaseRequest {
  name: string
  isAvailable: boolean
  state: State
}

type CreateArenaUseCaseResponse = Either<null, { arena: Arena }>

export class CreateArenaUseCase {
  constructor(private readonly arenasRepoistory: ArenasRepository) {}

  async execute({
    name,
    isAvailable,
    state,
  }: CreateArenaUseCaseRequest): Promise<CreateArenaUseCaseResponse> {
    const arena = Arena.create({
      name,
      isAvailable,
      state,
    })

    await this.arenasRepoistory.create(arena)

    return right({ arena })
  }
}
